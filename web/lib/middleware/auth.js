/*!
 * dorado
 *
 * Copyright(c) gaochuan
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
		if (req.session) {
			if (req.session.uid) {
				accountModels.User.findOne({_id:req.session.uid}).exec(function(err, user) {
					if (err) {
						return next(err)
					}
					if (!user) {
						debug('use anonymous user as req.user');
						req.user = {
							isAnonymous: function() {
								return true;
							}
						};
						next();
					} else {
						req.user = user;
						next();
					}
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
		}
	};
};