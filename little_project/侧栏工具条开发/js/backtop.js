/**
 * Created by asus on 2017/6/4.
 */
define(['jquery', 'scrollto'], function ($, scrollto) {
    function BackTop(el, config) {
        this.opts = $.extend({}, BackTop.DEFAULTS, config);
        this.$el = $(el);
        this.scroll = new scrollto.ScrollTo(this.opts);

        this._checkPosition();

        if (this.opts.mode === 'move') {
            this.$el.on('click', $.proxy(this._move, this)); //
        } else {
            this.$el.on('click', $.proxy(this._go, this));
        }
        $(window).on('scroll', $.proxy(this._checkPosition, this));
    }

    BackTop.DEFAULTS = {
        mode: 'move',
        pos : $(window).height(),
        dest: 0,
        speed: 800
    };
    BackTop.prototype._move = function () {
        this.scroll.move();
    };
    BackTop.prototype._go = function () {
        this.scroll.go();
    };
    BackTop.prototype._checkPosition = function () {
        if ($(window).scrollTop() > this.opts.pos) {
            this.$el.fadeIn();
        } else {
            this.$el.fadeOut();
        }
    };
    
    
    $.fn.extend({
        backtop: function (config) {
            return this.each(function () {
                new BackTop(this, config);
            });
        }
    });

    return{
        BackTop: BackTop
    }

});