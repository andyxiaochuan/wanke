/*
Copyright (c) 2011-2013 Weizoom Inc
*/
ensureNS('W.view');

//<name, view define>缓存
W.view.NAME2DEFINE = {};

/**
 * W.view.create: 创建view
 */
W.view.create = function(viewName, options) {
    //没有dialog，创建之
    var viewDefine = W.view.NAME2DEFINE[viewName];
    if (!viewDefine.view) {
        xlog('create view class for ' + viewName);
        viewDefine.view = Backbone.View.extend(viewDefine.define);
    } else {
        xlog('use existed view class for ' + viewName);
    }
    var viewConstructor = viewDefine.view;

    if (viewConstructor) {
        xlog('create instance of ' + viewName);
        var viewInstance = new viewConstructor(options);
        return viewInstance;
    } else {
        return null;
    }
}

W.view.define = function(viewName, viewDefine) {
    var pos = viewName.lastIndexOf('.');
    if (pos === -1) {
        xlog("invalid dialog name : " + viewName);
        return;
    }

    W.view.NAME2DEFINE[viewName] = {
        define: viewDefine
    }
}