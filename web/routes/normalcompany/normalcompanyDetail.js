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
var Timecalculation = require('core/timecalculation').timecalculation;
var settings = require('settings');

var models = require('./models');
var regionalModels = require('../regional/models');
var userModels = require('../account/models');


router.get('/', function(req, res, next) {
		
		console.log("hkhkjhjkhjkhkjh",req.GET.coachid)
		models.normalcompany.findOne({ownerUserId:req.GET.coachid}).sort({_id:-1}).exec(function(err, normalcompany) {
			if (err) {
				return next(err);
			}
			console.log("hkhkjhjkhjkhkjh",normalcompany)
			regionalModels.regional.findOne({_id:normalcompany.ownerRegionalId}).sort({_id:-1}).exec(function(err, regional) {
				console.log("===============",regional);

				userModels.User.findOne({_id:req.GET.coachid}).sort({_id:-1}).exec(function(err, coach) {
					if (err) {
						return next(err);
					}

					console.log("pppppp",coach)
					var d = new Date();
					var date = (d.getYear()+"-"+(d.getMonth()+1)+d.getDate());
					var dates = []
					dates.push (Timecalculation(date, 'next',1));
					dates.push (Timecalculation(date, 'next',2));
					dates.push (Timecalculation(date, 'next',3));
					var c = RequestContext(req, {
						normalcompany : normalcompany,
						is_coach: req.user.is_coach,
						regional: regional,
						coach: coach,
						dates: dates,
					});
					
					res.render('normalcompany/normalcompanyDetail.html', c)
				});
				

			})
		});
}.require(precondition.login_required));


router.post('/', function(req, res, next) {
	//鏇存柊project
	var updateOp = {$set:{
		ownerUserId  :  req.POST.ownerUserId,
	ownerRegionalId  :  req.POST.ownerRegionalId,
	price  :  req.POST.price,
	creatTime  :  req.POST.creatTime,
	timePoints  :  eval(req.POST.timePoints),
	remark  :  req.POST.remark,
	mode  :  eval(req.POST.modes),
	protocol  :  req.POST.protocol,
	
	}};

	models.normalcompany.update({ }, updateOp).exec(function(err) {
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
