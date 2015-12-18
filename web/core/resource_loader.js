/*!
 * dorado
 *
 * Copyright(c) gaochuan
 * MIT Licensed
 */
'use strict';

/**
 * resource_loader: load all resources in routes
 */

var fs = require('fs');
var path = require('path');
var debug = require('debug')('dorado:resource_loader');

var resources = [];

function walk(dir) {
	var files = fs.readdirSync(dir);
	files.forEach(function(filePath) {
		var fullFilePath = path.join(dir, filePath);
		var stat = fs.statSync(fullFilePath);
		if (stat.isDirectory()) {
			walk(fullFilePath);
		} else if (stat.isFile()) {
			var length = filePath.length;
			if (filePath[length-3] === '.' && filePath[length-2] === 'j' && filePath[length-1] === 's') {
				//file is a js file, record it
				var requirePath = fullFilePath.substring(0, fullFilePath.length-3);
				requirePath = '../' + requirePath.replace(/\\/g, '/');
				var items = requirePath.split('routes');
				var urlPath = items[items.length-1];
				resources.push({
					requirePath: requirePath,
					urlPath: urlPath
				})
			}
		}
	});	
}

function load(app) {
	walk('./routes');
	resources.forEach(function(resource) {
		var module = require(resource.requirePath);	
		if (!module.isResource) {
			debug('skip %s.js', resource.requirePath)
			return;
		}
		//构造api url
		var apiUrlPath = null;
		var items = resource.urlPath.split('/');
		if (items.length === 2) {
			//不是app/resource结构，不进行操作
		} else {
			//是app/resource结构，改造成/app/url/resource这样的url格式
			items.splice(items.length-1, 0, 'api');
			var apiUrlPath = items.join('/');
			app.use(apiUrlPath, module);
			debug('route api url [%s] to %s.js', apiUrlPath, resource.requirePath)
		}
		app.use(resource.urlPath, module);
		debug('route url [%s] to %s.js', resource.urlPath, resource.requirePath)
	});
}

exports.load = load;
