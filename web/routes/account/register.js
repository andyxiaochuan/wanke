/*!
 * dorado
 *
 * Copyright(c) gaochuan
 * MIT Licensed
 */

'use strict';

/**
 * npm module
 */
var express = require('express');
var router = express.Router();
var debug = require('debug')('dorado:account');

/**
 * dorado module
 */
var settings = require('settings');
var accountModels = require('routes/account/models')
var _ = require('underscore');

/**
 * local module
 */
var models = require('./models');


router.get('/', function(req, res, next) {
	if (req.user.isAnonymous()) {
		var c = {
		}	
		res.render('account/register.html', c);
	} else {
		res.redirect(settings.LOGINED_URL);
	}
})


router.put('/', function(req, res, next) {

	models.User.find().exec(function(err,users){
		console.log("用户名已存在");console.log("用户名已存在");
		var names =  _.pluck(users,"name");
		var name = req.POST.username;
		var six = req.POST.six;
		if(_.contains(names,name) ){
			res.json(200,'用户名已存在');
			return;
		}
		else{
			var user = new models.User({
				name: req.POST.username,
				real_name: req.POST.username,
				password: req.POST.password,
				six: req.POST.six,
			});
			user.save(function(err) {
				if (err) {
					debug('save user fail')
					next(err);
				} else {
					debug('save user success');
					res.json({code:200});
				}
			});
		}
	})
})


router.isResource = true;
module.exports = router;
