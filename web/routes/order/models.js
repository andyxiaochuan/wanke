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
var orderSchema = new mongoose.Schema({
	buyerId  :  String,
	sellerId  :  String,
	price  :  String,
	gameTime  :  {type:Date, default:Date.now},
	creatTime  :  {type:Date, default:Date.now},
	state  :  {type:Number, default:0},
	
}, {
	collection: 'project_order'
});
exports.order = mongoose.model('order', orderSchema);


