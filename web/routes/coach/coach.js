'use strict';

var express = require('express');
var router = express.Router();

var settings = require('settings');
var accountModels = require('routes/account/models');
var precondition = require('lib/precondition');
var dumpRequest = require('core/dump_request').dumpRequest;
var RequestContext = require('core/request_context').RequestContext;
var userModels = require('../account/models');

router.get('/', function(req, res, next) {
	console.log('alluser---------');
	userModels.User.findOne({_id:req.user.id}).exec(function(err, user) {
		if (err) {
			return next(err);
		}
		console.log('alluser---------',user);
		var c = RequestContext(req, {
			user: user
		});
		res.render('coach/coach.html', c);
	});

}.require(precondition.login_required));

router.post('/', function(req, res, next) {
	//鏇存柊project
	var updateOp = {$set:{
	idof_zfb  :  req.POST.idof_zfb,
	idof_person  :  req.POST.idof_person,
	idof_tel  :  req.POST.idof_tel,
	idof_qq  :  req.POST.idof_qq,
	idof_yy  :  req.POST.idof_yy,
	is_coach  :  req.POST.is_coach,
	is_verify  :  req.POST.is_verify,
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


