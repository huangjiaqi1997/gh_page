/**
 * Created by asus on 2017/6/8.
 */
(function ($) {
    //私有方法 获取浏览器前缀
    var _prefix = (function (temp){
        var aPrefix = ['webkit', 'Moz', 'o', 'ms'],
            props = '';
        for (var i in aPrefix) {
            props = aPrefix[i] + 'Transition';
            if (temp.style[ props] !== undefined) {
                return '-' + aPrefix[i].toLowerCase() + '-';
            }
        }
        return false;
    })(document.createElement(PageSwitch));

    var PageSwitch = (function () {

        function PageSwitch(el, opts) {
            this.sets = $.extend(true, $.fn.PageSwitch.defaults, opts || {});
            this.el = el;
            this.init();
        }
        PageSwitch.prototype = {
            //初始化dom结构，布局，分页，绑定事件
            init: function () {
                this.selectors = this.sets.selectors;
                this.container = $(this.selectors.container);
                this.section = this.container.find(this.selectors.section);
                this.direction =
                    (this.sets.direction === 'vertical') ? true : false;
                this.pagesCount = this.pagesCount();
                this.index =
                    (this.sets.index >= 0 && this.sets.index < this.pagesCount) ? this.sets.index : 0;
                this.canScroll = true;

                if (!this.direction) {this._initLayout();}
                this._initEvent();
            },
            //获取页面数量
            pagesCount: function () {
                return this.section.length;
            },
            // 获取页面宽或高
            switchLength: function(){
                return this.direction ? this.el.height() : this.el.width();
            },
            //到上一页
            prev: function(){
            },
            //到下一页
            next: function(){
            },
            // 横屏页面布局
            _initLayout: function(){
                var _this = this;
                var width = (this.pagesCount * 100) + '%',
                    cellWidth = (100/_this.pagesCount()).toFixed(2) + '%';
                _this.container.width(width);
                _this.section.width(cellWidth).css('float', 'left');
            },
            // 分页的页面结构和css样式
            _initPaging: function () {
                var pagesClass = this.selectors.page.substring(1);
                this.activeClass = this.selectors.active.substring(1);
                var pageHtml = '<ul class='+pagesClass+'>';
                for (var i = 0; i < this.pagesCount; i++) {
                    pageHtml += '<li></li>';
                }
                pageHtml += '</ul>';
                this.el.append(pageHtml);
                var pages = this.el.find(this.selectors.page);
                this.pageItem = pages.find('li');
                this.pageItem.eq(this.index).addClass(this.activeClass);
                if (this.direction) {
                    pages.addClass('vertical');
                } else {
                    pages.addClass('horizontal');
                }
                this._initEvent();
            },
            // 初始化插件事件
            _initEvent: function(){
                this.el.on('click', this.selectors.pages + ' li', function(){
                    this.index = $(this).index();
                    this._scrollPage();
                });

                this.el.on('mousewheel DOMMouseScroll', function(e){
                    if (this.canScroll) {
                        var delta = e.originalEvent.wheelDelta || -e.originalEvent.detail;
                        if (delta > 0 && (this.index && !this.sets.loop || this.sets.loop)) {
                            this.prev();
                        } else if (delta < 0 && (this.index < (this.pagesCount - 1) && !this.sets.loop || this.sets.loop)) {
                            this.next();
                        }
                    }
                });

                $(window).on('keydown', function (e) {
                    var keyCode = e.keyCode;
                    if (keyCode === 37 || keyCode === 38) {
                        this.prev();
                    } else if (keyCode === 39 || keyCode === 40) {
                        this.next();
                    }
                });

                $(window).resize(function () {
                    var currentLenght = this.switchLength();
                    var offset = this.sets.direction ? this.section.eq(this.index).offset().top : this.section.eq(this.index).offset().left;
                    if (Math.abs(offset) > currentLenght / 2 && this.index < (this.pagesCount - 1)) {
                        this.index ++;
                    }
                    if (this.index) {
                        this._scrollPage();
                    }
                });

                this.container.on('transitionend ebkitTransitionEnd oTransitionEnd', function () {
                    this.canScroll = true;
                    if (this.sets.callback && $.type(this.sets.callback) === 'function') {
                        this.sets.callback();
                    }
                });
            },
            //滑动动画
            _scrollPage: function () {
                var _this = this;
                var dest = this.section.eq(this.index).position();
                if (!dest) {return;}

                this.canScroll = false;
                if (_prefix) {
                    this.container.css(_prefix+'transition','all'+this.sets.duration+'ms'+this.sets.easing);
                    var translate = this.direction?'translateY(-'+dest.top+'px)':'translateX(-'+dest.left+'px)';
                    this.container.css(_prefix+'transform', translate);
                } else {
                    var animateCss = this.direction?{top:-dest.top}:{left:-dest.left};
                    this.container.animate(animateCss,this.sets.duration, function () {
                        _this.canScroll = true;
                        if (_this.sets.callback && $.type(_this.sets.callback) === 'function') {
                            _this.sets.callback();
                        }
                    });
                }
            }

        };
        return PageSwitch;
    })();
    
    
    //创建插件
    $.fn.PageSwitch = function (options) {
        return this.each(function () {
            var _this = $(this),
                instance = _this.data('PageSwitch');
            if (!instance) {
                new PageSwitch(_this, options);
                _this.data('PageSwitch', instance);
            }
            if ($.type(options) === 'string') return instance[options]();
            $('div').PageSwitch('init');
        });
    };
    //默认参数
    $.fn.PageSwitch.defaults = {
        selectors: {
            container: '#container',
            section: '.section',
            page: '.pages',
            active: '.active'
        },
        index: 0,
        easing: 'ease',
        duration: 500,
        loop: false,
        pagination: true,
        keyboard: true,
        direction: 'vertical',
        callback: ''
    };
    /*$(function () {
        $('[data-PageSwitch]').PageSwitch();
    })*/
})(jQuery);