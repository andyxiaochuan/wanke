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
var normalcompanySchema = new mongoose.Schema({
		ownerUserId  :  String,
	ownerRegionalId  :  String,
	price  :  String,
	creatTime  :  {type:Date, default:Date.now},
	timePoints  :  [],
	remark  :  String,
	mode  :  [],
	protocol  :  String,
	
}, {
	collection: 'project_normalcompany'
});
exports.normalcompany = mongoose.model('normalcompany', normalcompanySchema);


