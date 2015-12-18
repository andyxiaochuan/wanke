/*
Copyright (c) 2011-2012 Weizoom Inc
*/


(function() {

ensureNS('W.resource');
ensureNS('W.resource.workbench');
W.resource.Resource = function(options) {
	this._id = null;
	this._ids = null;

	this.app = options.app || null;
	this.resource = options.resource || null;
}

W.resource.Resource.prototype.reset = function() {
	this._id = null;
	this._ids = null;
}

W.resource.Resource.prototype.id = function(_id) {
	this._id = _id;
	return this;
}

W.resource.Resource.prototype.ids = function(_ids) {
	this._ids = _ids;
	return this;
}

W.resource.Resource.prototype.__callApi = function(method, options) {
	var data = options.data;
	if (!data) {
		data = {};
	}
	if (this._id) {
		data['id'] = this._id;
	} else if (this.ids) {
		data['_ids'] = this._ids
	}
	W.getApi().call({
		method: method,
		app: this.app,
		scope: options.scope || window,
		resource: this.resource,
		args: data,
		success: options.success,
		error: options.error
	});
	this.reset();
	return this;
}

function __parseResource(options) {
	var app = options.app;
	var resource = options.resource;
	if (!app) {
		var pos = resource.indexOf('.');
		app = resource.substring(0, pos);
		resource = resource.substring(pos+1);
	}

	return {
		app: app,
		resource: resource
	}
}

W.resource.Resource.prototype.get = function(options) {
	options = options || {};
	var resourceInfo = __parseResource(options);
	this.app = resourceInfo.app;
	this.resource = resourceInfo.resource;
	return this.__callApi('get', options);
}

W.resource.Resource.prototype.put = function(options) {
	options = options || {};
	var resourceInfo = __parseResource(options);
	this.app = resourceInfo.app;
	this.resource = resourceInfo.resource;
	return this.__callApi('put', options);
}

W.resource.Resource.prototype.post = function(options) {
	options = options || {};
	var resourceInfo = __parseResource(options);
	this.app = resourceInfo.app;
	this.resource = resourceInfo.resource;
	return this.__callApi('post', options);
}

W.resource.Resource.prototype['delete'] = function(options) {
	options = options || {};
	var resourceInfo = __parseResource(options);
	this.app = resourceInfo.app;
	this.resource = resourceInfo.resource;
	return this.__callApi('delete', options);
}

W.Resource = new W.resource.Resource({});

})()
