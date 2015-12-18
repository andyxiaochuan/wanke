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
var tiemlineSchema = new mongoose.Schema({
		text  :  String,
	name  :  String,
	feedman  :  String,
	content  :  String,
	mark  :  String,
	order  :  String,
	
}, {
	collection: 'project_tiemline'
});
exports.tiemline = mongoose.model('tiemline', tiemlineSchema);


