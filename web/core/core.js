/*!
 * dorado
 *
 * Copyright(c) andy
 * MIT Licensed
 */
'use strict';

var str = require("underscore.string");
var util = require('util');
var debug = require('debug')('dorado:core');

//增强js原生类型
(function() {
	/**
	 * 增强function
	 */
	Function.prototype.require = function(conditions) {
		var realFunc = this;
		if (!util.isArray(conditions)) {
			conditions = [conditions];
		}
		var func = function(req, res) {
			for (var i = 0; i < conditions.length; ++i) {
				var condition = conditions[i];
				var result = condition.call(this, req, res);
				if (result) {
					return;
				}
			}

			realFunc(req, res);
		}
		return func;
	}

	/**
	 * 增强String
	 */
	String.prototype.splitLines = function() {
		return str(this).trim().value().replace(/(\r\n)|\r|\n/g, '\n').split(/\n+/g);
	}

	String.prototype.trim = function() {
		return str(this).trim().value();
	}

	String.prototype.ltrim = function() {
		return str(this).ltrim().value();
	}

	String.prototype.rtrim = function() {
		return str(this).rtrim().value();
	}

	String.prototype.startsWith = function(prefix) {
		return str(this).startsWith(prefix);
	}

	String.prototype.endsWith = function(suffix) {
		return str(this).endsWith(suffix);
	}
})();





//增强underscore
var _ = require("underscore");
(function() {
	/**
	 * 将[obj, obj, obj]转换为{key:obj, key:obj, key:obj}
	 */
	_.dict = function(collection, keyFn, valueFn, options) {
		var keyField = null;
		var useKeyFn = true;
		var useValueFn = true;
		if (!util.isFunction(valueFn)) {
			if (util.isObject(valueFn)) {
				options = valueFn;
			}
		}

		var isToArray = false;
		if (options && options.toArray) {
			isToArray = true;
		}

		if (_.isString(keyFn)) {
			var keyField = keyFn;
			useKeyFn = false;
		}
		if (!_.isFunction(valueFn)) {
			useValueFn = false;
		}

		var dict = {};
		_.each(collection, function(item) {
			if (useKeyFn) {
				var key = keyFn(item);
			} else {
				var key = item[keyField]
			}

			if (useValueFn) {
				var value = valueFn(item);
			} else {
				var value = item
			}

			var storedValue = dict[key];
			if (storedValue && isToArray) {
				storedValue.push(value);
			} else if (isToArray) {
				dict[key] = [value];
			} else {
				dict[key] = value;
			}
		})

		return dict;
	}


	_.modelToObj = function(models, fn) {
		var objs = _.map(models, function(model) {
			var obj = model.toObject();
			if (fn) {
				fn(obj);
			}

			return obj;
		})
	}

	_.fetchRelatedObjs = function(options) {
		var relatedId = options.local.field;
		var models = options.local.data;
		var relatedModel = options.relate.model;

		var relatedIds = _.uniq(_.pluck(models, relatedId));
		var query = {
			'_id': {
				"$in": relatedIds
			}
		};
		relatedModel.find(query).exec(function(err, relatedObjs) {
			if (options.success) {
				relatedObjs = _.map(relatedObjs, function(relatedObj) { return relatedObj.toObject(); });
				options.success(relatedObjs);
			}
		});
	}

	_.connectRelatedObj = function(options) {
		var relatedId = options.local.field;
		var newField = options.relate.field;
		var models = options.local.data;
		var relatedModel = options.relate.model;

		var related2models = _.dict(models, relatedId, {toArray:true});
		var relatedIds = _.uniq(_.pluck(models, relatedId));
		var query = {
			_id: {
				"$in": relatedIds
			}
		};

		var defer = Promise.defer();
		relatedModel.find(query).exec(function(err, relatedObjs) {
			relatedObjs.forEach(function(relatedObj) {
				relatedObj = relatedObj.toObject();
				related2models[relatedObj._id].forEach(function(model) {
				model[newField] = relatedObj;
				});
			});

			/*
			if (options.success) {
				options.success(models);
			}
			*/
			defer.resolve(models);
		});
		
		return  defer.promise;
	}

})();



/**
 * enhance mongoose
 */
(function() {
var mongoose = require('mongoose');
var oldToObject = mongoose.Document.prototype.toObject;
debug('hack mongoose.Document.prototype.toObject');
mongoose.Document.prototype.toObject = function(options) {
	var result = this.$toObject(options);
	result.id = this.id;
	return result;
};

}());