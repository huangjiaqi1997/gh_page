/**
 * Created by asus on 2017/5/22.
 */
(function () {
	var datepicker = window.datepicker; //引入对象
	var monthDate;//getMonthData函数所得的数据对象
	var wrapper;


	//构建html
	datepicker.buildUi = function (year, month) {
		monthDate  = datepicker.getMonthData(year, month);

		var html =
		    '<div class="ul-datepicker-header">'+
				'<a href="#" class="ul-datepicker-btn ul-datepicker-prev-btn">&lt</a>'+
				'<a href="#" class="ul-datepicker-btn ul-datepicker-next-btn">&gt</a>'+
				'<span class="ul-datepicker-curr-month">' + monthDate.year + '-' + monthDate.month + '</span>'+
			'</div>'+
			'<div class="ul-datepicker-body">'+
				'<table>'+
					'<thead>'+
						'<tr>'+
							'<th>一</th>'+
							'<th>二</th>'+
							'<th>三</th>'+
							'<th>四</th>'+
							'<th>五</th>'+
							'<th>六</th>'+
							'<th>七</th>'+
						'</tr>'+
					'</thead>'+
					'<tbody>';


		//设置html值
		for (var i = 0; i < monthDate.days.length; i++){
			var date = monthDate.days[i];

			if (i % 7 === 0) {html += '<tr>';}

			html += '<td data-date="' + date.date + '">' + date.showDate + '</td>';

			if (i % 7 === 6) {html += '</tr>';}
		}


		html += '</tbody>'+
			'</table>'+
		'</div>';

		return html;
	};


	datepicker.render = function (direction) {
		var year,month;
		if (monthDate) {
			year  = monthDate.year;
			month = monthDate.month;
		}


		if (direction === 'prev') {month--;}
		if (direction === 'next') {month++;}



		//创建wrapper并插入日历html
		var html = datepicker.buildUi(year, month);
		$wrapper = document.querySelector('.ul-datepicker-wrapper');
		if (!$wrapper) {
			$wrapper   = document.createElement('div');
			document.body.appendChild($wrapper);
			$wrapper.className = 'ul-datepicker-wrapper';
		}
		$wrapper.innerHTML = html;

	};



	//初始化函数
	datepicker.init = function ($input) {
		datepicker.render();

		//点击input，切换日历显隐
		var isOpen = false;

		$input.addEventListener('click', function () { //切换wrapper的class
			if (isOpen) {
				$wrapper.classList.remove('ul-datepicker-wrapper-show');
				isOpen = false;
			} else {
				$wrapper.classList.add('ul-datepicker-wrapper-show');
				isOpen = true;

				//设置显示位置
				var left = $input.offsetLeft;
				var top  = $input.offsetTop;
				var height = $input.offsetHeight;

				$wrapper.style.top  = top + height + 2 + 'px';
				$wrapper.style.left = left + 'px';
			}
		},false);


		//btn元素是动态创建的，当日历切换时，绑定失败
		$wrapper.addEventListener('click', function (e) {
			var $target = e.target;
			/*if (!$target.classList.contains('ul-datepicker-btn')) {break;}*/


			if($target.classList.contains('ul-datepicker-prev-btn')) {
				datepicker.render('prev');
			} else if ($target.classList.contains('ul-datepicker-next-btn')) {
				datepicker.render('next');
			}
		},false);



		//点击日期添加到输入框中
		$wrapper.addEventListener('click', function (e) {
			var $target = e.target;
			if ($target.tagName.toLowerCase() !== 'td') return;

			var date = new Date(monthDate.year, monthDate.month - 1, $target.dataset.date);

			$input.value = formal (date);
			$wrapper.classList.remove('ul-datepicker-wrapper-show'); //关闭
			isOpen = false;
		},false);
	};

	function formal(date) {
		var ret = '';

		var padding = function (num) {
			if (num <= 9) {
				return '0' + num;
			}
			return num;
		};

		ret += date.getFullYear() + '-';
		ret += padding(date.getMonth() + 1) + '-';
		ret += padding(date.getDate());

		return ret;

	}

})();