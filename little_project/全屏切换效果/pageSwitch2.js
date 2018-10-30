/**
 * Created by asus on 2017/6/15.
 */
(function ($) {
    'use strict';

    var PageSwitch = (function () {
        function PageSwitch(el, opts) {
            this.sets = $.extend(true, /*$.fn.*/PageSwitch.defaults, opts || {});
            this.container = el;
            this.init();
        }
        PageSwitch.defaults = {
            selectors: {
                container: '#container',
                section: '.section',
                pages: '.pages',
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

        PageSwitch.prototype = {
            init: function () {
                this.sections = this.container.find(this.sets.selectors.section);
                this.direction = this.sets.direction === 'vertical' ? true : false;
                this.pagesCount = this.pagesCount();
                this.index = this.sets.index >= 0 && this.sets.index < this.pagesCount ? this.sets.index : 0;
                this.canScroll = true;

                if (!this.direction) {this._initLayout();}
                this._initEvent();
            },
            /*获取页面数量*/
            pagesCount: function () {
                return this.sections.length;
            },
            /*获取页面高或宽*/
            switchLength: function () {
                console.log(this.container.height())
                return this.direction ? this.container.height() : this.container.width();
            },
            prev: function () {

            },
            next: function () {

            },
            /*横屏页面布局*/
            _initLayout: function () {
                var width = this.pagesCount * 100 + '%',
                    cellWidth = (100 / this.pagesCount).toFixed(2) + '%';
                this.container.width(width);
                this.section.width(cellWidth).css('float', 'left');
            },
            /*分页结构和css样式*/
            _initPaging: function () {
                var pagesClass = this.selectors.pages.substring(1);
                this.activeClass = this.selectors.active.substring(1);
                var pageHtml = '<ul class=' + pagesClass + '>';
                for (var i = 0; i < this.pagesCount; i++) {
                    pageHtml += '<li>2</li>';
                }
                pageHtml += '</ul>';
                this.container.append(pageHtml);
                var pages = this.container.find(this.selectors.pages);
                this.pageItems = pages.find('li');
                this.pageItems.eq(this.index).addClass(this.activeClass);
                if (this.direction) {pages.addClass('vertical');}
                else {pages.addClass('horizontal');}
                this._initEvent();
                console.log(2)
            },
            _initEvent: function () {
                
            }
        };

        var pageSwitch = new PageSwitch($('#container'), {});
        return PageSwitch;
    })();

   /* /!*默认参数*!/
    $.fn.PageSwitch.defaults = {
        selectors: {
            container: '#container',
            section: '.section',
            pages: '.pages',
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
    };*/

    /*$.fn.PageSwitch = function (opts) {
        return this.each(function () {
            var instance = this.data('PageSwitch');
            if (!instance) {
                new PageSwitch(this, opts);
                this.data('PageSwitch', instance);
            }
            if ($.type(opts) === 'string') {return instance[opts]();}
            $('div').PageSwitch('init');
        });
    };*/

})(jQuery);