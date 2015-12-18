'use strict';

var express = require('express');
var router = express.Router();
var debug = require('debug')('dorado:alluser');

var settings = require('settings');
var accountModels = require('routes/account/models');
var precondition = require('lib/precondition');
var dumpRequest = require('core/dump_request').dumpRequest;
var RequestContext = require('core/request_context').RequestContext;
var userModels = require('../account/models');

router.get('/', function(req, res, next) {
	console.log('alluser---------',req.user.id);
	userModels.User.find({is_coach:true}).exec(function(err, users) {
		if (err) {
			return next(err);
		}
		console.log('alluser---------',users);
		var c = RequestContext(req, {
			users: users,
			is_coach: req.user.is_coach
		});
		res.render('coach/coachs.html', c);
	});

}.require(precondition.login_required));





router.isResource = true;
module.exports = router;


