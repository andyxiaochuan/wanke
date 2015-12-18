/*!
 * dorado
 *
 * Copyright(c) gaochuan
 * MIT Licensed
 */

'use strict';

var mongoose = require('mongoose');

/**
 * User
 */
var UserSchema = new mongoose.Schema({
	password: String,
	last_login: {type:Date, default:Date.now},
	is_superuser: {type:Boolean, default:false},
	name: String,
	real_name: String,
	grade: String,
	is_active: {type:Boolean, default:true},
	created_at: {type:Date, default:Date.now}
}, {
	collection: 'account_user'
});
UserSchema.methods.isAnonymous = function() {
	return false;
}
exports.User = mongoose.model('User', UserSchema);
