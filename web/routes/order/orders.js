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
var _ = require('underscore');

var accountModels = require('routes/account/models');
var precondition = require('lib/precondition');
var dumpRequest = require('core/dump_request').dumpRequest;
var RequestContext = require('core/request_context').RequestContext;
var settings = require('settings');

var models = require('./models');
var userModels = require('../account/models');


router.get('/', function(req, res, next) {
	
		models.order.find({buyerId : req.user.id}).sort({_id:-1}).exec(function(err, orders) {
			if (err) {
				return next(err);
			}
			_.connectRelatedObj({
				local: {
					data: orders,
					field: 'sellerId'
				},
				relate: {
					model: userModels.User,
					field: 'seller'
				}
			})
			.then(function(data){
				var c = RequestContext(req, {
					orders : data,
					is_coach: req.user.is_coach,
				});
				res.render('order/orders.html',c)
			})
			
		});


}.require(precondition.login_required));


router.post('/', function(req, res, next) {
	//鏇存柊project
	var updateOp = {$set:{
		buyerId  :  req.POST.buyerId,
	sellerId  :  req.POST.sellerId,
	price  :  req.POST.price,
	gameTime  :  req.POST.gameTime,
	creatTime  :  req.POST.creatTime,
	state  :  req.POST.state,
	
	}};

	models.order.update({ }, updateOp).exec(function(err) {
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
	var order = new models.order({
		buyerId  :  req.POST.buyerId,
	sellerId  :  req.POST.sellerId,
	price  :  req.POST.price,
	gameTime  :  req.POST.gameTime,
	creatTime  :  req.POST.creatTime,
	state  :  req.POST.state,
		
	});
	order.save(function(err) {
		if (err) {
			return next(err);
		}

		res.json({code:200});
	});
}.require(precondition.login_required));


router.delete('/', function(req, res, next) {
	models.order.find().remove(function(err) {
		if (err) {
			return next(err);
		}
		res.json({code:200});
	});
}.require(precondition.login_required));


router.isResource = true;
module.exports = router;
