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
var _ = require('underscore');
var dumpRequest = require('core/dump_request').dumpRequest;
var RequestContext = require('core/request_context').RequestContext;
var settings = require('settings');

var models = require('./models');
var userModels = require('../account/models');


router.get('/', function(req, res, next) {
	
		models.order.find().sort({_id:-1}).exec(function(err, orders) {
			if (err) {
				return next(err);
			}
			var c = RequestContext(req, {
				orders : orders,
				is_coach: req.user.is_coach,
			});

			res.render('order/order.html', c)
		});
}.require(precondition.login_required));


router.post('/', function(req, res, next) {
	//鏇存柊project
	var updateOp = {$set:{
		state  :  req.POST.state,
	}};

	console.log(updateOp)

	models.order.update({buyerId:req.user.id }, updateOp).exec(function(err) {
		if (err) {
			console.log(err);
			return 
		}
		res.json({code:200});
	});
}.require(precondition.login_required));



router.isResource = true;
module.exports = router;
