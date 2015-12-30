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

			var c = RequestContext(req, {
				title: req.user.is_coach,
				content: req.GET.content,
			});

			res.render('news/news.html', c)
		     
}.require(precondition.login_required));


router.post('/', function(req, res, next) {
	//鏇存柊project
	var updateOp = {$set:{
		content  :  req.POST.content,
		title  :  req.POST.title,
	}};

	models.news.update({ }, updateOp).exec(function(err) {
		if (err) {
			console.log(err);
			return 
		}
		res.json({code:200});
	});
}.require(precondition.login_required));

router.put('/', function(req, res, next) {
	console.log(req.POST);
	var news = new models.news({
		content  :  req.POST.content,
		title  :  req.POST.title,
	});
	news.save(function(err) {
		if (err) {
			return next(err);
		}
		console.log(err)

		res.json({code:200});
	});
}.require(precondition.login_required));


router.delete('/', function(req, res, next) {
	models.news.find().remove(function(err) {
		if (err) {
			return next(err);
		}
		res.json({code:200});
	});
}.require(precondition.login_required));


router.isResource = true;
module.exports = router;
