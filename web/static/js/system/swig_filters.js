/*
Copyright (c) 2011-2012 Weizoom Inc
*/

(function(swig, undefined) {
	
	swig.setFilter('format_opacity', function(opacity) {
		result = (100.0-parseInt(opacity))/100
		return result
	});

})(swig);