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
	grade:  {type:Number, default:0},
	is_active: {type:Boolean, default:true},
	is_coach: {type:Boolean, default:false},
	created_at: {type:Date, default:Date.now},
	ponints: {type:Number, default:0},
	is_verify: {type:Boolean, default:false},
	idof_zfb: String,
	idof_person: String,
	idof_tel: String,
	idof_qq: String,
	idof_yy: String,
	role: String,
	fighting: String,
	introduction: String,
	user_img: String,
	ponints: {type:Number, default:0},
}, {
	collection: 'account_user'
});
UserSchema.methods.isAnonymous = function() {
	return false;
}
exports.User = mongoose.model('User', UserSchema);
