/*!
 * dorado
 *
 * Copyright andy
 * MIT Licensed
 */
'use strict';

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var swig = require('swig');
var debug = require('debug')('dorado:app');

require('./core/core');
var routes = require('./routes/index');
var resourceLoader = require('./core/resource_loader');
var settings = require('settings');

// connect mongodb
var mongoose = require('mongoose');
mongoose.connect(settings.MONGO);

//session
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var redisOptions = {
  host: '127.0.0.1',
  port: 6379,
  ttl: 60 * 60 * 24 * 7,
  db: 0
}

// create express app
var app = express();

// view engine setup
app.engine('html', swig.renderFile)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

//load swig filters
var filterLoader = require('./core/filter_loader');
filterLoader.load();

swig.setDefaults({ cache: false });
app.set('view cache', false);


// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'static', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function(req, res, next) {
  if (req.body) {
    req.POST = req.body;
  }

  if (req.query) {
    req.GET = req.query;
  }

  next();
});

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'static', '..')));

var methodOverride = require('method-override');
app.use(methodOverride('_method'));

//开启CORS
if (settings.ENABLE_CORS) {
  debug('enable CORS support!');
  app.use(function(req, res, next) {
    if (!settings.API_HOSTS[req.headers.host]) {
      return next();
    } else {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    }
  });
}

//enable session
app.use(session({
  secret: settings.SECRET,
  store: new RedisStore(redisOptions),
  resave: false,
  saveUninitialized: true
}));

//load middlewares
(function loadMiddlewares() {
  var middlewares = settings.MIDDLEWARES;
  for (var i = 0; i < middlewares.length; ++i) {
    var middlewarePath = middlewares[i].replace(/\./g, '/');
    var middleware = require(middlewarePath);
    app.use(middleware());
    debug('load middleware %s success!', middlewarePath);
  }
})();

//init router
app.use('/', routes);
resourceLoader.load(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    console.log(err.stack);
    var items = err.stack.split('\n');
    for (var i = 0; i < items.length; ++i) {
      var item = items[i];
      item = item.replace(' ', '&nbsp;&nbsp;');
      if (item.indexOf('/node_modules/') === -1) {
        items[i] = '<span style="color:red;">'+item+'</span><br/>';
      } else {
        items[i] = item+'<br/>'
      }
    }
    var stack = items.join('\n');
    res.render('error.html', {
      message: err.message,
      error: err,
      stack: stack
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error.html', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
