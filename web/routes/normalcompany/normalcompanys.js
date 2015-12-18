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
	
		models.normalcompany.find().sort({_id:-1}).exec(function(err, normalcompanys) {
			if (err) {
				return next(err);
			}
			var c = RequestContext(req, {
				normalcompanys : normalcompanys,
			});

			res.render('normalcompany/normalcompanys.html',c)
		});
}.require(precondition.login_required));



router.put('/', function(req, res, next) {
	//鍒涘缓project
	console.log(req.POST);
	var normalcompany = new models.normalcompany({
		ownerUserId  :  req.POST.ownerUserId,
	ownerRegionalId  :  req.POST.ownerRegionalId,
	price  :  req.POST.price,
	creatTime  :  req.POST.creatTime,
	timePoints  :  req.POST.timePoints,
	remark  :  req.POST.remark,
	mode  :  req.POST.mode,
	protocol  :  req.POST.protocol,
		
	});
	normalcompany.save(function(err) {
		if (err) {
			return next(err);
		}

		res.json({code:200});
	});
}.require(precondition.login_required));


router.delete('/', function(req, res, next) {
	models.normalcompany.find().remove(function(err) {
		if (err) {
			return next(err);
		}
		res.json({code:200});
	});
}.require(precondition.login_required));


router.isResource = true;
module.exports = router;
