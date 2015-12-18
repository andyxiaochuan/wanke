/*!
 * dorado
 *
 * Copyright(c) gaochuan
 * MIT Licensed
 */

'use strict';

var mongoose = require('mongoose');

/**
 * Project
 */
var PROJECT_STATUS_NOT_PUBLISH = 0;
var PROJECT_STATUS_PUBLISHED = 1;
var ProjectSchema = new mongoose.Schema({
	owner_id: String,
	name: String,
	status: {type:Number, default:PROJECT_STATUS_NOT_PUBLISH},
	logo_image: String,
	pad_background: String,
	pc_background: String,
	created_at: {type:Date, default:Date.now}
}, {
	collection: 'project_project'
});
var Project = mongoose.model('Project', ProjectSchema);
Project.PROJECT_STATUS_NOT_PUBLISH = PROJECT_STATUS_NOT_PUBLISH;
Project.PROJECT_STATUS_PUBLISHED = PROJECT_STATUS_PUBLISHED;
exports.Project = Project;



/**
 * Category
 */
var CategorySchema = new mongoose.Schema({
	owner_id: String,
	name: String, 
	charpoints: [],
	feedcount: {type:Number, default:0},
	created_at: {type:Date, default:Date.now}
}, {
	collection: 'project_category'
});
exports.Category = mongoose.model('Category', CategorySchema);


/**
 * Question
 */
var QuestionSchema = new mongoose.Schema({
	project_id: String,
	category_id: String,
	feedman: String,
	survey: String,
	content: String,
	status: {type:Number, default:0},
	subtime:  {type:Date, default:Date.now},
	created_at: {type:Date, default:Date.now}
}, {
	collection: 'project_question'
});
exports.Question = mongoose.model('Question', QuestionSchema);

/**
 * Product
 */
var ProductSchema = new mongoose.Schema({
	project_id: String,
	name: String,
	created_at: {type:Date, default:Date.now}
}, {
	collection: 'project_Product'
});
exports.Product = mongoose.model('Product', ProductSchema);


/**
 * Chart
 */
var CHART_TYPE_CUSTOM = 'custom';
var CHART_TYPE_BRAND = 'brand';

var ChartSchema = new mongoose.Schema({
	project_id: String,
	name: String,
	data: [],
	display_index: Number,
	type: {type: String, default: CHART_TYPE_CUSTOM},
	created_at: {type: Date, default: Date.now}
}, {
	collection: 'project_chart'
});
var Chart = mongoose.model('Chart', ChartSchema);
Chart.CHART_TYPE_CUSTOM = CHART_TYPE_CUSTOM;
Chart.CHART_TYPE_BRAND = CHART_TYPE_BRAND;
exports.Chart = Chart;
