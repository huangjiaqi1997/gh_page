/**
 * Created by asus on 2017/5/20.
 */
(function ($) {
	function PreLoad(imgs, options) { //图片数组 参数

	    //保存传递值
		this.imgs = (typeof imgs === 'string') ? [imgs] : imgs;
		this.opts = $.extend({},PreLoad.DEFAULTS,options); //传递的options与DEFAULTS融合

		if (this.opts.order === 'ordered') {
			this.ordered()
		} else {
			this.unordered();
		}
	}



	//设置默认参数
	PreLoad.DEFAULTS = {
		order: 'unordered', //默认无序
		each: null, //每张图加载完毕后执行
		all: null //所有图加载完毕后执行
	};


	PreLoad.prototype.ordered = function () { //有序
		var imgs = this.imgs,
			opts = this.opts,
			count = 0,
			len = imgs.length;

		load();
		//有序预加载
		function load() {
			var imgObj = new Image(); //

			$(imgObj).on('load error', function () { //
				opts.each && opts.each(count);

				if (count >= len) {
					//所有加载完毕
					opts.all && opts.all();
				} else {
					load(); //回调
				}

				count++;
			});

			imgObj.src = imgs[count]; //
		}

	};

	PreLoad.prototype.unordered = function () { //无序
		var imgs = this.imgs,
			opts = this.opts,
			count = 0,
			len = imgs.length;

		$.each(imgs, function (i, src) {
			if (typeof src !== 'string') return; //判断src

			var imgObj = new Image();

			$(imgObj).on('load error', function () {
				opts.each && opts.each(count);

				if (count >= len - 1) {
					opts.all && opts.all();
				}

				count++;
			});

			imgObj.src = src;
		});
	};

	//创建插件
	$.extend({
		preload: function (imgs, opts) {
			new PreLoad(imgs, opts);
		}
	});
})(jQuery);