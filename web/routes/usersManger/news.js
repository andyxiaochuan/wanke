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

var newsmodels = require('../news/models');


router.get('/', function(req, res, next) {

	var newsid = req.GET.newsid;
	if (newsid) {
		newsmodels.news.findOne({_id:newsid}).exec(function(err,news) {
			console.log('llllllllllllll',news)
			if (err) {
				return next(err);
			}
			var c = RequestContext(req, {
				title: req.user.is_coach,
				content: req.GET.content,
				news: news,
			});

			res.render('usersManger/eidtnews.html', c)
			
		});
	}
	else{
		
		var c = RequestContext(req, {
			title: req.user.is_coach,
			
		});
		res.render('usersManger/news.html', c)
		
	}
		     
}.require(precondition.login_required));


router.post('/', function(req, res, next) {
	//鏇存柊project
	var updateOp = {$set:{
		content  :  req.POST.content,
		title  :  req.POST.title,
	}};

	newsmodels.news.update({ _id: req.POST.userid }, updateOp).exec(function(err) {
		if (err) {
			console.log(err);
			return 
		}
		res.json({code:200});
	});
}.require(precondition.login_required));

router.put('/', function(req, res, next) {
	console.log(req.POST);
	var news = new newsmodels.news({
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
	newsmodels.news.find({_id:req.POST.newsid}).remove(function(err) {
		if (err) {
			return next(err);
		}
		res.json({code:200});
	});
}.require(precondition.login_required));


router.isResource = true;
module.exports = router;
