/**
 * Created by asus on 2017/6/1.
 */
;(function ($) {
    'use strict';
    var LightBox = function (settings) {
        var _this = this;
        this.mask = $('<div id="lb-mask"></div>');
        this.popup = $('<div id="lb-container"></div>');
        this.bodyNode = $(document.body);
        this.config = {
            speed: 500
        };
        $.extend(this.config, settings || {});

        //渲染，把遮罩、弹出层插入到body中
        this.renderDOM();
        //定义DOM元素
        this.showDiv = this.popup.find('div.lb-show-div');
        this.showPic = this.popup.find('img.lb-show-pic');
        this.caption = this.popup.find('div.lb-side');
        this.captionText = this.popup.find('p.lb-side-div-desc');
        this.currentIndex = this.popup.find('span.lb-side-div-index');
        this.closeBtn = this.popup.find('span.lb-side-close');
        this.nextBtn = this.popup.find('span.lb-next-btn');
        this.prevBtn = this.popup.find('span.lb-prev-btn');

        //单击 获取图片组数据、弹出图片
        this.groupName = null;
        this.groupData = [];
        this.bodyNode.on('click', '.js-lb', '[data-role=lb]', function (e) {
            e.stopPropagation();
            // _this.index = $(this).parent().find(".js-lightbox").index($(this));
            var currentGroupName = $(this).attr('data-group');
            if (currentGroupName !== _this.groupName) {
                _this.groupName = currentGroupName;
                _this.getGroupData();
            }
            _this.initPopup($(this));
        });


        //关闭按钮
        this.mask.click(function () {
            $(this).fadeOut();
            _this.popup.fadeOut();
            _this.showOn = false;
        });
        this.closeBtn.click(function () {
            _this.mask.fadeOut();
            _this.popup.fadeOut();
            _this.showOn = false;
        });


        //按钮切换
        this.flag = true;
        this.prevBtn.hover(function () { //没有disabled的情况
            if (!$(this).hasClass('disabled')) {$(this).addClass('lb-prev-btn-show');}
        }, function () {
            if (!$(this).hasClass('disabled')) {$(this).removeClass('lb-prev-btn-show');}
        }).click(function (e) {
            if (!$(this).hasClass('disabled') && _this.flag) {
                _this.flag =false;
                e.stopPropagation();
                _this.goTo('prev');}
        });

        this.nextBtn.hover(function () {
            if (!$(this).hasClass('disabled')) {$(this).addClass('lb-next-btn-show');}
        }, function () {
            if (!$(this).hasClass('disabled')) {$(this).removeClass('lb-next-btn-show');}
        }).click(function (e) {
            _this.flag = false;
            e.stopPropagation();
            if (!$(this).hasClass('disabled')) {_this.goTo('next');}
        });


        //窗口缩放事件，在显示状态下调用loadShowPicSize()
        // 键盘事件，调用btn.click()
        var timer = null;
        this.showOn = false; //popup隐藏也会触发调整
        $(window).resize(function () {
            if (_this.showOn) {
                window.clearTimeout(timer);
                timer = window.setTimeout(function () {
                    _this.loadShowPicSize(_this.groupData[_this.index].src);
                }, 500);
            }
        }).keyup(function (e) {
            var keyValue = e.which;
            if (_this.showOn) {
                if (keyValue === 37 || keyValue === 38) {
                    _this.prevBtn.click();
                } else if (keyValue === 39 || keyValue === 40) {
                    _this.nextBtn.click();
                }
            }
        });

    };



    LightBox.prototype = {
        renderDOM: function () {
            var strDom =
                '<div class="lb-show-div">' +
                    '<img class="lb-show-pic">' +
                    '<span class="lb-btn lb-prev-btn"></span>' +
                    '<span class="lb-btn lb-next-btn"></span>' +
                '</div>' +
                '<div class="lb-side">' +
                    '<div class="lb-side-div">' +
                        '<p class="lb-side-div-desc"></p>' +
                        '<span class="lb-side-div-index"></span>' +
                    '</div>' +
                    '<span class="lb-side-close"></span>' +
                '</div>';
            this.popup.html(strDom);
            this.bodyNode.append(this.mask, this.popup);
        },


        getGroupData: function () {
            var _this = this;
            var groupImgs = this.bodyNode.find('[data-group=' + this.groupName + ']');
            this.groupData.length = 0; //清空上组图片的数据
            groupImgs.each(function () {
                _this.groupData.push({
                    src: $(this).attr('data-source'),
                    id: $(this).attr('data-id'),
                    caption: $(this).attr('data-caption')
                });
            });
        },


        //通过事件元素，获取图片的src和id，调用showMaskAndPopup(src, id)
        initPopup: function (currentObj) { //单
            var src = currentObj.attr('data-source'),
                id = currentObj.attr('data-id');
            this.showMaskAndPopup(src, id);
        },



        /**
         * 动画弹出遮罩层 popup showDiv 切换按钮，并计算位置和定位
         * 调用loadShowPicSize(src)
         * 调用getIndexOf(id)，判断切换按钮的index
         */
        showMaskAndPopup: function (src, id) {
            var _this = this,
                winWidth = $(window).width(),
                winHeight = $(window).height();

            this.mask.fadeIn();
            this.showPic.hide();
            this.caption.hide();

            this.showDiv.css({
                width: winWidth / 2,
                height: winHeight / 2,
                background: 'url("img/icon/loading.gif") no-repeat center center'
            });

            this.popup.fadeIn();
            this.popup.css({
                width: winWidth / 2 + 10,
                height: winHeight / 2 + 10,
                marginLeft: winWidth / 4 - 5 / 2, //设置水平居中
                top: -winHeight / 2 + 10
            }).animate({
                top: winHeight / 4 - 5 / 2
            },this.config.speed, function () {
                _this.loadShowPicSize(src);
            });

            this.index = this.getIndexOf(id);
            var groupDataLen = this.groupData.length;
            if (groupDataLen > 1) {
                if (this.index === 0) {
                    this.prevBtn.addClass('disabled');
                    this.nextBtn.removeClass('disabled');
                } else if (this.index === groupDataLen - 1) {
                    this.prevBtn.removeClass('disabled');
                    this.nextBtn.addClass('disabled');
                } else {
                    this.prevBtn.removeClass('disabled');
                    this.nextBtn.removeClass('disabled');
                }
            }
        },


        getIndexOf: function (id) {
            var index = 0;
            $(this.groupData).each(function (i) {
                index = i;
                if (this.id === id) {
                    return false;
                }
            });
            return index;
        },


        /**
         * 重置showPic img元素的宽高 隐藏showPic side
         * 调用preLoadShowPic(src, callback)
         * 获取showDiv的宽高，调用showShowPic(picWidth, picHeight)
         */
        loadShowPicSize: function (src) {
            var _this = this;
            _this.showPic.css({width: 'auto', height: 'auto'}); //重置
            _this.showPic.hide();
            _this.caption.hide();
            this.preLoadShowPic(src, function () {
                _this.showPic.attr('src', src); //改变src路径
                var picWidth = _this.showPic.width(), //showPic = 第一张图片宽度
                    picHeight = _this.showPic.height();
                _this.showShowPic(picWidth, picHeight);
            });
        },


        /**
         * 图片预加载
         */
        preLoadShowPic: function (src, callback) {
            var img = new Image();
            if (!!window.ActiveXObject) { //IE
                img.onreadystatechange = function () {
                    if (this.readyState === 'complete') {
                        callback();
                    }
                };
            }
            $(img).on('load unload', function () {
                callback();
            });
            img.src = src;
        },


        /**
         * 通过图片宽高计算showDiv popup showPic宽高和定为，显示side、showPic
         * 获得side中文本
         */
        showShowPic: function (picWidth, picHeight) {
            var _this = this,
                winWidth = $(window).width(),
                winHeight = $(window).height(),
                scale = Math.min(winWidth / (picWidth + 10), winHeight / (picHeight + 10), 1);
            picWidth = picWidth * scale;
            picHeight = picHeight * scale;
            this.showDiv.animate({
                width: picWidth - 10,
                height: picHeight -10
            },this.config.speed);
            this.popup.animate({
                width: picWidth,
                height: picHeight,
                marginLeft: (winWidth - picWidth) / 2,
                top: (winHeight - picHeight) /2
            },this.config.speed, function () {
                _this.showPic.css({ //img元素的宽高被设置，下一次改变其src属性！
                    width: picWidth - 10,
                    height: picHeight -10
                }).fadeIn();
                _this.caption.css({width: picWidth - 10}).fadeIn();
                _this.flag =true;
                _this.showOn = true;
            });
            this.captionText.text(this.groupData[this.index].caption);
            this.currentIndex.text('当前索引:' + (this.index + 1) + 'of' + this.groupData.length);
        },


        goTo: function (dir) {
            if (dir === 'next') {
                this.index++;
                if (this.index >= this.groupData.length -1) {
                    this.nextBtn.addClass('disabled').removeClass('lb-next-btn-show');
                }
                if (this.index !== 0) {
                    this.prevBtn.removeClass('disabled');
                }
            }
            if (dir === 'prev') {
                this.index--;
                if (this.index <= 0) {
                    this.prevBtn.addClass('disabled').removeClass('lb-prev-btn-show');
                }
                if (this.index !== this.groupData.length -1) {
                    this.nextBtn.removeClass('disabled');
                }
            }
            var src = this.groupData[this.index].src;
            this.loadShowPicSize(src);
        }
    };


    window.LightBox = LightBox;
})(jQuery);