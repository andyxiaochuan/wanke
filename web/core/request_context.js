/*!
 * 
 * Copyright(c) andy
 * MIT Licensed
 */
'use strict';

/**
 * 仿照Django的RequestContext实现
 * author: robert
 */
var debug = require('debug')('core:request_context');
var _ = require('underscore');

var settings = require('settings');

var RequestContext = function(req, dict) {
	dict['req'] = req;
	dict['user'] = req.user;
	
	var processors = settings.CONTEXT_PROCESSORS;
	for (var i = 0; i < processors.length; ++i) {
		var processor = processors[i];
		var pos = processor.lastIndexOf('.');
		if (pos === -1) {
			debug.warn('context processor %s is not valid', processor);
		} else {
			var path = processor.substring(0, pos);
			var func = processor.substring(pos+1);
			path = path.replace(/\./g, '/');
			var module = require(path);
			debug('call context processor: %s', processor)
			var newDict = module[func](req, dict)
			if (newDict) {
				_.extend(dict, newDict);
			}
		}
	}

	return dict;
}

exports.RequestContext = RequestContext;