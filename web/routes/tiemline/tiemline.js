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
	
		models.tiemline.find().sort({_id:-1}).exec(function(err, tiemlines) {
			if (err) {
				return next(err);
			}
			var c = RequestContext(req, {
				tiemlines : tiemlines,
				is_coach: req.user.is_coach,
			});

			res.render('tiemline/tiemline.html', c)
		});
}.require(precondition.login_required));


router.post('/', function(req, res, next) {
	//鏇存柊project
	var updateOp = {$set:{
		text  :  req.POST.text,
	name  :  req.POST.name,
	feedman  :  req.POST.feedman,
	content  :  req.POST.content,
	mark  :  req.POST.mark,
	order  :  req.POST.order,
	
	}};

	models.tiemline.update({ }, updateOp).exec(function(err) {
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
	var tiemline = new models.tiemline({
		text  :  req.POST.text,
	name  :  req.POST.name,
	feedman  :  req.POST.feedman,
	content  :  req.POST.content,
	mark  :  req.POST.mark,
	order  :  req.POST.order,
		
	});
	tiemline.save(function(err) {
		if (err) {
			return next(err);
		}

		res.json({code:200});
	});
}.require(precondition.login_required));


router.delete('/', function(req, res, next) {
	models.tiemline.find().remove(function(err) {
		if (err) {
			return next(err);
		}
		res.json({code:200});
	});
}.require(precondition.login_required));


router.isResource = true;
module.exports = router;
