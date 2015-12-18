(function($, undefined) {

    W.view.define('W.view.ProjectEditor', {
        events: {
            'dblclick .xa-codeBar': 'onDblClickCodeBar',
            'mousedown .xa-codeBar': 'onClickCodeBar',
        },

        initialize: function(options) {
            console.log('initialize W.view.ProjectEditor');
            this.codezone2width = {};

            this.isHoldLeftButton = false;
        },

        render: function() {
            var $window = $(window);
            this.__layoutCodeZones();

            var topBoxHeight = $window.outerHeight() * 0.4;
            $('.xui-projectPage-topBox').height(topBoxHeight);
            var hbarBottom = 53 + topBoxHeight + 17;
            var previewHeight = $window.outerHeight() - hbarBottom;
            this.$('.xa-preview').height(previewHeight);

            this.$el.show();

            var jsCodeContent = $.trim(this.$('.xa-jsCode .xa-content').html());
            this.jsCodeMirror = this.__createCodeEditor('.xa-jsCode', 'javascript', jsCodeContent);

            var cssCodeContent = $.trim(this.$('.xa-cssCode .xa-content').html());
            this.cssCodeMirror = this.__createCodeEditor('.xa-cssCode', 'css', cssCodeContent);

            var htmlCodeContent = $.trim(this.$('.xa-htmlCode .xa-content').html());
            this.htmlCodeMirror = this.__createCodeEditor('.xa-htmlCode', 'text/html', htmlCodeContent);

            this.__listenGlobalMouseup();
            this.__listenGlobalCtrlS();

            this.projectId = this.$el.data('id');
        },

        __listenGlobalMouseup: function() {
            var _this = this;
            $(document).mouseup(function(event) {
                console.log('mouse up');
                if (event.which == 1 && _this.isHoldLeftButton) {
                    _this.isHoldLeftButton = false;
                }
            });
        },

        __listenGlobalCtrlS: function() {
            var _this = this;
            $(window).keydown(function(event) {
                if ((event.ctrlKey || event.metaKey) && event.which == 83) {
                    event.preventDefault();
                    var data = _this.getValue();
                    data.id = _this.projectId;
                    W.Resource.post({
                        resource: 'project.code',
                        data: data,
                        success: function(data) {
                            W.showHint('success', '更新代码成功');
                            document.getElementById('previewWindow').contentWindow.location.reload();
                        },
                        error: function(resp) {
                            W.showHint('error', '更新代码失败！');
                        }
                    });
                    return false;
                }
            })
        },

        __createCodeEditor: function(selector, mode, value) {
            var $code = this.$(selector);
            var codeMirror = CodeMirror($code.get(0), {
                value: value,
                mode: mode,
                lineNumbers: true,
                theme: 'monokai',
                scrollbarStyle: 'simple',
                lineWrapping: true
            });
            $code.find('.CodeMirror').height($code.outerHeight() - 32);

            return codeMirror;
        },

        __layoutCodeZones: function() {
            var $window = $(window);
            var windowWidth = $window.outerWidth();
            var codeZoneWidth = windowWidth - 2*30;

            if (this.codezone2width.hasOwnProperty('html')) {
                var htmlWidth = this.codezone2width['html'] === -1 ? codeZoneWidth : this.codezone2width['html'];
                var cssWidth = this.codezone2width['css'] === -1 ? codeZoneWidth : this.codezone2width['css'];
                var jsWidth = this.codezone2width['js'] === -1 ? codeZoneWidth : this.codezone2width['js']
            } else {
                var averageWidth = codeZoneWidth/3.0;
                var htmlWidth = averageWidth;
                var cssWidth = averageWidth;
                var jsWidth = averageWidth;
                this.codezone2width['html'] = htmlWidth;
                this.codezone2width['css'] = cssWidth;
                this.codezone2width['js'] = jsWidth;
            }

            function __setWidth(codeType, width) {
                var $code = this.$('.xa-'+codeType+'Code').eq(0);
                $code.width(width);

                var $codeBar = this.$('.xa-'+codeType+'CodeBar').eq(0);
                if (width === 0) {
                    $codeBar.find('.xa-title').addClass('xui-i-vbarTitle-collapsed');
                } else {
                    $codeBar.find('.xa-title').removeClass('xui-i-vbarTitle-collapsed');
                }
            }

            __setWidth('html', htmlWidth);
            __setWidth('css', cssWidth);
            __setWidth('js', jsWidth);
        },

        getValue: function() {
            var html = this.htmlCodeMirror.getValue();
            var css = this.cssCodeMirror.getValue();
            var js = this.jsCodeMirror.getValue();
            return {
                html: html,
                css: css,
                js: js
            }
        },

        onDblClickCodeBar: function(event) {
            var $bar = $(event.currentTarget);
            var targetZone = $bar.data('for');
            this.codezone2width['html'] = 0;
            this.codezone2width['css'] = 0;
            this.codezone2width['js'] = 0;
            this.codezone2width[targetZone] = -1;
            this.__layoutCodeZones();
        },

        onClickCodeBar: function(event) {
            if (event.which == 1) {
                this.isHoldLeftButton = true;
            }
        }
    });

})(jQuery);