/**
 * Created by asus on 2017/5/23.
 */
(function () {




	var datepicker = {};///////////////////////




	datepicker.getMonthData = function (year, month) {//通过年月获取数据对象////////
		var ret = [];


		if((!year && year !== 0) || (!month && month !==0)) { //若是空值，获取当前
			var today = new Date();
			year = today.getFullYear();
			month = today.getMonth() + 1;
		}


		var firstDay = new Date(year, month - 1, 1) //获取第一天，最后一天等
		//可能传入为2017，13 -> 2018，1，要重置年月
		year  = firstDay.getFullYear();
		month = firstDay.getMonth() + 1;

		var lastDay = new Date(year, month, 0); //日月年
		var lastDate = lastDay.getDate(); //日
		var firstDayWeekDay = firstDay.getDay();
		if (firstDayWeekDay === 0) {firstDayWeekDay = 7;}

		var lastDayOfLastMonth = new Date(year, month - 1, 0);
		var lastDateOfLastMonth = lastDayOfLastMonth.getDate();
		var preMonthDayCount = firstDayWeekDay - 1;


		for (var i = 0; i < 7 * 5; i++) { //循环得到日并修正，推入数组
			var date = i + 1 - preMonthDayCount;

			var showDate = date; //默认情况
			var thisMonth = month;

			if (date <= 0) {
				showDate = lastDateOfLastMonth + date;
				thisMonth = month - 1;
			} else if (date > lastDate) {
				showDate = date - lastDate;
				thisMonth = month + 1;
			}
			if (thisMonth === 0) {thisMonth = 12;}
			if (thisMonth === 13) {thisMonth =1;}

			ret.push ({
				month: thisMonth,
				date: date,
				showDate: showDate
			});
		}


		return {
			year: year,
			month: month,
			days: ret
		}
	};




	window.datepicker = datepicker;//闭包外可引用//////////////
})();