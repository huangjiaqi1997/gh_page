/**
 * Created by asus on 2017/5/27.
 */
(function (win, doc, $) {
	function CusScrollBar(options) {
		this._init(options);

	}


	$.extend(CusScrollBar.prototype, {

		_init: function (options) {
			var self = this;
			self.options = {
				scrollDir: "y",
				contSelector: "", //滚动条选择器
				barSelector: "", //滚动条选择器
				sliderSelector: "", //滚动块选择器
				wheelStep: 20, //滚轮步长
				tabItemSelector: ".tab-item", //标签选择器
				tabActiveClass: "tab-active", //选中标签类名
				anchorSelector: ".anchor", //锚点选择器
				correctSelector: ".correct-bot", //补全选择器
				articleSelector: ".scroll-ol" //文章选择器

			};
			$.extend(true, self.options, options || {});

			self._initDomEvent();

			return self;

		},

		/*初始化DOM引用*/
		_initDomEvent: function () {
			var opts = this.options;
			this.$cont = $(opts.contSelector);
			this.$slider = $(opts.sliderSelector);
			this.$bar = opts.barSelector ? $(opts.barSelector) : this.$slider.parent();////
			this.$tabItems = $(opts.tabItemSelector);
			this.$anchor = $(opts.anchorSelector);
			this.$article = $(opts.articleSelector);
			this.$correct = $(opts.correctSelector);
			this.$doc = $(doc);
			this._initSliderDragEvent()
				._bindContScroll()
				._bindMousewheel()
				._initTabEvent()
				._initArticleHeight();


		},

		/*补全最后段文档高度*/
		_initArticleHeight: function () {
			var self = this,
				lastArticle = self.$article.last();
			var lastArticleHeight = lastArticle.height(),
				contHeight = self.$cont.height();
			if (lastArticleHeight < contHeight) {
				self.$correct[0].style.height = contHeight - lastArticleHeight -self.$anchor.outerHeight() +'px';
			}
			return self;
		},

		/*滑块的mousedown、mousemove、mouseup事件，计算数据，触发scrollTo*/
		_initSliderDragEvent: function () {
			var self = this,
				slider = this.$slider,
				sliderEl = slider[0];

			if (sliderEl) {
				var doc = this.$doc,
					dragStartPagePosition, //定义移动的相关变量
					dragStartScrollPosition,
					dragContBarRate;

				function mousemoveHander(e) {
					e.preventDefault();
					console.log('move');
					if (dragStartPagePosition === null){
						return;
					}
					self.scrollTo(dragStartPagePosition + (e.pageY - dragStartPagePosition) * dragContBarRate); //触发scroll函数
				}

				slider.on('mousedown', function (e) {
					e.preventDefault();console.log('down');
					dragStartPagePosition = e.pageY;
					dragStartScrollPosition = self.$cont[0].scrollTop;
					dragContBarRate = self.getMaxScrollPosition()/self.getMaxSliderPosition();
					doc.on('mousemove.scroll', mousemoveHander).on('mouseup.scroll',function () {
						console.log('up');
						doc.off('.scroll');
					});

				});
			}
			return self;
		},

		//点击标签，获取index 1：改变标签className
		// 2：根据该项锚点位置，调用scrollTo，拉拽内容
		_initTabEvent: function () {
			var self = this;
			self.$tabItems.on('click', function (e) {
				e.preventDefault();
				var index = $(this).index();
				self.changeTabSelect(index);

				self.scrollTo(self.$cont[0].scrollTop + self.getAnchorPosition(index));
			});
			return self;
		},

		//锚点到上边界的像素数 相对于wrap div

		getAnchorPosition: function (index) {
			return this.$anchor.eq(index).position().top;
		},

		//获取每个锚点位置信息的数组 卷起高度+锚点到上边界距离
		getAllAnchorPosition: function () {
			var self = this,
				allPositionArr = [];
			for (var i = 0; i < self.$anchor.length; i++) {
				allPositionArr.push(self.$cont[0].scrollTop + self.getAnchorPosition(i));
			}
			return allPositionArr;
		},

		//改变标签className
		changeTabSelect: function (index) {
			var self = this,
				active = self.options.tabActiveClass;
			return self.$tabItems.eq(index).addClass(active).siblings().removeClass(active);
		},

		//内容滚动，触发scroll事件，调用getSliderPosition：计算滑块位置
		_bindContScroll: function () {
			var self = this;
			self.$cont.on('scroll', function () {
				var sliderEl = self.$slider && self.$slider[0];
				if (sliderEl) {
					sliderEl.style.top = self.getSliderPosition() +'px';
				}
			});
			return self;
		},

		//内容区鼠标滚轮事件，获取滚动数据*步长 -> 调用scrollTo
		_bindMousewheel: function () {
			var self = this;
			self.$cont.on('mousewheel DOMMouseScroll', function (e) {
				e.preventDefault();
				var oEv = e.originalEvent, //JQ获取原生事件对象
					wheelRange = oEv.wheelDelta ? -oEv.wheelDelta / 120 : (oEv.detail || 0) / 3;

				self.scrollTo(self.$cont[0].scrollTop + wheelRange * self.options.wheelStep);
			});
			return self;
		},
		//计算滑块当前位置
		getSliderPosition: function () {
			var self = this,
				maxSliderPosition = self.getMaxSliderPosition();
			return Math.min(maxSliderPosition, maxSliderPosition * self.$cont[0].scrollTop / self.getMaxScrollPosition());
		},

		//内容可滚动高度
		getMaxScrollPosition: function () {
			var self = this; //$cont.height: 可视区高度
			return Math.max(self.$cont.height(), self.$cont[0].scrollHeight) - self.$cont.height();
		},
		//滑块可移动距离
		getMaxSliderPosition: function () {
			var self = this;
			return self.$bar.height() - self.$slider.height();
		},

		//根据scrollTop函数设让内容滚动
		//positionVal:卷起的长度
		scrollTo: function (positionVal) {
			var self = this;
			var posArr = self.getAllAnchorPosition();
			//遍历数组中锚点距离 和 scrollTo移动距离比较
			function getIndex(positionVal) {
				for (var i = posArr.length - 1; i >= 0; i--) { //大->小
					if (positionVal >= posArr[i]) { //作图观察
						return i;
					} else {
						continue;
					}
				}
			}
			if (posArr.length === self.$tabItems.length) {
				self.changeTabSelect(getIndex(positionVal));
			}
			self.$cont.scrollTop(positionVal);
		}
	});

	win.CusScrollBar = CusScrollBar;
})(window, document, jQuery);


new CusScrollBar({
	contSelector: ".scroll-cont",
	barSelector: ".scroll-bar",
	sliderSelector: ".scroll-slider"
});