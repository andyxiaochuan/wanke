/*
Copyright (c) 2011-2012 Weizoom Inc
*/


/**
 * 添加项目对话框
 * 
 */
W.dialog.define('W.codehouse.dialog.AddProjectDialog', {
    templates: {
        dialogTmpl: '#system-add-project-dialog-tmpl-src'
    },

    onInitialize: function(options) {
    },

    beforeShow: function(options) {
        this.$dialog.find('[name="name"]').val('');
        this.$dialog.find('[name="description"]').val('');
    },

    onShow: function(options) {
        W.validate.reset();

        var _this = this;
        _.delay(function() {
            if (options.projectId) {
                W.Resource.get({
                    resource: 'project.project',
                    data: {
                        project_id: options.projectId
                    },
                    success: function(data) {
                        _this.$dialog.find('[name="description"]').val(data.description);
                        _this.$dialog.find('#project-name-input').val(data.name).focus();
                    },
                    error: function(resp) {
                        W.showHint('error', '加载Code数据失败!');
                    }
                });
            } else {
                _this.$dialog.find('#project-name-input').focus();
            }
            
        }, 300);
    },

    afterShow: function(options) {
    },

    /**
     * onClickSubmitButton: 点击“完成”按钮后的响应函数
     */
    onGetData: function(event) {
        if (!W.validate(this.$dialog)) {
            return null;
        }

        var name = this.$dialog.find('[name="name"]').val();
        var description = this.$dialog.find('[name="description"]').val();

        return {
            name: name,
            description: description
        };
    }
});