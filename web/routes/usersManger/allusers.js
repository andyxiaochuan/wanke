'use strict';

var express = require('express');
var router = express.Router();
var debug = require('debug')('dorado:alluser');

var settings = require('settings');
var accountModels = require('routes/account/models');
var precondition = require('lib/precondition');
var dumpRequest = require('core/dump_request').dumpRequest;
var RequestContext = require('core/request_context').RequestContext;

router.get('/', function(req, res, next) {
	console.log('alluser---------');
	accountModels.User.find().exec(function(err, users) {
		if (err) {
			return next(err);
		}
		console.log('alluser---------');
		var c = RequestContext(req, {
			users: users
		});
		res.render('usersManger/allusers.html', c);
	});

}.require(precondition.login_required));




router.isResource = true;
module.exports = router;


