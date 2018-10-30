/**
 * Created by asus on 2017/5/24.
 */
;(function ($) {
	var Tab = function (tab, myConfig) {
		var _this_ = this;
		this.tab = tab;
		this.index = 0;
		this.myConfig = myConfig;



		//默认参数
		this.config = {
			'triggerType': 'mouseover',
			'effect': 'default', //切换效果
			'invoke': 1, //默认显示第几tab
			'auto': false //播放间隔
		};
		//参数扩展
		if (this.getConfig()) {
			$.extend(this.config, this.getConfig());
		}
		var config = this.config;




		//根据triggerType类型触发invoke切换事件
		this.tabItems = tab.find('ul.tab-nav li');
		if (config.triggerType === 'click') {
			this.tabItems.bind('click', function () {
				_this_.invoke($(this)); ////$(this)是单个的tabItem
			});
		} else if (config.triggerType === 'mouseover' || config.triggerType !== 'click') {
			this.tabItems.bind('mouseover', function () {
				_this_.invoke($(this)); //
			});
		}




		//autoPlay轮播事件
		if (config.auto) {
			this.timer = null;
			this.loop =0;

			this.autoPlay();

			this.tab.hover(function () { //hover函数: 轮播重置
				window.clearInterval(_this_.timer);
			}, function () {
				_this_.autoPlay();
			})
		}




		//根据invoke参数调用invoke事件
		if (config.invoke > 1) {
			this.invoke(this.tabItems.eq(config.invoke - 1))
		}

	};



	Tab.prototype = {
		//获取人工配置参数函数
		getConfig: function () {
			var myConfig = this.myConfig;
			console.log(myConfig);
			if (myConfig && myConfig !== '') {

				return $.parseJSON(myConfig);
			} else {
				return null;
			}
		},



		//单次切换函数
		invoke: function (currentTab) {
			this.index = currentTab.index();
			var effect = this.config.effect;
			var conItems = this.tab.find('div.content-wrap div.content-item');
			var images = conItems.find('img');

			currentTab.addClass('active').siblings().removeClass('active');

			if (effect === 'default' || effect !== 'fade') {
				conItems.eq(this.index).addClass('current').siblings().removeClass('current');
			} else if (effect === 'fade') {
				conItems.eq(this.index).fadeIn().siblings().fadeOut();

			}
			conItems[this.index].style.height = images[this.index].height +'px';
		},



		//轮播函数（通过改变index间接调用invoke函数
		autoPlay: function () {
			var _this_ = this,
				tabLen = this.tabItems.length;

			this.timer = window.setInterval(function () {
				_this_.index++;
				_this_.index = _this_.index >=tabLen ? 0 : _this_.index;

				/*_this_.tabItems.eq(_this_.index).trigger(_this_.config.triggerType) //调用invoke？*/
				_this_.invoke(_this_.tabItems.eq(_this_.index));
			}, _this_.config.auto);
		}
	};



	//注册jQuery方法
	$.fn.extend({
		tab: function (myConfig) {
			this.each(function () {
				new Tab($(this), myConfig);
			});

			return this; //返回调用元素组，可链式操作
		}
	});
})(jQuery);