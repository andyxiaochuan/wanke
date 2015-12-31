 /*!
 * dorado
 *
 * Copyright(c) 2012-2015 weizoom
 * MIT Licensed
 */

'use strict';

var express = require('express');
var router = express.Router();
var debug = require('debug')('dorado:project');
var fs = require('fs');
var path = require('path');

var accountModels = require('routes/account/models');
var precondition = require('lib/precondition');
var dumpRequest = require('core/dump_request').dumpRequest;
var RequestContext = require('core/request_context').RequestContext;
var settings = require('settings');

var models = require('./models');


router.get('/', function(req, res, next) {

	models.news.find().sort({_id:-1}).exec(function(err,newses) {
		if (err) {
			return next(err);
		}
		console.log(newses);
		var c = RequestContext(req, {
				newses : newses,
		});
		res.render('news/newses.html', c)
	});

		     
}.require(precondition.login_required));



router.isResource = true;
module.exports = router;
