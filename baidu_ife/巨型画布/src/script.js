;(function() {
  function Stage() {
    this.preLoad();
  }

  Stage.prototype = {
    /*  预加载成功后，再操作*/
    preLoad: function() {
      var _this = this;
      var imgObj = new Image();
      imgObj.src = "./img/cat.jpeg"; 
      imgObj.onload = function(){
        // 储存图像的宽高
        _this.imgW = imgObj.width;
        _this.imgH = imgObj.height;
        _this.init();
      };
      imgObj.onerror = function(){
        window.alert('图片加载失败，请重试');
      };
    },
    init: function() {
      // 插入DOM
      var html = `<div id="container"><canvas id="my-canvas" width=${this.imgW}" height="${this.imgH}"></canvas><button class="change-btn">拖拽模式</button><div class="thumbnail"><div class="view"></div></div></div>`;
      document.body.innerHTML = html;
      this.container = document.getElementById('container');
      this.cvs = document.getElementById('my-canvas');
      if (!this.cvs.getContext) return;

      // 绘制大图，canvas宽高等于图像
      this.ctx = this.cvs.getContext('2d');
      this.img = document.createElement('img'); // 应该写html对于图片的路径，而不是js
      this.img.src = './img/cat.jpeg';
      this.ctx.drawImage(this.img, 0, 0);

      // 设置外层div
      this.container.style.width = '250px';
      this.container.style.height = '250px';
      this.container.style.overflow = 'hidden';
      this.container.style.position = 'relative';
      this.cvs.style.position = 'absolute';

      this.mouseDrag();
      this.btnChange();
      this.airscape();
    },
    /**
     * 按钮，单击切换绘图模式和拖拽模式
     */
    btnChange: function() {
      var _this = this;
      // 样式定位
      var changeBtn = document.getElementsByClassName('change-btn')[0];
      changeBtn.style.position = 'absolute';
      changeBtn.style.top = '0';
      changeBtn.style.right = '0';
      
      // onclick改变canvas的鼠标拖拽事件绑定。
      changeBtn.onclick = function() {
        changeBtn.classList.toggle('mouse-draw');
        _this.cvs.onmousedown = null;
        if (changeBtn.classList.contains('mouse-draw')) {
          changeBtn.innerText = '绘图模式';
          _this.mouseDraw();
        } else {
          changeBtn.innerText = '拖拽模式';
          // 把鼠标绘图后的图像储存
          // _this.imageData = _this.ctx.getImageData(_this.imgDraX, _this.imgDraY, _this.imgDraX + _this.imgW, _this.imgDraY + _this.imgH);
          _this.mouseDrag();
        }
      }
    },
    /**
     * 直接拖拽canvas元素。
     * canvas相对于父元素定位。
     */
    mouseDrag:  function() {
      var _this = this;
      var cvs = this.cvs;
      cvs.onmousedown = function(e) {
        var ctnerOL = _this.container.offsetLeft;
        var ctnerOT = _this.container.offsetTop;
        var cvsOLPage = cvs.offsetLeft + _this.container.offsetLeft;
        var cvsOTPage = cvs.offsetTop + _this.container.offsetTop;
 
        var difX = e.pageX - cvsOLPage; // 光标相对于canvas元素。
        var difY = e.pageY - cvsOTPage;

        cvs.onmousemove = function(e) {
          // _this.ctx.clearRect(0, 0, 250, 250);
          // _this.imageDrawFn(_this.img, movMouX - cvsOL - difX, movMouY - cvsOT - difY);
          cvs.style.left = e.pageX - difX - ctnerOL + 'px';
          cvs.style.top = e.pageY - difY - ctnerOT + 'px';

          // 定位缩略图视口
          var cvsOL = cvs.offsetLeft;
          var cvsOT = cvs.offsetTop;
          _this.view.style.left = - (cvsOL * _this.scale) + 'px';
          _this.view.style.top = - (cvsOT * _this.scale) + 'px';
        }
        document.onmouseup = function(e) {
          cvs.onmousemove = null;
        }
      }
    },
    /**
     * mousedown绘制一个点，mousemove绘制一条线。
     * 调用this.mouseDraw()
     */
    mouseDraw: function() {
      var _this = this;
      var cvs = this.cvs;
      cvs.onmousedown = function(e) {
        var cvsOLPage = cvs.offsetLeft + _this.container.offsetLeft;
        var cvsOTPage = cvs.offsetTop + _this.container.offsetTop;
        var difX = e.pageX - cvsOLPage;
        var difY = e.pageY - cvsOTPage;

        // 更改lineTo()的上一次的坐标
        _this.lastX = difX;
        _this.lastY = difY;

        // 画一个点
        _this.ctx.beginPath();
        _this.ctx.arc(difX, difY, 1, 0, 2*Math.PI, false);
        _this.ctx.fill();

        cvs.onmousemove = function(e) {
          _this.mouseDrawFn(e.pageX -cvsOLPage, e.pageY - cvsOTPage);
        };
        document.onmouseup = function(e) {
          cvs.onmousemove = null;
        };
      };
    },
    /**
     * 是一个绘制函数，可以绘制一轮图画。
     */
    // imageDrawFn: function(img, posX, posY) {
    //   this.imgDraX = posX;
    //   this.imgDraY = posY;
    //   // this.ctx.putImageData(this.imageData, posX, posY);
    //   this.ctx.drawImage(img, posX, posY);
    // },
    mouseDrawFn: function(posX, posY) {
      this.ctx.beginPath();
      this.ctx.lineTo(this.lastX, this.lastY);
      this.ctx.lineTo(posX, posY);
      this.ctx.stroke();
      // 储存当前的，下一轮使用。
      // mouseDown时要重设为鼠标点击时的坐标。
      this.lastX = posX;
      this.lastY = posY;
    },
    /**
     * 鸟瞰图
     */
    airscape: function() {
      var thumbnail = document.getElementsByClassName('thumbnail')[0];
      this.view = document.getElementsByClassName('view')[0];
      // 设置宽高、定位、背景图
      // 设置缩略图的宽高，以图片宽高中的最大值设置缩放比例
      if (this.imgW >= this.imgH) {
        thumbnail.style.width = '60px';
        this.scale = 60 / this.imgW;
        thumbnail.style.height = this.imgH * this.scale + 'px';
      } else {
        thumbnail.style.height = '60px';
        var scale = 60 / this.imgH;
        thumbnail.style.width = this.imgW * this.scale + 'px';
      }
      thumbnail.style.position = this.view.style.position = 'absolute';
      thumbnail.style.right = thumbnail.style.bottom = 0;
      thumbnail.style.backgroundImage = `url(${this.img.src})`;
      thumbnail.style.backgroundSize = 'contain';

      // 视口的定位
      this.view.style.border = '1px solid #fff';
      this.view.style.width = this.scale * 250 + 'px';
      this.view.style.height = this.scale * 250 + 'px';
      this.view.style.left = - (this.cvs.offsetLeft * this.scale) + 'px';
      this.view.style.top = - (this.cvs.offsetTop * this.scale) + 'px';
    }
  }
  var stage = new Stage();
  

  
})();





/**
 * 通过drawImage实现了拖动效果。
 * 实现了鼠标划线的效果。
 * 当鼠标绘画后，再次拖动时，绘画就会消失
 * 用getImageData保存图像数据（要将网页文件放到服务器中）
 * 用putImageData也可实现拖动效果
 * 但貌似用getImageData得到的数据只有canvas元素之中的画面，巨型画布的其他内容都被剪掉了。
 */
/**
 * 改变思路，直接拖拽camvas
 */
