/**
 * Created by asus on 2017/6/4.
 */
define(['jquery'],function ($) {
    var ScrollTop = function (config) {
        this.opts = config;
        this.$el = $('html');
    };


    ScrollTop.prototype.move = function () {
        var opts = this.opts,
            dest = opts.dest;
        if ($(window).scrollTop() !== dest) { //避免连续移动
            if (!this.$el.is(':animated')) {
                this.$el.animate({scrollTop: dest}, opts.speed);
            }
        }
    };
    ScrollTop.prototype.go = function () {
        var dest = this.opts.dest;
        if ($(window).scrollTop() !== dest) {
            this.$el.scrollTop(dest);
        }
    };

    return{
        ScrollTo: ScrollTop
    };
});