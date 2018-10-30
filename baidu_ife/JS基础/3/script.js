(function() {
	var radioInSchool = document.getElementsByClassName('in-school')[0],
		radioOutSchool = document.getElementsByClassName('out-school')[0],
		divChooseSchool = document.getElementsByClassName('choose-school')[0],
		divInputWork = document.getElementsByClassName('input-work')[0];
    /*绑定radio click 切换div显示隐藏*/
    function checkHandler(e) {
        var radioValue = e.target.value;
        if (radioValue === 'inSchool') {
            divChooseSchool.classList.add('visible');
            divInputWork.classList.remove('visible');
        }
        if (radioValue === 'outSchool') {
            divChooseSchool.classList.remove('visible');
            divInputWork.classList.add('visible');
        }
    }

	radioInSchool.addEventListener('click', checkHandler, false);
    radioOutSchool.addEventListener('click', checkHandler, false);

    var data = [
        {
            "cityName": "北京",
            "schools": ["北京大学","北京大学法学院","北京大学图书馆"]
        },
        {
            "cityName": "天津",
            "schools": ["南开大学","天津大学","天津科技大学"]
        },
        {
            "cityName": "上海",
            "schools": ["上海大学","复旦大学"]
        }
    ];

    var schools = document.createElement('select');
    schools.className = 'school';
    var cities = document.createElement('select');
    cities.className = 'cities';
    document.getElementsByClassName('choose-school')[0].appendChild(cities);
    document.getElementsByClassName('choose-school')[0].appendChild(schools);
    /*初始化cities select*/
    function initCities() {
        var citiesHTML = '';
        for (var i = 0; i < data.length; i++) {
            citiesHTML += '<option>' + data[i].cityName + '</option>';
        }
        cities.innerHTML = citiesHTML;
        /*根据cities的value生成schools*/
        changeSchools();
    }
    function changeSchools() {
        var cityOptions = cities.getElementsByTagName('option');
        /*for (var i = 0; i < cityOptions.length; i++) {
            (function () {
                if (cityOptions[i].value === cities.value) {
                    var schoolsHTML = '';
                    var schoolsData = data[i].schools;
                    for (var j = 0; j < schoolsData.length; j++) {
                        schoolsHTML += '<option>' + schoolsData[j] + '</option>';
                    }

                    schools.innerHTML = schoolsHTML;
                }
            })(i);
        }*/
        /*for (var i = 0; i < cityOptions.length; i++) {
            cityOptions[i].index = i;
                if (cityOptions[i].value === cities.value) {
                    var schoolsHTML = '';
                    var schoolsData = data[i].schools;
                    for (var j = 0; j < schoolsData.length; j++) {
                        schoolsHTML += '<option>' + schoolsData[j] + '</option>';
                    }

                    schools.innerHTML = schoolsHTML;
                }
        }*/
        /*遍历options的value和cities的value比较，记录i，获取schoolData并生成*/
        var a;
        for (var i = 0; i < cityOptions.length; i++) {
            if (cityOptions[i].value === cities.value) {
            	/*break;*/
            	a = i;
            }
        }
        var schoolsHTML = '';
        var schoolsData = data[a].schools;
        for (var j = 0; j < schoolsData.length; j++) {
            schoolsHTML += '<option>' + schoolsData[j] + '</option>';
        }

        schools.innerHTML = schoolsHTML;
    }

    initCities();

    cities.addEventListener('change', function (e) {
        changeSchools(e.target.value);
    }, false);
})();