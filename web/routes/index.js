/*!
 * dorado
 *
 * Copyright(c) andy
 * MIT Licensed
 */

var express = require('express');
var router = express.Router();

var settings = require('settings');


router.get('/', function(req, res, next) {
	if (req.user.isAnonymous()) {
		res.redirect(settings.LOGIN_URL);
	} else {
		res.redirect(settings.LOGINED_URL);
	}
});


module.exports = router;
