/*
Copyright (c) 2011-2012 Weizoom Inc
*/


/**
 * 添加项目对话框
 * 
 */
W.dialog.define('W.codehouse.dialog.AddQuestionDialog', {
    templates: {
        dialogTmpl: '#system-add-question-dialog-tmpl-src'
    },

    onInitialize: function(options) {
    },

    beforeShow: function(options) {
        this.$dialog.find('.xa-feedMan').val(options.feedman);
        this.$dialog.find('.xa-survey').val(options.survey);
        this.$dialog.find('.xa-content').val(options.content);
        this.$dialog.find('.xa-subtime').val(options.subTime);
   
    },

    onShow: function(options) {
        W.validate.reset();

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

        var feedman = this.$dialog.find('.xa-feedMan').val();
        var survey = this.$dialog.find('.xa-survey').val();
        var content = this.$dialog.find('.xa-content').val();
        var subtime = this.$dialog.find('.xa-subtime').val();
        var status = this.$dialog.find('.xa-status').is(':checked');
        if(status)
        {
            status=1;
        }
        else{
             status=0;
        };

        return {
            feedman: feedman,
            survey: survey,
            content: content,
            subtime: subtime,
            status: status

        };
    }
});