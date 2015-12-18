/*!
 * dorado
 *
 * Copyright(c) gaochuan
 * MIT Licensed
 */

'use strict';

var mongoose = require('mongoose');
/**
 * Category
 */
var regionalSchema = new mongoose.Schema({
		name  :  String,
	ownCarrieroperator  :  {type:Number, default:0},
	
}, {
	collection: 'project_regional'
});
exports.regional = mongoose.model('regional', regionalSchema);


