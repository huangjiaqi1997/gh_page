$(function() {
	function ItemCould(options) {
		this.DEFAULTS = {
			costomItems: [
				{
					id: '1',
					text: 'React',
					color: '#0095f0',
					size: '14px'
				},
				{
					id: '2',
					text: 'Redux',
					color: '#ccc',
				},
				{
					id: '3',
					text: 'JS',
					color: '#fff700',
					size: '17px'
				},
				{
					id: '4',
					text: 'Vue',
					color: 'rgb(0, 255, 238)',
					size: '15px'
				},
				{
					id: '5',
					text: 'Nodejs',
					size: '15px'
				}
			],
			color: '#00ff1f',
			rad: 100,
			size: '10px',
			items: [
				'dispatch',
				'component',
				'state',
				'super',
				'store',
				'reducer',
				'action',
				'connect',
				'constructor',
				'mapStateToProps',
				'middleware',
				'createStore',
				'actionTypes',
				'promise',
				'fetch',
				'props',
				'className',
				'bind',
				'provider',
			]
		}
		this.options = $.extend({}, this.DEFAULTS, options);

		this.init();
	}

	ItemCould.prototype = {
		init: function () {
			var _this =this;

			this.render();
			this.rad = this.options.rad; // 半径
			this.dia = this.rad * 2;  // 直径
			this.$items = $('#container span');
			this.halfIH = this.$items.height() / 2; // item高度一半

			// 储存所有item的最大横向值、速度、宽度一半、前部中心处透明度
			this.maxAArr = [];
			this.speedArr = [];
			this.halfIWArr = [];
			this.midOpArr = [];

			this.$items.each(function(i, item) {
				// 遍历之后变为纯 DOM 了
				_this.setPos(item);

				_this.setOpacity(item);

				var speed = 1000 + Math.random() * 2000
				_this.speedArr.push(speed);
				_this.setAnimate(i, item);

				_this.hoverHandler(item);
			})
		},

		/**
		 * 渲染items元素插入到Html中
		 * 获取到容器div、item的DOM
		 */
		render: function() {
			var $costomItems = $(this.options.costomItems);

			// 拼接字符串
			var html = '<div id="container">';
			$(this.options.items).each(function(i, item) {
				html += '<span>' + item + '</span>';
			});

			$costomItems.each(function(i, item) {
				html += `<span id="costom-${item.id}">${item.text}</span>`;
			});
			html += '</div>';
			document.body.innerHTML = html;

			// 设置参数样式
			$('#container').css({color: this.options.color, fontSize: this.options.size});
			$costomItems.each(function(i, item) {
				$(`#costom-${item.id}`).css({color: item.color, fontSize: item.size})
			});
		},

		/**
		 * 随机定位item，在圆形区域内
		 * 先按质点计算
		 * 以空div的（0,0）为参照的父元素
		 * 最后减去span本身偏移量，再将div偏移。
		 */
		setPos: function(item) {
			//top
			this.rB = (Math.random() - 0.5) * this.dia;
		
			// left
			var rad = this.rad;
			var maxA = Math.sqrt(rad*rad-this.rB*this.rB) * 2;
			var halfIW =  $(item).width() / 2;
			this.rA = (Math.random()-0.5) * maxA;
			
			this.maxAArr.push(maxA);
			this.halfIWArr.push(halfIW)
			
			
			// 样式
			$(item).css({
				'top': (this.rB - this.halfIH) + 'px',
				'left': (this.rA - halfIW) + 'px'
			})
			
			$('#container').css({'top': '150px','left': '150px'})
		},

		/**
		 * 通过(0, 0)偏移的rA，rB（初始的随机定位）计算item的初始透明度
		 */
		setOpacity: function(item) {
			var rA = this.rA;
			var rB = this.rB;
			var rad = this.rad;


			// 边框处opacity都为0.5，只有中心点为1。 当前正面的透明度应为 0.5 + 0.5*比例
			var opacityPer = (rA*rA+rB*rB) / (rad*rad);
			// 计算中线处的透明度(前部)
			var midOpacity = (1-(rB / rad))*0.5 + 0.5;
			this.midOpArr.push(midOpacity);

			var isFront = Math.random() > 0.5;
			if (isFront) {
				// 正面
				$(item).css('opacity',0.5 + ((1 - opacityPer)*0.5))
			} else {
				// 反面，0.1 到 0.5 
				$(item).css('opacity', 0.1 + (opacityPer)*0.4)
			}
		},

		/**
		 * 设置动画列队
		 * 通过当前透明度判断前后，通过当前left判断左右，来设定运动列队
		 */
		setAnimate: function(i, item) {
			var maxA = this.maxAArr[i];
			var speed = this.speedArr[i];
			var halfIW = this.halfIWArr[i];
			var midOpacity = this.midOpArr[i];

			// 当前透明度和left
			var opacity = $(item).css('opacity');
			var isFront = opacity >= 0.5;
			var oL = parseFloat($(item).css('left')) + halfIW; // css()返回值含有单位
			
			var maxR =  maxA / 2 - halfIW + 'px';
			var maxL = -(maxA / 2 + halfIW) + 'px';
			var mid = -halfIW;


			/* 根据透明度和left判断位置，动画分四段 */
			// 起始的第一段动画
			var css, timeFn;
			if (isFront && oL >= 0) {css = {left: maxR, opacity: 0.5}, timeFn="easeOutQuad"}
			else if (isFront && oL < 0) {css = {left: mid, opacity: midOpacity}, timeFn="easeInQuad"}
			else if (!isFront && oL > 0) {css = {left: mid, opacity: 0.1}, timeFn="easeInQuad"}
			else {css = {left: maxL, opacity: 0.5}, timeFn="easeOutQuad"}

			$(item).animate(css, speed, timeFn, rowBack);
			

			// 回调，实现动画的循环
			function rowBack() {
				if (css.left == maxR) {css.left = mid; css.opacity = 0.1; timeFn="easeInQuad"}
				else if (css.left == mid && css.opacity == 0.1)	{css.left = maxL; css.opacity = 0.5; timeFn="easeOutQuad"}
				else if (css.left == maxL)	{css.left = mid; css.opacity = midOpacity; timeFn="easeInQuad"}
				else {css.left = maxR; css.opacity = 0.5; timeFn="easeOutQuad"}

				$(item).animate(css, speed, timeFn, rowBack);
			}
		},

		hoverHandler: function(item) {
			var _this = this;
			var opacity;
			$(item).hover(
				function() {
					_this.$items.each(function(i, _item) {
						$(_item).stop();
					})
					opacity = $(this).css('opacity');
					$(this).css('opacity', 1);
				},
				function() {
					$(this).css('opacity', opacity);
					_this.$items.each(function(i, _item) {
						_this.setAnimate(i, _item);
					})
				}
			)
		}
	}

	//创建插件
	$.extend({
		itemCould: function (opts) {
			new ItemCould(opts);
		}
	});

	$.itemCould();
})