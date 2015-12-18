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

var FIRST_NAV_NAME = 'project';

router.get('/', function(req, res, next) {
	//创建project
	var project_id = req.GET.project_id;
	if (project_id) {
		var query = models.Project.findOne({owner_id:req.user.id, _id:project_id}).exec();
		query
		.then(function(project) {
			var c = RequestContext(req, {
				first_nav_name: FIRST_NAV_NAME,
				project: project.toObject()
			});

			res.render('project/project_first.html', c)
		}, settings.MONGO_ERROR_HANDLER);
	} else {
		var c = RequestContext(req, {
			first_nav_name: FIRST_NAV_NAME
		});

		res.render('project/project_first.html', c)
	}
}.require(precondition.login_required));


router.put('/', function(req, res, next) {
	//创建project
	var project = new models.Project({
		owner_id: req.user.id,
		name: req.POST.name,
		logo_image: req.POST.logo_image,
		pad_background: req.POST.pad_background,
		pc_background: req.POST.pc_background
	});
	project.save(function(err) {
		if (err) {
			return next(err);
		}

		res.json({code:200});
	});
}.require(precondition.login_required));


router.post('/', function(req, res, next) {
	//更新project
	var updateOp = {$set:{
		name: req.POST.name, 
		logo_image: req.POST.logo_image,		
		pad_background: req.POST.pad_background,
		pc_background: req.POST.pc_background
	}};
	models.Project.update({_id:req.POST.project_id, owner_id:req.user.id}, updateOp).exec(function(err) {
		if (err) {
			return next(err);
		}
		res.json({code:200});
	});
}.require(precondition.login_required));


router.delete('/', function(req, res, next) {
	var projectRemove = models.Project.find({_id:req.POST.project_id, owner_id:req.user.id}).remove();
	projectRemove.then(function() {
		// 删除project
		return req.POST.project_id
	}, settings.MONGO_ERROR_HANDLER).
	then(function(project_id){

		// 删除Product
		var productRemove = models.Product.find({project_id: project_id}).remove();
		productRemove.then(function(){

			// 删除category
			var categoryRemove = models.Category.find({owner_id: project_id}).remove();
			categoryRemove.then(function(){

				// 删除Question
				var questionRemove = models.Question.find({project_id: project_id}).remove();
				questionRemove.then(function(){
					res.json({code:200});				
				}, settings.MONGO_ERROR_HANDLER);
				
			}, settings.MONGO_ERROR_HANDLER);
			
		}, settings.MONGO_ERROR_HANDLER);

	}, settings.MONGO_ERROR_HANDLER);
}.require(precondition.login_required));


router.isResource = true;
module.exports = router;
