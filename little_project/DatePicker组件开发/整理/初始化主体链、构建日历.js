/**
 * Created by asus on 2017/5/23.
 */
(function () {
	var datepicker = window.datepicker;
	var drapper;
	var monthData;




	datepicker.buildUi = function (year, month) { //调用getMonthData函数，构建日历html节点////////////////
		monthData = datepicker.getMonthData(year, month); //@3


		var html =
			'<div class="ui-datepicker-header">' +
			'<a href="#" class="ui-datepicker-btn ui-datepicker-prev-btn">&lt</a>' +
			'<a href="#" class="ui-datepicker-btn ui-datepicker-next-btn">&gt</a>' +
			'<span class="ui-datepicker-curr-month">' + monthData.year + '-' + monthData.month + '</span>' +
			'</div>' +
			'<div class="ui-datepicker-body">' +
			'<table>' +
			'<thead>' +
			'<tr>' +
			'<th>一</th>' +
			'<th>二</th>' +
			'<th>三</th>' +
			'<th>四</th>' +
			'<th>五</th>' +
			'<th>六</th>' +
			'<th>七</th>' +
			'</tr>' +
			'</thead>' +
			'<tbody>';

		for (var i = 0; i < monthData.days.length; i++) {
			var date = monthData.days[i];

			if (i % 7 === 0) {html += '<tr>';}
			html += '<td data-date="' + date.date + '">' + date.showDate + '</td>';
			if (i % 7 ===6 ) {html += '</tr>'}
		}

		html += '</tbody>' +
				'</table>' +
				'</div>';
		return html;
	};




	datepicker.render = function (direction) { //调用buildUi函数，将html节点插入网页/////////////
			var year, month;
			if (monthData) { //获取上一次的年月
				year = monthData.year;
				month = monthData.month;
			}
			if (direction === 'prev') {month--;}
			if (direction === 'next') {month++;}


			//把html节点插入网页
			var html = datepicker.buildUi(year, month);//@2

		    $wrapper = document.querySelector('.ui-datepicker-wrapper');
			if (!$wrapper) { //若没创建
				$wrapper = document.createElement('div');
				document.body.appendChild($wrapper);
				$wrapper.className = 'ui-datepicker-wrapper';
			}
			$wrapper.innerHTML = html;
	};




	datepicker.init = function ($input) { //初始化主体链函数///////////////////
		datepicker.render();// @1



		var isOpen = false;
		$input.addEventListener('click', function () { //点击input，切换日历显隐////
			if (isOpen) {
				$wrapper.classList.remove('ui-datepicker-wrapper-show');
				isOpen = false;
			} else {
				$wrapper.classList.add('ui-datepicker-wrapper-show');
				isOpen = true;
			}

			var left = $input.offsetLeft;
			var top = $input.offsetTop;
			var height = $input.offsetHeight;
			$wrapper.style.top = top + height + 2 + 'px';
			$wrapper.style.left = left + 'px';
		}, false);



		//btn元素时动态创建的，当月份切换时，绑定失败
		$wrapper.addEventListener('click', function (e) { //点击btn，调用render函数，传递切换月份的参数////////
			var $target = e.target;
			if (!$target.classList.contains('ui-datepicker-btn')) {return;}//偏差

			if($target.classList.contains('ui-datepicker-prev-btn')) {
				datepicker.render('prev');//
				} else if ($target.classList.contains('ui-datepicker-next-btn')) {
				datepicker.render('next');//
			}
		}, false);



		$wrapper.addEventListener('click', function (e) { //点击日期，添加到input中///////
			var $target = e.target;
			if ($target.tagName.toLowerCase() !== 'td') {return;} //偏差

			var day = new Date(monthData.year, monthData.month - 1, $target.dataset.date); //创建日期：当月的month，-2日
			$input.value = formal(day);
			$wrapper.classList.remove('ui-datepicker-wrapper-show');
			isOpen = false;
		}, false);
	};



	function formal(day) {
		var ret = '';

		var padding = function (num) {
			if (num <= 9) {
				return '0' + num;
			}
			return num;
		};

		ret +=day.getFullYear() + '-';
		ret +=padding(day.getMonth() + 1) + '-';
		ret +=padding(day.getDate());

		return ret;
	}
})();