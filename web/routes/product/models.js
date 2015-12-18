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
var productSchema = new mongoose.Schema({
		ownerUserId  :  String,
	ownerRegional  :  String,
	price  :  String,
	sex  :  Number, 
	age  :  Number,
	creatTime  :  {type:Date, default:Date.now},
	gameTime  :  {type:Date, default:Date.now},
	remark  :  String,
	mode  :  String,
	protocol  :  String,
	legal  :  {type:Number, default:1},
	
}, {
	collection: 'project_product'
});
exports.product = mongoose.model('product', productSchema);


