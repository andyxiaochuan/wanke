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
	console.log('alluser---------');
	userModels.User.findOne({id:req.user.id}).exec(function(err, user) {
		if (err) {
			return next(err);
		}
		console.log('alluser---------');
		var c = RequestContext(req, {
			userList: user,
			is_coach: req.user.is_coach
		});
		res.render('userCenter/userSetting.html', c);
	});

}.require(precondition.login_required));

router.post('/', function(req, res, next) {
	//鏇存柊project
	var updateOp = {$set:{
		user_img : req.POST.user_img,
	}};

	userModels.User.update({_id:req.user.id}, updateOp).exec(function(err) {
		if (err) {
			console.log(err);
			return 
		}
		res.json({code:200});
	});
}.require(precondition.login_required));





router.isResource = true;
module.exports = router;


