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
	accountModels.User.find({"$where":"this.user_img != null && this.is_verify != true"}).exec(function(err, users) {
		if (err) {
			return next(err);
		}
		console.log('alluser---------');
		var c = RequestContext(req, {
			users: users
		});
		res.render('usersManger/audit.html', c);
	});

}.require(precondition.login_required));

router.post('/', function(req, res, next) {
	if(req.POST.userid){
		var updateOp = {$set:{
		is_verify  : true,
		}};

		console.log(req.POST.userid);

		accountModels.User.update({_id:req.POST.userid}, updateOp).exec(function(err) {
			if (err) {
				console.log(err);
				return 
			}
			res.json({code:200});
		});
	}
	else{
	}
}.require(precondition.login_required));




router.isResource = true;
module.exports = router;


