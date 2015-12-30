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
var newsSchema = new mongoose.Schema({
	creatTime  :  {type:Date, default:Date.now},
	content  :  String,
	title : String,
	
}, {
	collection: 'project_news'
});
exports.news = mongoose.model('news', newsSchema);


