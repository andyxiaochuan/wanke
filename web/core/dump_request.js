/*!
 * dorado
 *
 * Copyright(c) andy
 * MIT Licensed
 */
'use strict';

var debug = require('debug')('dorado:dump_request');


function dumpRequest(req, res, extras) {
	var cache = [];
	var replacer = function(key, value) {
		if (value === undefined) {
			return 'undefined';
		}
	};

	res.setHeader('Content-Type', 'application/json');

	var data = {};
	data['headers'] = req.headers;
	data['url'] = req.url;
	data['baseUrl'] = req.baseUrl;
	data['originalUrl'] = req.originalUrl;
	data['method'] = req.method;
	data['GET'] = req.GET;
	data['POST'] = req.POST;
	data['cookies'] = req.cookies;
	data['originalMethod'] = req.originalMethod;
	data['session'] = req.session;
	data['user'] = req.user,
	data['route'] = req.route;
	data['extras'] = extras;
	res.write(JSON.stringify(data));
	res.end();
}

exports.dumpRequest = dumpRequest;
