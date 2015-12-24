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

			var c = RequestContext(req, {
				is_coach: req.user.is_coach,
				coachId: req.GET.coachId,
				orderId : req.GET.order_id,
			});

			res.render('evaluate/evaluate.html', c)
		     
}.require(precondition.login_required));


router.post('/', function(req, res, next) {
	//鏇存柊project
	var updateOp = {$set:{
		coachId  :  req.POST.coachId,
	orderId  :  req.POST.orderId,
	creatTime  :  req.POST.creatTime,
	content  :  req.POST.content,
	
	}};

	models.evaluate.update({ }, updateOp).exec(function(err) {
		if (err) {
			console.log(err);
			return 
		}
		res.json({code:200});
	});
}.require(precondition.login_required));

router.put('/', function(req, res, next) {
	//鍒涘缓project
	console.log(req.POST);
	var evaluate = new models.evaluate({
	coachId  :  req.POST.coachId,
	orderId  :  req.POST.orderId,
	content  :  req.POST.content
	});
	evaluate.save(function(err) {
		if (err) {
			return next(err);
		}
		console.log(err)

		res.json({code:200});
	});
}.require(precondition.login_required));


router.delete('/', function(req, res, next) {
	models.evaluate.find().remove(function(err) {
		if (err) {
			return next(err);
		}
		res.json({code:200});
	});
}.require(precondition.login_required));


router.isResource = true;
module.exports = router;
