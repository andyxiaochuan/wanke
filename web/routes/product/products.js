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
var _ = require('underscore');

var accountModels = require('routes/account/models');
var precondition = require('lib/precondition');
var dumpRequest = require('core/dump_request').dumpRequest;
var RequestContext = require('core/request_context').RequestContext;
var settings = require('settings');

var models = require('./models');
var userModels = require('../account/models');


router.get('/', function(req, res, next) {


	// var query = models.Project.find({status:models.Project.PROJECT_STATUS_PUBLISHED}).sort({_id:-1}).exec();
	// query.then(function(projects) {
	// 	return _.connectRelatedObj({
	// 		local: {
	// 			data: projects,
	// 			field: 'owner_id'
	// 		},
	// 		relate: {
	// 			model: accountModels.User,
	// 			field: 'owner'
	// 		}
	// 	});
	// }, settings.MONGO_ERROR_HANDLER)


		models.product.find().sort({_id:-1}).exec(function(err, products) {
			if (err) {
				return next(err);
			}

			// 实现product表和account表的联合查询


			// products = products.map(function(product) {
			// 	var data = product.toJSON();
			// 	return data;
			// });
			_.connectRelatedObj({
				local: {
					data: products,
					field: 'ownerUserId'
				},
				relate: {
					model: userModels.User,
					field: 'owner'
				}
			})
			.then(function(data){
				var c = RequestContext(req, {
					products : data,
				});
				res.render('product/products.html',c)
			})


		});
}.require(precondition.login_required));


router.post('/', function(req, res, next) {
	//鏇存柊project
	var updateOp = {$set:{
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
	
	}};

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
