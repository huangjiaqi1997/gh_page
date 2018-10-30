/**
 * Created by asus on 2017/5/24.
 */
(function ($) {
	function PreLoad(imgSrcs, options) {

		this.imgSrcs = (typeof imgSrcs === 'string') ? [imgSrcs] : imgSrcs;
		this.options = $.extend({}, PreLoad.DEFAULTS, options);


		if (this.options.order === 'ordered') {
			this.ordered();
		} else {
			this.unordered();
		}
	}




	//设置默认options参数
	PreLoad.DEFAULTS = {
		order: 'unordered',
		each: null,
		all: null
	};




	//无序
	PreLoad.prototype.unordered = function () {
		var imgSrcs = this.imgSrcs,
			options = this.options,
			count = 0,
			len = imgSrcs.length;

		//each循环
		$.each(imgSrcs, function (i ,src) { //?
			if(typeof src !== 'string') return;

			var imgObj = new Image(); //@1创建对象////

			$(imgObj).on('load error', function () { //@2加载完毕或失败///
				options.each && options.each(count);
				if (count >= len - 1) {
					options.all && options.all();
				}

				count++;
			});

			imgObj.src = src; //@3加载/////
		});
	};




	//有序
	PreLoad.prototype.ordered = function () {
		var imgSrcs = this.imgSrcs,
			options = this.options,
			count = 0,
			len = imgSrcs.length;


		load();
		//load单次
		function load() {
			var imgObj = new Image();

			$(imgObj).on('load error', function () {
				options.each && options.each(count);
				if(count >= len) {
					options.all && options.all();
				}else {

					load();//回调
				}

				count++;
			});

			imgObj.src = img[count];
		}
	};





	//插件
	$.extend({
		preload: function (imgSrcs, options) {
			new PreLoad(imgSrcs, options);
		}
	});
})(jQuery);