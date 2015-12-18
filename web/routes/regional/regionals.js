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


router.get('/', function(req, res, next) {
	
		models.regional.find().sort({_id:-1}).exec(function(err, regionals) {
			if (err) {
				return next(err);
			}
			var c = RequestContext(req, {
				regionals : regionals,
			});

			res.render('regional/regionals.html',c)
		});
}.require(precondition.login_required));


router.post('/', function(req, res, next) {
	var updateOp = {$set:{
		name  :  req.POST.name,
	ownCarrieroperator  :  req.POST.ownCarrieroperator,
	
	}};

	models.regional.update({ }, updateOp).exec(function(err) {
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
	var regional = new models.regional({
		name  :  req.POST.name,
	ownCarrieroperator  :  req.POST.ownCarrieroperator,
		
	});
	regional.save(function(err) {
		if (err) {
			return next(err);
		}

		res.json({code:200});
	});
}.require(precondition.login_required));


router.delete('/', function(req, res, next) {
	models.regional.find().remove(function(err) {
		if (err) {
			return next(err);
		}
		res.json({code:200});
	});
}.require(precondition.login_required));


router.isResource = true;
module.exports = router;
