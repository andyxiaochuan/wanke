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
var evaluateSchema = new mongoose.Schema({
	coachId  :  String,
	orderId  :  String,
	creatTime  :  {type:Date, default:Date.now},
	content  :  String,
	
}, {
	collection: 'project_evaluate'
});
exports.evaluate = mongoose.model('evaluate', evaluateSchema);


