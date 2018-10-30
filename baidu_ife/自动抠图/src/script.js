
;(function() {
  function Stage() {
    this.init();
  }

  Stage.prototype = {
    init: function() {
      this.cvs = document.querySelector('#my-canvas');
      this.ctx = this.cvs.getContext('2d');
      this.cvs.width=400; // html和js中的宽度好像不一样？
      this.cvs.height=400;
      // 上传图像handler
      this.upload();
      // 放大和缩小handler
this.drawToCanvas();
      this.scale();
      // 读取点击处rgba四色值handler
      this.getColor();
    },

    upload: function() {
      var _this = this;
      // input元素上传
      var input = document.querySelector('input[name="picture"]');
      input.onchange = function(e) {
        var file = this.files[0];
        if (!/image\/\w+/.test(file.type)) return false; // 在移动端由于浏览器对调用file类型处理不同，需要再次判断。
        var reader = new FileReader();
        reader.readAsDataURL(file); // 转化为base64数据类型
        reader.onload = function(e) {
          _this.drawToCanvas(this.result);
        }
      }
      // 拖拽上传
      this.cvs.ondragover = function () {return false;}; // stop FireFox from replacing the whole page with the file.
      this.cvs.ondrop = function (e) {
        e.stopPropagation();
        e.preventDefault();
        e = e || window.event;
        var files = e.dataTransfer.files;
        if(files){
          var reader = new FileReader();
          reader.readAsDataURL(files[0]);
          reader.onload = function(e) {
            _this.drawToCanvas(this.result);
          }
        }
      };
    },

    // 上传后调用drawImage()
    drawToCanvas: function(imgData) {
      var _this = this;
      this.img = new Image();
          this.img.src = './img/wolf.jpg';
          this.img.onload = function() {
            _this.imgW = _this.img.width;
            _this.imgH = _this.img.height;

            // 如果图片宽高大于400，缩小显示宽高，还要设置top和left值
            if (_this.imgW > 400 || _this.imgH > 400) {
              _this.scale = 1;
              _this.top = _this.left = 0;
              if (_this.imgW >= _this.imgH) {
                _this.scale = 400 / _this.imgW;
                _this.imgW = 400;
                _this.imgH *= _this.scale;
                _this.top = (400 - _this.imgH) / 2;
              } else {
                scale = 400 / _this.imgH;
                _this.imgH = 400;
                _this.imgW *= scale;
                _this.left = (400 - _this.imgW) / 2;                
              }
            }

            _this.ctx.drawImage(_this.img, _this.left, _this.top, _this.imgW, _this.imgH);
          }
    },

    scale: function() {
      var _this = this;
      function scrollFn(e) {
        var e = e || window.event;
        // 取得滚轮的滚动值
        var wheelRange =
          e.wheelDelta
          ? e.wheelDelta / 120
          : -(e.detail || 0) / 3;
        
        // 设置缩放和宽高
        _this.scale += wheelRange / 15;
        if (_this.scale <= 0.1) _this.scale = 0.1;
        if (_this.scale >= 50) _this.scale = 50;

        _this.imgW = _this.img.width * _this.scale; // this.width 动态的，当前的。
        _this.imgH = _this.img.height * _this.scale;
        _this.ctx.clearRect(0, 0, 400, 400)
        _this.ctx.drawImage(
          _this.img,
          (400 - _this.imgW) / 2,
          (400 - _this.imgH) / 2,
          _this.imgW,
          _this.imgH
        );
      }
      this.cvs.onmousewheel = scrollFn;
      this.cvs.addEventListener('DOMMouseScroll', scrollFn, false);
    },

    getColor: function() {
      var _this = this;
      this.cvs.onclick = function(e) {
        var e = e || window.event;
        var posX = e.pageX - _this.cvs.offsetLeft;
        var posY = e.pageY - _this.cvs.offsetTop;
        _this.ctx.getImageData(posX, posY, 1, 1);
      }
    }

  }

  new Stage();
})();