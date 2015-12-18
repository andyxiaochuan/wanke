/*!
 * dorado
 *
 * Copyright(c) gaochuan
 * MIT Licensed
 */
'use strict';

/**
 * precondition: web处理函数的前提条件
 */

var settings = require('settings');
var debug = require('debug')('dorado:precondition');


/**
 * require_login: 要求满足已登录条件，否定redirect到settings.LOGIN_URL
 */
function requireLogin(req, res) {
	if (req.user.isAnonymous()) {
		console.log(settings);
		debug('not logined. redirect to login page %s', settings.LOGIN_URL);
		res.redirect(settings.LOGIN_URL);
		return true;
	}
}

exports.login_required = requireLogin;
