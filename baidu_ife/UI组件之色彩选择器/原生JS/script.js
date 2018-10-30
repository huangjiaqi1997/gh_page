(function() {
	/*
	HSL、RGB、HEX： 颜色值
	HSLValue: [0, 0, 0]
	RGBInputValue： input值
	pos： select的定位
	*/
	function ColorPicker(value) {
		if ($.type(value) !== 'string') return false;
		if (!value) {
			this.value = 'HSL(0, 0, 1)';
		}
		
		var _this = this
		this.value = value;
		this.$hue_select = $('.hue-selection');
		this.$light_select = $('.light-selection');
		this.$hue = $('.hue-color');
		this.$light = $('.light-color');
		this.$R_input = $('.R-input');
		this.$G_input = $('.G-input');
		this.$B_input = $('.B-input');
		this.$H_input = $('.H-input');
		this.$S_input = $('.S-input');
		this.$L_input = $('.L-input');
		this.$HEX_input = $('.HEX-input');
		this.$up_btn = $('.icon-up');
		this.$down_btn = $('.icon-down');

		this.hueHeight = this.$hue.height();
		this.hueTop = this.$hue.offset().top;
		this.halfSelectHeight = this.$hue_select.height()/2;


		this.init();
		$('.color-value').on('change', 'input', function(e) {
			e.preventDefault();
			if ($(e.target).hasClass('RGB')) {
				var RGBArr = [];
				RGBArr.push(_this.$R_input.val(),_this.$G_input.val(),_this.$B_input.val());
				_this.changeHSLInputValue(_this.RGBToHSL(RGBArr));
				_this.changeHEXInputValue(_this.RGBToHEX(RGBArr));
				_this.HSLToHuePos(_this.RGBToHSL(RGBArr));
				_this.changeLColor(RGBArr);
				_this.HSLToLigPos(_this.RGBToHSL(RGBArr));

			}
			if ($(e.target).hasClass('HSL')) {
				var HSLArr = [];
				HSLArr.push(_this.$H_input.val(),_this.$S_input.val(),_this.$L_input.val());
				_this.changeRGBInputValue(_this.HSLToRGB(HSLArr));
				_this.changeHEXInputValue(_this.HSLToHEX(HSLArr));
				_this.HSLToHuePos(HSLArr);
				_this.HSLToLigPos(HSLArr);
			}
		});

		
		this.$hue_select.mousedown(function(e) {
			var __this = $(this);
			var posY = e.pageY;
			var selectOffY = $(this).offset().top;
			var diffY = posY - selectOffY;
			var selectPosY = $(this).position().top;

			var H = (selectPosY/_this.hueHeight).toFixed(2);
			var HSLArr = [H, 1, 0.5]
			_this.changeRGBInputValue(_this.HSLToRGB(HSLArr));
			_this.changeHSLInputValue(HSLArr);
			_this.changeHEXInputValue(_this.HSLToHEX(HSLArr));
			$(document).mousemove(function(e) {
				_this.$hue_select.css('top', e.pageY - diffY - _this.hueTop);
				selectPosY = __this.position().top;
				H = ((selectPosY + _this.halfSelectHeight) /_this.hueHeight).toFixed(2);
				HSLArr = [H, 1, 0.5]
				_this.changeRGBInputValue(_this.HSLToRGB(HSLArr));
				_this.changeHSLInputValue(HSLArr);
				_this.changeHEXInputValue(_this.HSLToHEX(HSLArr));
			});
			$(document).mouseup(function() {
				$(document).off();
			});
		});

		this.$light.mousedown(function(e) {
			var posX = e.pageX;
			var posY = e.pageY;
			_this.$light_select.css('top', posX - _this.halfSelectHeight + 'px');
			_this.$light_select.css('left', posX - _this.halfSelectHeight + 'px')
			var selectX = _this.$light_select.position().left;
			var selectY = _this.$light_select.position().top;
			var biasLen = (selectY * 1.414) + (selectX - selectY) / 1.414;
			var L = (biasLen / _this.hueHeight * 1.414).toFixed(2);
			var HSLArr = [_this.$H_input.val(), 1, L];
			_this.changeRGBInputValue(_this.HSLToRGB(HSLArr));
			_this.changeHSLInputValue(HSLArr);
			_this.changeHEXInputValue(_this.HSLToHEX(HSLArr));
			_this.HSLToHuePos(HSLArr);

			$(document).mousemove(function(e) {
				_this.$light_select.css('top', posX - _this.halfSelectHeight + 'px');
			_this.$light_select.css('left', posX - _this.halfSelectHeight + 'px')
				selectX = _this.$light_select.position().left;
				selectY = _this.$light_select.position().top;
				biasLen = (selectY * 1.414) + (selectX - selectY) / 1.414;
				HSLArr = [_this.$H_input.val(), 1, L];
				_this.changeRGBInputValue(_this.HSLToRGB(HSLArr));
				_this.changeHSLInputValue(HSLArr);
				_this.changeHEXInputValue(_this.HSLToHEX(HSLArr));
				_this.HSLToHuePos(HSLArr);
			});
			$(document).mouseup(function(e) {
				$(document).off();
			});
		});

	}
	
	ColorPicker.prototype = {
		init: function() {
			if (/RGB/.test(this.value)) {
				var RGBArr = this.value.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
				this.changeRGBInputValue(RGBArr);
				this.changeHSLInputValue(this.RGBToHSL(RGBArr));
				this.changeHEXInputValue(this.RGBToHEX(RGBArr));
				this.HSLToHuePos(this.RGBToHSL(RGBArr));
				this.changeLColor(RGBArr);
			}
		},
		changeRGBInputValue: function(RGBArr) {
			this.$R_input.val(RGBArr[0])
			this.$G_input.val(RGBArr[1])
			this.$B_input.val(RGBArr[2])
		},
		changeHSLInputValue: function(HSLArr) {
			this.$H_input.val(HSLArr[0])
			this.$S_input.val(HSLArr[1])
			this.$L_input.val(HSLArr[2])
		},
		changeHEXInputValue: function(HEXStr) {
			this.$HEX_input.val(HEXStr)
		},
		/* HSL颜色值定位hue */
		HSLToHuePos: function(HSLArr) {
			var top = HSLArr[0] * this.hueHeight + this.hueTop;
			this.$hue_select.css('top', top - this.halfSelectHeight + 'px');
		},
		changeLColor: function(RGBArr) {
			var RGBStr = 'rgb(' + RGBArr.join(',') + ')';
			console.log('background: linear-gradient(to right bottom, rgb(255,255,255),' + RGBStr + ',rgb(0,0,0))')
			this.$light.css('background', 'linear-gradient(to bottom right, rgb(255,255,255),' + RGBStr + ',rgb(0,0,0))');
		},
		HSLToLigPos: function(HSLArr) {
			var selectX = HSLArr[2] / 1.414;
			this.$light_select.css('top', selectX + 'px');
			this.$light_select.css('left', selectX + 'px');
		},


		HSLToRGB: function(HSLArr) {
			var r, g, b;
			var h = HSLArr[0],
				s = HSLArr[1],
				l = HSLArr[2];
    		if(s == 0) {
        		r = g = b = l; // achromatic
    		} else {
        		var hue2rgb = function hue2rgb(p, q, t) {
	            if(t < 0) t += 1;
	            if(t > 1) t -= 1;
	            if(t < 1/6) return p + (q - p) * 6 * t;
	            if(t < 1/2) return q;
	            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
	            return p;
        	}
		    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
		    var p = 2 * l - q;
		    r = hue2rgb(p, q, h + 1/3);
		    g = hue2rgb(p, q, h);
		    b = hue2rgb(p, q, h - 1/3);
    	}
    	return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
		},
		HSLToHEX: function(HSLArr) {
			return this.RGBToHEX(this.HSLToRGB(HSLArr));
		},
		RGBToHSL: function(RGBArr) {
		    r = RGBArr[0] / 255, g =  RGBArr[1] / 255, b =  RGBArr[2] / 255;
		    var max = Math.max(r, g, b), min = Math.min(r, g, b);
		    var h, s, l = (max + min) / 2;
		    if (max == min){ 
		        h = s = 0; // achromatic
		    } else {
		        var d = max - min;
		        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
		        switch(max) {
		            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
		            case g: h = (b - r) / d + 2; break;
		            case b: h = (r - g) / d + 4; break;
		        }
		        h /= 6;
		    }

		    return [h.toFixed(2), s.toFixed(2), l.toFixed(2)];
		},
		RGBToHEX: function(RGBArr) {
			// var that = this;
    		//十六进制颜色值的正则表达式
		    // var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
		    // 如果是rgb颜色表示
		    // if (/^(rgb|RGB)/.test(that)) {
		    //     var aColor = that.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
		        var strHex = "#";
			        for (var i=0; i<RGBArr.length; i++) {
			            var hex = Number(RGBArr[i]).toString(16);
			            if (hex === "0") {
			                hex += hex;    
			            }
			            strHex += hex;
			        }
			        /*if (strHex.length !== 7) {
			            strHex = that;    
			        }*/
			    return strHex;
	    	// } else if (reg.test(that)) {
		    //     var aNum = that.replace(/#/,"").split("");
		    //     if (aNum.length === 6) {
		    //         return that;    
		    //     } else if(aNum.length === 3) {
		    //         var numHex = "#";
		    //         for (var i=0; i<aNum.length; i+=1) {
		    //             numHex += (aNum[i] + aNum[i]);
		    //         }
		    //         return numHex;
		    //     }
		    // }
		    // return that;
		},
	 	HEXToHSL: function(HEXStr) {
	 		return this.HSLToRGB(this.HEXToRGB(HEXStr));
	 	},
		HEXToRGB: function(HEXStr) {
		    var sColor = HEXStr.toLowerCase();
		    //十六进制颜色值的正则表达式
		    var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
		    // 如果是16进制颜色
		    if (sColor && reg.test(sColor)) {
		        if (sColor.length === 4) {
		            var sColorNew = "#";
		            for (var i=1; i<4; i+=1) {
		                sColorNew += sColor.slice(i, i+1).concat(sColor.slice(i, i+1));    
		            }
		            sColor = sColorNew;
		        }
		        //处理六位的颜色值
		        var sColorChange = [];
		        for (var i=1; i<7; i+=2) {
		            sColorChange.push(parseInt("0x"+sColor.slice(i, i+2)));    
		        }
		        return sColorChange;
		    }
		}
	}
	var colorPicker = new ColorPicker('RGB(133,20,30)');
})();