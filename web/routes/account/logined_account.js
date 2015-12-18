/*!
 * dorado
 *
 * Copyright(c) gaochuan
 * MIT Licensed
 */

'use strict';

var express = require('express');
var router = express.Router();
var debug = require('debug')('dorado:account');

var settings = require('settings');
var accountModels = require('routes/account/models');
var dumpRequest = require('core/dump_request').dumpRequest;

var models = require('./models');


router.put('/', function(req, res, next) {
	accountModels.User.findOne({name:req.POST.username}).exec(function(err, user) {
		if (err) {
			return next(err);
		}

		if (user) {
			if (req.POST.password === user.password) {
				debug('set session.uid to %s', user.id);
				req.session.uid = user.id;
				res.redirect(settings.LOGINED_URL);
			} else {
				res.redirect(settings.LOGIN_URL);
			}
		} else {
			res.redirect(settings.LOGIN_URL);
		}
	})
})

router.isResource = true;
module.exports = router;
