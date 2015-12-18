/*!
 * dorado
 *
 * Copyright(c) andy
 * MIT Licensed
 */
'use strict';

/**
 * context processor的集合
 * author: robert
 */

var fs = require('fs');
var path = require('path');
var debug = require('debug')('dorado:context_processor');

var settings = require('settings');


var loadDialogs = function(dir) {
	var files = fs.readdirSync(dir);
	var items = [];
	items.push("<!-- start dialogs in " + dir + " -->");
	files.forEach(function(filePath) {
		var dialogPath = path.join(dir, filePath);
		var stat = fs.statSync(dialogPath);
		if (stat.isDirectory()) {
			var jsPath = path.join(dialogPath, 'dialog.js');
			var jsContent = null;
			if (fs.existsSync(jsPath)) {
				jsContent = fs.readFileSync(jsPath, {encoding:'utf8'});
			}

			var templatePath = path.join(dialogPath, 'dialog.html');
			var templateContent = null;
			if (fs.existsSync(templatePath)) {
				templateContent = fs.readFileSync(templatePath, {encoding:'utf8'});
			}

			items.push("\t<!-- dialog from " + dialogPath + " -->");
			if (jsContent) {
				items.push("\t\t<!-- js file -->");
				jsPath = '/'+jsPath.replace(/\\/g, '/');
				items.push('<script type="text/javascript" src="'+jsPath+'"></script');
				/*
				items.push('<script type="text/javascript">');
				items.push(jsContent);
				items.push('</script>');
				*/
			}
			if (templateContent) {
				items.push("\t\t<!-- template file -->");
				items.push(templateContent);	
			}
		}
	});	
	items.push("<!-- end dialogs in " + dir + " -->");

	return items.join('\n');
}


var loadViews = function(dir) {
	var viewInfoPath = path.join(dir, 'views.info');
	if (!fs.existsSync(viewInfoPath)) {
		debug('%s is NOT a valid view directory', dir);
		return;
	}

	var content = fs.readFileSync(viewInfoPath, {encoding:'utf8'});
	var lines = content.splitLines();
	var items = [];
	items.push("<!-- start views in " + dir + " -->");
	lines.forEach(function(line) {
		var viewDir = path.join(dir, line);
		var viewJsPath = path.join(viewDir, 'view.js');
		var viewJsContent = null;
		if (fs.existsSync(viewJsPath)) {
			viewJsContent = true;
			/*
			viewJsContent = fs.readFileSync(viewJsPath, {encoding:'utf8'});
			*/
		}

		var templatePath = path.join(viewDir, 'template.html');
		var templateContent = null;
		if (fs.existsSync(templatePath)) {
			templateContent = fs.readFileSync(templatePath, {encoding:'utf8'});
		}

		items.push("\t<!-- view from " + viewDir + " -->");
		if (viewJsContent) {
			items.push("\t\t<!-- js file -->");
			viewJsPath = '/'+viewJsPath.replace(/\\/g, '/');
			items.push('<script type="text/javascript" src="'+viewJsPath+'"></script');
			/*
			items.push(viewJsContent);
			items.push('</script>');
			*/
		}
		if (templateContent) {
			items.push("\t\t<!-- template file -->");
			items.push(templateContent);	
		}
	})
	items.push("<!-- end views in " + dir + " -->");

	return items.join('\n');	
}


/**
 * clientViewsDialogs: 获取client端需要的views和dialogs
 */
exports.clientViewsDialogs = function(req, dict) {
	var views = loadViews('./static/js/view');
	var dialogs = loadDialogs('./static/js/dialog');

	return {
		client_views: views,
		client_dialogs: dialogs
	}
}
