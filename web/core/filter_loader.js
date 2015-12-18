/*!
 * dorado
 *
 * Copyright(c) gaochuan
 * MIT Licensed
 */
'use strict';

/**
 * filter_loader: filter加载器
 */

var swig = require('swig');
var debug = require('debug')('dorado:filter_loader');

var settings = require('settings');

function loadFilters() {
	var filters = settings.FILTERS;
	for (var i = 0; i < filters.length; ++i) {
		var filterPath = filters[i].replace(/\./g, '/');
		require(filterPath);
		debug('load filter %s success!', filterPath);
	}
}

exports.load = loadFilters;