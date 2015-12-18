/*!
 * dorado
 *
 * Copyright(c) andy
 * MIT Licensed
 */
'use strict';


/*!
 * middleware - auth
 */

var debug = require('debug')('dorado:middleware[auth]');

var accountModels = require('routes/account/models');


module.exports = function auth(){
	return function (req, res, next){
		//at is stand for api token
		if (!settings.API_HOSTS[req.headers.host]) {
			return next();
		}
		
		//at is stand for api token
		if (req.GET && req.GET['at']) {
			accountModels.User.findOne({_id:req.GET['at']}).exec(function(err, user) {
				if (err) {
					return next(err)
				}
				console.log('isAnonymous: %s', user.isAnonymous());
				req.user = user;
				console.log(req.user);
				console.log('isAnonymous2: %s', req.user.isAnonymous());
				next();
			});
		} else {
			debug('use anonymous user as req.user');
			req.user = {
				isAnonymous: function() {
					return true;
				}
			};
			next();
		}
	};
};