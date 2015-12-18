/*!
 * dorado
 *
 * Copyright(c) gaochuan
 * MIT Licensed
 */

'use strict';

var express = require('express');
var router = express.Router();
var debug = require('debug')('dorado:project');
var fs = require('fs');
var path = require('path');
var _ = require('underscore');

var accountModels = require('routes/account/models');
var precondition = require('lib/precondition');
var dumpRequest = require('core/dump_request').dumpRequest;
var RequestContext = require('core/request_context').RequestContext;
var settings = require('settings');


var models = require('./models');
var userModels = require('../account/models');
var productModels = require('../product/models');

var FIRST_NAV_NAME = 'project';

router.get('/', function(req, res, next) {
	productModels.product.find().sort({_id:-1}).exec(function(err, products) {
		if (err) {
			return next(err);
		}

		// 实现product表和account表的联合查询


		// products = products.map(function(product) {
		// 	var data = product.toJSON();
		// 	return data;
		// });
		_.connectRelatedObj({
			local: {
				data: products,
				field: 'ownerUserId'
			},
			relate: {
				model: userModels.User,
				field: 'owner'
			}
		})
		.then(function(data){
			var c = RequestContext(req, {
				products : data,
			});
			res.render('project/projects.html', c)
		})


	});
	// models.Project.find({owner_id:req.user.id}).sort({_id:-1}).exec(function(err, projects) {
	// 	if (err) {
	// 		return next(err);
	// 	}

	// 	var c = RequestContext(req, {
	// 		first_nav_name: FIRST_NAV_NAME,
	// 		projects: projects
	// 	});

	// 	res.render('project/projects.html', c)
	// });
});


router.isResource = true;
module.exports = router;
