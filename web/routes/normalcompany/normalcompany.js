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
var regionalModels = require('../regional/models');


router.get('/', function(req, res, next) {
	
		models.normalcompany.findOne({ownerUserId:req.user.id}).sort({_id:-1}).exec(function(err, normalcompanys) {
			if (err) {
				return next(err);
			}


			regionalModels.regional.find().sort({_id:-1}).exec(function(err, regionals) {
				//console.log("===============",regionals);

				

				if(normalcompanys == null){
					var c = RequestContext(req, {
						normalcompany : normalcompanys,
						is_coach: req.user.is_coach,
						regionals: regionals
					});
					res.render('normalcompany/add_normalcompany.html', c)
				}
				else{
					var datas = {};
					datas = regionals.map(function(regional) {
						var data = regional.toJSON();
						if(regional._id == normalcompanys.ownerRegionalId){
							data['select'] = 1
						}
						else{
							data['select'] = 0
						}
						return data;
					});
					console.log("datas",datas);
					var c = RequestContext(req, {
						normalcompany : normalcompanys,
						is_coach: req.user.is_coach,
						regionals: datas
					});
					res.render('normalcompany/edit_normalcompany.html', c)
				}

			})
		});
}.require(precondition.login_required));


router.post('/', function(req, res, next) {
	//鏇存柊project
	var updateOp = {$set:{
	ownerRegionalId  :  req.POST.ownerRegionalId,
	price  :  req.POST.price,
	creatTime  :  req.POST.creatTime,
	timePoints  :  eval(req.POST.timePoints),
	remark  :  req.POST.remark,
	mode  :  eval(req.POST.modes),
	protocol  :  req.POST.protocol,
	
	}};

	models.normalcompany.update({ownerUserId:req.user.id}, updateOp).exec(function(err) {
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

	var normalcompany = new models.normalcompany({
		ownerUserId  :  req.user.id,
		ownerRegionalId  :  req.POST.ownerRegionalId,
		price  :  req.POST.price,
		creatTime  :  req.POST.creatTime,
		timePoints  :  eval(req.POST.timePoints),
		remark  :  req.POST.remark,
		mode  :  eval(req.POST.modes),
		protocol  :  req.POST.protocol,
	});
	console.log(normalcompany);


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
