function Velocity(el, opts) {
  var _this = this;
  this.defaultOpts = {
    el: el,
    property: '',
    startTime: '',
    start: '',
    end: '',
    unit: '',
    duration: 1000,
    delay: 0,
    easing: function(p) {return p;},
    begin: function() {console.log('begin')},
    progress: function() {console.log('progress')},
    complete: function() {console.log('complete');}
  };
  this.opts = Object.assign({}, this.defaultOpts, opts);
  this.init();
}


 Velocity.prototype.init = function() {
  opts = this.opts;

  opts.startTime = Date.now() + opts.delay;
  // opts.el.css('transform','scale(1.3)')
  switch(opts.property) {
    // 多数值变化，无单位
    case 'backgroundColor': {
      opts.start = this.rgbValToArr(opts.el.css(opts.property));
      break;
    }

    // 单数值变化，无单位
    case 'opacity': {
      opts.start = parseInt(opts.el.css(opts.property));
      break;
    }

    case 'scale' : {
      opts.start = this.getTransfromVal().scale;
      break;
    }
      
    // 单数值变化，有单位
    default: {
      opts.start = parseInt(opts.el.css(opts.property));
      opts.unit = 'px';
    }
  }

  this.begin();
}


Velocity.prototype.begin = function() {
  var opts = this.opts;
  if (Date.now() < opts.startTime) {
    var _this = this
    window.requestAnimationFrame(function() {_this.begin();})
  } else {
    opts.begin && opts.begin();
    // if (opts.property === 'backgroundColor') return this.rgbProgress();
    this.progress();
  }
}


Velocity.prototype.progress = function() {
  var opts = this.opts;

  var p = Math.min((Date.now() - opts.startTime) / opts.duration, 1);

  if (p < 1) {
    this.OneFrameChange(p);
  }
  
  else {
    opts.el.css(opts.property, opts.end + opts.unit)
    opts.complete && opts.complete();
  }
}
Velocity.prototype.OneFrameChange = function(p) {
  var opts = this.opts
  switch (opts.property) {
    case 'left':
    case 'width':
      var {cssKey, cssValue} = this.singleChange(p);
      break;
    case 'backgroundColor':
      var {cssKey, cssValue} = this.mulityChange(p);
      break;
  }
  
  
  opts.el.css(cssKey, cssValue);
  
  opts.progress && opts.progress();

  this.RAF();
}
Velocity.prototype.singleChange = function(p) {
  var opts = this.opts;
  var delta = opts.end - opts.start;
  return{
    cssKey: opts.property,
    cssValue: parseInt(opts.start + delta * opts.easing(p)) + opts.unit
  } 
}

Velocity.prototype.mulityChange = function(p) {
  var opts = this.opts;
  var endArr = this.rgbValToArr(opts.end);
  var valArr = [];
  endArr.forEach((v,i)=> {
    var delta = v - opts.start[i];
    valArr.push(parseInt(opts.start[i] + delta * opts.easing(p))); 
  })
  return {
    cssKey: opts.property,
    cssValue: `rgb(${valArr[0]},${valArr[1]},${valArr[2]})`
  }
}









Velocity.prototype.rgbValToArr = function(rgbVal) {
  var rgbArr = rgbVal.split('(')[1].split(')')[0].split(',');
  return rgbArr.map(v => Number(v));
}
Velocity.prototype.getTransfromVal = function() {
  var opts = this.opts;
  var st = window.getComputedStyle(opts.el[0], null);
  var tr = st.getPropertyValue("-webkit-transform") ||
      st.getPropertyValue("-moz-transform") ||
      st.getPropertyValue("-ms-transform") ||
      st.getPropertyValue("-o-transform") ||
      st.getPropertyValue("transform") ||
      "FAIL";
  
  // With rotate(30deg)...
  // matrix(0.866025, 0.5, -0.5, 0.866025, 0px, 0px)
  console.log('Matrix: ' + tr);

  if (tr === 'none') return {scale: 1, angle: 0}
  
  // rotation matrix - http://en.wikipedia.org/wiki/Rotation_matrix
  
  var values = tr.split('(')[1].split(')')[0].split(',');
  var a = values[0];
  var b = values[1];
  var c = values[2];
  var d = values[3];
  
  var scale = Math.sqrt(a * a + b * b);
  
  console.log('Scale: ' + scale);
  
  // arc sin, convert from radians to degrees, round
  var sin = b / scale;
  // next line works for 30deg but not 130deg (returns 50);
  // var angle = Math.round(Math.asin(sin) * (180/Math.PI));
  var angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
  
  console.log('Rotate: ' + angle + 'deg');

  return {scale, angle};

}
Velocity.prototype.RAF = function() {
  var _this = this
  window.requestAnimationFrame(function() {_this.progress();})
}




$.fn.Velocity = function(...opts) {
  var _this = this;
  [...opts].forEach(opt => {
    new Velocity(_this, opt);
  })
  // return this;
}


var box = $('#box');
var returnV = box.Velocity({
  property: 'width',
  end: '600',
  duration: 500,
},{
  property: 'backgroundColor',
  end: 'rgb(42,67,250)',
  duration: 500,
  complete: function() {
    $('#box').Velocity({
      property: 'left',
      end: '600',
      duration: 500,
    })
  }
},)



