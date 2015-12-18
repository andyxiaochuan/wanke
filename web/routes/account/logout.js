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

var models = require('./models');


router.get('/', function(req, res, next) {
	req.session.destroy();

	res.redirect(settings.LOGIN_URL);
})


router.isResource = true;
module.exports = router;
