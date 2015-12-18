/*!
 * dorado
 *
 * Copyright(C) gaochuan, Inc.
 * MIT Licensed
 */

'use strict';

var path = require('path');

//用于session加密的token串
exports.SECRET = 'weizoom_guppy';

//mongodb连接信息
exports.MONGO = 'mongodb://127.0.0.1/guppy';

//未登录情况下跳转的登录链接
exports.LOGIN_URL = '/account/login/';

//登录成功情况下跳转的页面链接
exports.LOGINED_URL = '/project/projects/'

//RequectContext使用的processor
exports.CONTEXT_PROCESSORS = [
	'lib.context_processor.clientViewsDialogs'
]

//seig filters
exports.FILTERS = [
	// setting filter like 'lib.filters'
]

//connect中间件
exports.MIDDLEWARES = [
	'lib.middleware.auth'
]

//是否开启CORS支持
exports.ENABLE_CORS = true;

//API Server支持
exports.API_HOSTS = {
	"api.guppy.com": true, 
	"127.0.0.1:3000": true
}

exports.MONGO_ERROR_HANDLER = function(err) { return next(err); };

//项目相关目录
exports.PROJECT_HOME = __dirname; //home目录
exports.UPLOAD_DIR = path.join(__dirname, 'static/upload'); //上传图片目录