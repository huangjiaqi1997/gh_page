/**
 * Created by asus on 2017/5/21.
 */
;(function ($) {
	var Tab = function (tab) {
		var _this_ = this;
		this.tab = tab; //保存单个tab组件
		this.index = 0;


		//默认配置参数
		this.config = {
			"triggerType": "mouseover", //鼠标触发类型
			"effect": "default", //内容切换效果
			"invoke": 1, //默认展示tab
			"auto": false //隔秒切换
		};


		//对配置参数进行扩展
		if(this.getConfig()) {
			$.extend(this.config, this.getConfig());
		}


		//绑定triggerType触发
		this.tabItems = this.tab.find('ul.tab-nav li');
		var config = this.config;

		if(config.triggerType === 'click') {
			this.tabItems.bind(config.triggerType, function () {
				_this_.invoke($(this));
		});

		} else if (config.triggerType === 'mouseover' || config.triggerType !== 'click') {
			this.tabItems.bind('mouseover', function () {
				_this_.invoke($(this));
			});
		}


		//自动轮播
		if (config.auto) {
			this.tmer = null;
			this.loop = 0;

			this.autoPlay();

			this.tab.hover(function () {
				window.clearInterval(_this_.timer);
			}, function () {
				_this_.autoPlay();
			})
		}


		//调用切换函数
		if( config.invoke > 1) {
			this.invoke(this.tabItems.eq(config.invoke - 1))
		}
	};



	Tab.prototype = {
		//获取人工配置参数
		getConfig: function (){
			var config = this.tab.attr("data-config");

			if (config && config !=='') {
				return $.parseJSON(config);
			} else {
				return null;
			}
		},


		//事件驱动函数
		invoke: function (currentTab) {
			var _this_ = this;
			this.index = currentTab.index();


			//tab选中状态
			currentTab.addClass('active').siblings().removeClass('active');


			//切换内容区域单次
			var effect = this.config.effect;
			var conItems = this.tab.find('div.content-wrap div.content-item');
			var imgs = conItems.find('img');

			if (effect === 'default' || effect!== 'fade') {
				conItems.eq(this.index).addClass('current').siblings().removeClass('current');
				conItems[this.index].style.height = imgs[this.index].height +'px';
			} else if(effect === 'fade') {
				conItems.eq(this.index).fadeIn().siblings().fadeOut();
				conItems[this.index].style.height = imgs[this.index].height +'px';
			}
		},


		//轮播函数
		autoPlay: function () {
			var _this_ = this,
				tabItems = this.tabItems,
				tabLen = tabItems.length,
				config = this.config;

			this.timer = window.setInterval(function () {
				_this_.index++;
				_this_.index = _this_.index >=tabLen ? 0 : _this_.index;

				tabItems.eq(_this_.index).trigger(config.triggerType)
			}, config.auto)
		}

	};


	/*//调用2
	Tab.init = function (tabs) {
		var _this_ = this;
		tabs.each(function () {
			new _this_($(this));
		});
	};*/

	//调用3 注册jQuery方法
	$.fn.extend({
		tab: function () {
			this.each(function () {
				new Tab($(this));
			});

			return this; //返回调用元素，可链式操作
		}
	});

	window.Tab = Tab;
})(jQuery);