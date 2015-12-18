/*!
 * dorado
 *
 * Copyright(c) gaochuan
 * MIT Licensed
 */
'use strict';

var express = require('express');
var router = express.Router();

/* 上传图片第三方 */
var formidable = require('formidable');
var fs = require('fs');
var path = require('path');

var settings = require('settings');
var precondition = require('lib/precondition');
var RequestContext = require('core/request_context').RequestContext;

var models = require('./models');


router.post('/', function(req, res, next) {
	var form = new formidable.IncomingForm();
	form.uploadDir = settings.UPLOAD_DIR;
	form.keepExtensions = true;
	form.maxFieldsSize = 2 * 1024 * 1024;

	if (!fs.existsSync(form.uploadDir)) {
		fs.mkdirSync(form.uploadDir);
	}

	form.parse(req, function(err, fields, files) {
		if (err) {
			return next(err);
		}

		var imagePath = '/static/upload/'+path.basename(files['Filedata'].path);

		res.json({
			code:200, 
			path:imagePath
		});
	});


}.require(precondition.login_required));


router.isResource = true;
module.exports = router;
