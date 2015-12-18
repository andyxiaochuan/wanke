/*!
 * dorado
 *
 * Copyright(c) 2012-2015 weizoom
 * MIT Licensed
 */

'use strict';

var mongoose = require('mongoose');
/**
 * Category
 */
var yonghuSchema = new mongoose.Schema({
		idof_zfb  :  String,
	idof_person  :  String,
	idof_tel  :  String,
	idof_qq  :  String,
	idof_yy  :  String,
	is_coach  :  {type:Number, default:0},
	is_verify  :  {type:Number, default:0},
	
}, {
	collection: 'project_yonghu'
});
exports.yonghu = mongoose.model('yonghu', yonghuSchema);


