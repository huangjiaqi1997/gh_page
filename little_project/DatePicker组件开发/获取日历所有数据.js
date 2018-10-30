/**
 * Created by asus on 2017/5/22.
 */
(function () {
	var datepicker = {};

	//获取表格中所有数据，处理buildUi的参数
	datepicker.getMonthData = function (year, month) {
		var ret = [];


		if(!year || !month) { //获取年月
			var today = new Date();
			year      = today.getFullYear();
			month     = today.getMonth() + 1;
		}


		var firstDay        = new Date(year, month - 1, 1); //此月第一天
		var firstDayWeekDay = firstDay.getDay();
		if (firstDayWeekDay === 0) {firstDayWeekDay = 7;}

		year  = firstDay.getFullYear();
		month = firstDay.getMonth() + 1;

		var lastDayOfLastMonth  = new Date(year, month - 1, 0); //上月最后一天
		var lastDateOfLastMonth = lastDayOfLastMonth.getDate(); //保存

		var preMonthDayCount = firstDayWeekDay - 1; //显示上个月几天

		var lastDay  = new Date(year, month, 0);
		var lastDate = lastDay.getDate();


		//用i设置日月值
		for (var i = 0; i<7*5; i++) { //一个月可能有4，5，6周
			var date = i + 1 - preMonthDayCount; //日

			//默认
			var showDate  = date;
			var thisMonth = month;

			if (date <= 0) { //上月
				thisMonth = month - 1;
				showDate  = lastDateOfLastMonth + date;
			} else if (date > lastDate) { //下月
				thisMonth = month + 1;
				showDate  = showDate - lastDate;
			}

			if (thisMonth === 0)  {thisMonth = 12}
			if (thisMonth === 13) {thisMonth = 1}


			ret.push({
				month: thisMonth,
				date: date,
				showDate: showDate
			});

		}

		return {
			year:　year,
			month: month,
			days: ret
		};

	};

	window.datepicker = datepicker;
})();