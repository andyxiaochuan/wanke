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
	
		models.yonghu.find().sort({_id:-1}).exec(function(err, yonghus) {
			if (err) {
				return next(err);
			}
			var c = RequestContext(req, {
				yonghus : yonghus,
			});

			res.render('yonghu/yonghus.html',c)
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

	models.yonghu.update({ }, updateOp).exec(function(err) {
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
	var yonghu = new models.yonghu({
		idof_zfb  :  req.POST.idof_zfb,
	idof_person  :  req.POST.idof_person,
	idof_tel  :  req.POST.idof_tel,
	idof_qq  :  req.POST.idof_qq,
	idof_yy  :  req.POST.idof_yy,
	is_coach  :  req.POST.is_coach,
	is_verify  :  req.POST.is_verify,
		
	});
	yonghu.save(function(err) {
		if (err) {
			return next(err);
		}

		res.json({code:200});
	});
}.require(precondition.login_required));


router.delete('/', function(req, res, next) {
	models.yonghu.find().remove(function(err) {
		if (err) {
			return next(err);
		}
		res.json({code:200});
	});
}.require(precondition.login_required));


router.isResource = true;
module.exports = router;
