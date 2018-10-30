/**
 * Created by asus on 2017/6/1.
 */
var rating = (function () {
    'use strict';
    var extend = function (subClass, superClass) {
        var F = function () {};
        F.prototype = superClass.prototype;
        subClass.prototype = new F();
        subClass.prototype.constructor = subClass;
    };



    var Light = function (el, options) {
        this.$el = $(el);
        this.$items = this.$el.find('.rating-item');
        this.opts = options;
        this.add = 1;
        this.selectEvent = 'mouseover';
    };

    Light.prototype.init = function () {
        this.lightOn(this.opts.num);
        if (!this.opts.readOnly) {this.bindEvent();}
    };

    Light.prototype.lightOn = function (reIndex) {
        var reIndex = parseInt(reIndex);
        this.$items.each(function (index) { //点亮全部整的
            if (index < reIndex) {$(this).css('background-position', '0 -28px');}
            else {$(this).css('background-position', '0 0');}
        });
    };

    Light.prototype.bindEvent = function () {
        var _this = this,
            itemLen = this.$items.length;
        this.$el.on(this.selectEvent, '.rating-item', function (e) {
            _this.select(e, $(this));
            var reIndex = $(this).index() + _this.add;
            _this.lightOn(reIndex);
            (typeof _this.opts.select === 'function') && _this.opts.select.call(this, reIndex, itemLen);
            // _this.$el.trigger('select', [reIndex, itemLen]);
        }).on('click', '.rating-item', function () {
            _this.opts.num = $(this).index() + _this.add;
            (typeof _this.opts.chosen === 'function') && _this.opts.chosen.call(this, _this.opts.num, itemLen);
            _this.$el.trigger('chosen', [_this.opts.num, itemLen]);
        }).on('mouseout', function () {
            _this.lightOn(_this.opts.num);
        })
    };

    Light.prototype.select = function () {
        throw new Error('子类必须重写此方法');
    };

    Light.prototype.unbindEvent = function () {
        this.$el.off();
    };




    var LightEntire = function (el, options) {
        Light.call(this, el, options);
        this.selectEvent = 'mouseover';
    };
    extend(LightEntire, Light);

    LightEntire.prototype.init = function () {
        this.lightOn(this.opts.num);
        if (!this.opts.readOnly) {this.bindEvent();}
    };

    LightEntire.prototype.lightOn = function (ReIndex) {
        Light.prototype.lightOn.call(this, ReIndex);
    };

    LightEntire.prototype.select = function () {
        this.add = 1;
    };



    var LightHalf = function (el, options) {
        Light.call(this, el, options);
        this.selectEvent = 'mousemove';
    };
    extend(LightHalf, Light);

    LightHalf.prototype.init = function () {
        this.lightOn(this.opts.num);
        if (!this.opts.readOnly) {this.bindEvent();}
    };

    LightHalf.prototype.lightOn = function (reIndex) {
        var isHalf = (reIndex !== parseInt(reIndex));
        Light.prototype.lightOn.call(this, parseInt(reIndex));
        if (isHalf) {this.$items.eq(parseInt(reIndex)).css('background-position', '0 -37px');}

    };

    LightHalf.prototype.select = function (e, $this) {
        if (e.pageX - $this.offset().left < $this.width() / 2) {this.add = 0.5;}
        else {this.add = 1;}
    };



    var config = {
        mode: 'LightEntire',
        num: 0,
        readOnly: false,
        select: function () {},
        chosen: function () {}
    };
    var modes = {
        'LightEntire': LightEntire,
        'LightHalf': LightHalf
    };


    var init = function (el, option) { /////////////////////////////////////
        var rating = $(el).data('rating'),
            options = $.extend({}, config, typeof option === 'object' && option);
        if (!modes[options.mode]) {
            options.mode = 'LightEntire';
        }
        if (!rating) {
            $(el).data('rating', (rating = new modes[options.mode](el, options)));
            rating.init();
        }
        if(typeof option === 'string') {
            rating[option]();
        }
    };

    $.fn.extend({
        rating: function (option) {
            return this.each(function () {
                init(this, option);
            });
        }
    });


    return{
        init: init
    };
})();

$('#rating').rating({
    mode: 'LightHalf',
    num: 2.5
});
$('#rating').on('chosen', function () {
    $('#rating').rating('unbindEvent');
});