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
	var user = new accountModels.User({
		name: req.POST.username,
		real_name: req.POST.username,
		password: req.POST.password
	});
	user.save(function(err) {
		if (err) {
			debug('save user fail')
			next(err);
		} else {
			debug('save user success');
			res.redirect(settings.LOGIN_URL);
		}
	});
})


router.isResource = true;
module.exports = router;
