/**
 * Created by asus on 2017/5/29.
 */

/*旋转角度是坐标的定位*/

var loopPlayerInit = (function () {
	var $butLeft = $('.butLeft'),
		$butRight= $('.butRight'),
		$butPlay = $('.butPlay'),
		$imgItem = $('.mainBox ul li'),
		origin = ['240px','600px'],
		imgAll = createImg([['img/1.jpg', 'img/2.jpg', 'img/3.jpg', 'img/4.jpg'],['img/5.jpg', 'img/6.jpg', 'img/7.jpg', 'img/8.jpg'], ['img/9.jpg', 'img/10.jpg', 'img/11.jpg', 'img/12.jpg']]),
		imgArrIndex = 0,
		imgAng = 45,
		imgTime = 300,
		rotating = false,
		timer = null;


	function  init() {
		configer();
		setEvent();
	}


	function configer() {
		var ang = 10,
			aint = -10;

		$imgItem.transform({origin:origin}); //设置每个li的旋转角度
		$imgItem.each(function (i) {
			var $this = $(this);
			$this.transform({rotate: aint + (i * ang) + 'deg'});
		});
	}


	function setEvent() {
		$butLeft.bind('click', function () {
			anigo(-1);
			return false;
		});
		$butRight.bind('click', function () {
			anigo(1);
			return false;
		});
		$butPlay.bind('click', function () {
			var $this = $(this);
			if ($this.text() === 'play') {
				autoPlay();
			}
			if ($this.text() === 'pause') {
				$this.text('play');
				autoStop();
			}
			return false;
		});
	}


	function anigo(d) {
		if (rotating) {return false};
		rotating = true;
		imgArrIndex++;
		imgArrIndex = imgArrIndex >= $imgItem.length -1 ? 0 : imgArrIndex;

		$imgItem.each(function (i) { //循环4个li
			var $thisItem = $(this);
			var $thisImg = $thisItem.children('img');  //第i个中的img
			var $targetImg = $(imgAll[imgArrIndex][i]); //imgAll[imgArrIndex]中第i个img
			var thisTime = (d === 1) ? imgTime * i : imgTime * ($imgItem.length - 1 - i);
			$thisItem.append($targetImg);
			//图片元素初始化定位
			$thisImg.transform({origin: origin});
			$targetImg.transform({origin: origin, rotate: (0 - d) * imgAng + 'deg'});

			setTimeout(function () {
				//旋转图像元素
				$thisImg.animate({rotate: imgAng * d + 'deg'});
				$targetImg.animate({rotate: 0}, 500, function () {
					$thisImg.remove();

					if (thisTime === (($imgItem.length - 1) * imgTime)) {
						rotating = false;
					}
				});
			}, thisTime);

		});
	}


	function autoPlay () {
		anigo(1);
		timer = setInterval(function () {
			anigo(1);
		},2000);
	};
	function autoStop() {
		clearInterval(timer);
	}


	function createImg(arr) {
		var imgArr = [];
		for (var i in arr) {
			imgArr[i] = [];
			for (var x in arr[i]) {
				imgArr[i][x] = new Image();
				imgArr[i][x].src = arr[i][x];
			}
		}
		return imgArr;
	}
	return init;
})();

loopPlayerInit();