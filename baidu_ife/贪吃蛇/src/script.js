;(function() {
  function Snake() {
    this.options = {
      speed: 1000,
      initLen: 4,
    }

    this.init();
    this.intervalArr();
    this.bindKey();
    this.intervalSyle(this.div1, 0);
    this.intervalSyle(this.div2, 1);
  }


  Snake.prototype = {
    init: function() {
      this.div1 = document.querySelector('#head');
      this.div2 = document.querySelector('#div2');
      this.divW = 15.2;
      
      this.topArr = [0];
      this.leftArr = [0];
      this.kCode = 40;
    },

    intervalSyle: function(div, i) {
      var _this = this;
      setInterval(function() {
        if (_this.kCode === 38) {
          div.style.top = this.topArr[i]*_this.divW + 'px';
        } else if (_this.kCode === 37) {
          div.style.left = _this.leftArr[i]*_this.divW + 'px';
        } else if (_this.kCode === 40) {
          console.log(2)
          div.style.top = _this.topArr[i]*_this.divW + 'px';
        } else {
          div.style.left = _this.leftArr[i]*_this.divW + 'px';
        }
        i++;
      }, this.options.speed)
    },

    intervalArr: function() {
      var _this = this;
      var leftI = 0;
      var topI = 0;
      setInterval(function() {
        if (this.kCode === 37) {
          leftI -= 1;
          this.leftArr.push(leftI);
        } else if(this.kCode === 40) {
          topI += 1;
          this.topArr.push(topI)
        } else if (this.kCode === 38) {
          topI -= 1;
          this.topArr.push(topI)
        } else {
          leftI += 1;
          _this.leftArr.push(leftI);
        }
      }, 1000)
    },

    bindKey: function() {
      document.onkeydown = function(e) {
        this.kCode = e.keyCode;
      }
    }
  }

  new Snake()
})();


// 37 <-
// 38 ↑
// 39 ->
// 40 
