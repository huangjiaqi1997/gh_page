(function() {
	var Pop = function(width, height, visible) {
		/*检测参数*/
		if (visible === false) return false;
		if (!width) width = 400;
		if (!height) height = 200;
		/*渲染DOM*/
		this.insertDOM(width, height);
		/*主要DOM*/
		this.openBtn = document.getElementById('on-btn');
		this.mask = document.getElementById('mask');
		this.maskWin = document.getElementsByClassName('mask-win')[0];
		this.maskWinHeader = this.maskWin.getElementsByTagName('h1')[0];
		this.closeBtn = this.maskWin.getElementsByClassName('off-btn')[0];
		/*开关的事件绑定*/
		var _this = this;
		this.openBtn.onclick = function() {
			_this.mask.classList.add('envisible');
			_this.maskWin.classList.add('envisible');
		}
		this.closeBtn.onclick = function() {
			_this.mask.classList.remove('envisible');
			_this.maskWin.classList.remove('envisible');
		}
		this.mask.onclick = function() {
			_this.mask.classList.remove('envisible');
			_this.maskWin.classList.remove('envisible');
		}
		/*拖拽*/
		this.drag();
		/*鼠标拉拽改变大小*/
		this.changeSizeByMouse();
	};

	Pop.prototype = {
		/*渲染遮罩mask，菜单maskWin，设置宽高并计算居中定位*/
		insertDOM: function(width, height) {
			this.mask = document.createElement('div');
			this.maskWin = document.createElement('div');
			this.mask.id = 'mask';
			this.maskWin.className = 'mask-win';
			var winHtml = '<h1>这是一个弹出层</h1><p>这是一个弹出层</p><div class="btn-c"><button class="off-btn">确定</button>';
			this.maskWin.innerHTML = winHtml;
			document.body.appendChild(this.mask);
			document.body.appendChild(this.maskWin);

			this.maskWin.style.width = width + 'px';
			this.maskWin.style.height = height + 'px';
			this.maskWin.style.left = (window.innerWidth - width)/2 + 'px';
			this.maskWin.style.top = (window.innerHeight - height)/2 + 'px';	
		},
		/*设置被拖动元素margin为负值时 下两写法有BUG*/
		/*
		mousemove和mouseup在mousedown中触发
		move和up由document触发，
		mouseup解除document的mousemove，mouseup事件
		*/
		/*drag: function() {
			var _this = this;
			this.maskWinHeader.onmousedown = function(e) {
				console.log('header mousedown')
				var diffX = e.clientX - _this.maskWin.offsetLeft;
				var diffY = e.clientY - _this.maskWin.offsetTop;
				document.onmousemove = function(e) {
					console.log('document mousemove')
					var body = document.body;
					var maxL = Math.max(body.clientWidth, body.scrollWidth) - _this.maskWin.offsetWidth;
					var maxT = Math.max(body.clientHeight, body.scrollHeight) - _this.maskWin.offsetHeight;
					var iL = e.clientX - diffX;
					var iT = e.clientY - diffY;
					iL < 0 && (iL = 0);
					iT < 0 && (iT = 0);
					iL > maxL && (iL = maxL);
					iL > maxT && (iT = maxT);
					_this.maskWin.style.left = iL + 'px';
					_this.maskWin.style.top = iT + 'px';
				}
				document.onmouseup = function() {
		            document.onmousemove = null;
		            document.onmouseup = null;
				}
			}
		},*/
		/*
		addEventListener可绑定多个事件
		e.clientX 鼠标点击的坐标
		offsetLeft 外边框距父元素内边框的距离
		offsetWidth 包括边框的宽度
		clientWidth 视口的宽度
		*/
		drag: function() {
		    var _this = this;
            var bDrag = false;
            var diffX = diffY = 0;
            this.maskWinHeader.addEventListener('mousedown', function (e) {
                var event = event || window.event;
                bDrag = true;
                diffX = e.clientX - _this.maskWin.offsetLeft;
                diffY = e.clientY - _this.maskWin.offsetTop;
            }, false);

            this.maskWinHeader.addEventListener('mousemove', function (e) {
                if (!bDrag) return;
                var event = event || window.event;
                var iL = e.clientX - diffX;
                var iT = e.clientY - diffY;
                var maxL = document.documentElement.clientWidth - _this.maskWin.offsetWidth;
                var maxT = document.documentElement.clientHeight - _this.maskWin.offsetHeight;
        
                iL = iL < 0 ? 0 : iL;
                iT = iT < 0 ? 0 : iT;
                iL = iL > maxL ? maxL : iL;
                iT = iT > maxT ? maxT : iT;

                _this.maskWin.style.left = iL + 'px';
                _this.maskWin.style.top = iT + 'px';
            }, false);

            document.onmouseup = window.onblur = this.maskWin.onlosecapture = function () {
                bDrag = false;
            };
        },
        /*
        mousedown：
		鼠标点击元素内部才能触发事件
		声明点击坐标、 元素的TRBL、根据TRBL的偏移范围
		根据鼠标是否在偏移范围内 触发mousemove
        */
        changeSizeByMouse: function() {
        	var _this = this;
        	this.maskWin.onmousedown = function(e) {
        		var downPosX = e.clientX;
        		var downPosY = e.clientY;
        		var sideL = this.offsetLeft;
        		var sideR = this.offsetLeft + this.clientWidth;
        		var sideB = this.offsetTop + this.clientHeight;
        		var rangeL = sideL + 8;
        		var rangeR = sideR - 8;
        		var rangeB = sideB - 8;
        		var isOnL = (downPosX < rangeL)
        		var isOnR = (downPosX > rangeR)
        		var isOnB = (downPosY > rangeB)
        		/*保存mousedown时元素的宽高，为定值*/
        		var downWidth = _this.maskWin.clientWidth
        		var downHeight = _this.maskWin.offsetLeft
        		/*
				此时鼠标坐标、down时鼠标坐标、down时宽高
				left top也有可能改变
        		*/
        		document.onmousemove = function(e) {
        			console.log(downPosY, rangeB, isOnB)
        			var movePosX = e.clientX;
        			var movePosY = e.clientY;
        			if (isOnL) {
        				console.log('isOnL')
        				_this.maskWin.style.width = downPosX - movePosX + downWidth + 'px';
        				_this.maskWin.style.left = movePosX - downPosX + downWidth + 'px';
        			} else if (isOnR) {
        				console.log('isOnR')
        				_this.maskWin.style.width = movePosX - downPosX + downWidth + 'px';
        			} else if (isOnB) {
        				console.log(downPosY,rangeB)
        				_this.maskWin.style.height = movePosY - downPosY + downHeight + 'px';
        			} else {
        				return;
        			}
        		}
        		document.addEventListener('mouseup', function () {
        			document.onmousemove = null;
        			document.onmouseup = null;
        		}, false);
        	}
        }
	}
	var Pop = new Pop();

})();