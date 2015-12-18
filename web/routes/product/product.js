/*!
 * dorado
 *
 * Copyright(c) gaochuan
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
var regionalModels = require('../regional/models');


router.get('/', function(req, res, next) {
		regionalModels.regional.find().sort({_id:-1}).exec(function(err, regionals) {
			if (err) {
				return next(err);
			}

			regionals = regionals.map(function(regional) {
				var data = regional.toJSON();
				
				return data;
			});

			var c = RequestContext(req, {
				regionals : regionals,
			});

			res.render('product/product.html',c)
		});
}.require(precondition.login_required));


router.post('/', function(req, res, next) {
	//鏇存柊project
	var updateOp = {$set:{
	ownerUserId  :  req.POST.ownerUserId,
	ownerRegional  :  req.POST.ownerRegional,
	price  :  req.POST.price,
	gameTime  :  req.POST.gameTime,
	remark  :  req.POST.remark,
	mode  :  req.POST.mode,
	protocol  :  req.POST.protocol,
	}};

	console.log(updateOp);
	models.product.update({ }, updateOp).exec(function(err) {
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
	var product = new models.product({
		ownerUserId  :  req.POST.ownerUserId,
	ownerRegional  :  req.POST.ownerRegional,
	price  :  req.POST.price,
	sex  :  req.POST.sex,
	age  :  req.POST.age,
	creatTime  :  req.POST.creatTime,
	gameTime  :  req.POST.gameTime,
	remark  :  req.POST.remark,
	mode  :  req.POST.mode,
	protocol  :  req.POST.protocol,
	legal  :  req.POST.legal,
		
	});
	product.save(function(err) {
		if (err) {
			return next(err);
		}

		res.json({code:200});
	});
}.require(precondition.login_required));


router.delete('/', function(req, res, next) {
	models.product.find().remove(function(err) {
		if (err) {
			return next(err);
		}
		res.json({code:200});
	});
}.require(precondition.login_required));


router.isResource = true;
module.exports = router;
