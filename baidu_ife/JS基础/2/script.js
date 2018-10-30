(function() {
	var form = document.forms[0];
	function eventHandler(type) {
		form.addEventListener(type, function(e) {
			var target = e.target;
			var inputId = target.id;
			if (inputId === 'inputName' ||
							'inputPassword' ||
							'inputPasswordAgain' ||
							'inputEmail' ||
							'inputCel') {
				checkHandler(e.type, target, inputId)
			}
		}, true);
	}

	eventHandler('focus');
	eventHandler('blur');
	eventHandler('keyup');

	function checkHandler(type, ele, inputId) {
		switch(type) {
			case 'focus':
				focusCheck(ele, inputId);
				break;
			case 'blur':
				blurCheck(ele, inputId);
				break;
			case 'keyup':
				keyupCheck(ele, inputId);
				break;
		}
	}

	function focusCheck(ele, inputId) {
		if (ele.value === '') {
			ele.className = 'focus-empty';
			var namePoint = ele.nextElementSibling;
			namePoint.className = 'focus-empty';
			switch(inputId) {
				case 'inputName':
					namePoint.innerHTML = '4-16个字符';
					break;
				case 'inputPassword':
					namePoint.innerHTML = '6-18位字符';
					break;
				case 'inputPasswordAgain':
					namePoint.innerHTML = '';
					break;
				case 'inputEmail':
					namePoint.innerHTML = '邮箱链接';
					break;
				case 'inputCel':
					namePoint.innerHTML = '8-13位数字';
					break;
				default:
					return;
			}
		}
	}

	function blurCheck(ele, inputId) {
		if (ele.value === '') {
			ele.className = 'warning';
			var namePoint = ele.nextElementSibling;
			namePoint.className = 'warning';
			switch(inputId) {
				case 'inputName':
					namePoint.innerHTML = '姓名不能为空';
					break;
				case 'inputPassword':
					namePoint.innerHTML = '密码不能为空';
					break;
				case 'inputPasswordAgain':
					namePoint.innerHTML = '请再次输入密码';
					break;
				case 'inputEmail':
					namePoint.innerHTML = '邮箱不能为空';
					break;
				case 'inputCel':
					namePoint.innerHTML = '手机号码不能为空';
					break;
				default:
					return;
			}
		}
	}

	function keyupCheck(ele, inputId) {
		switch(inputId) {
			case 'inputName': 
				nameKeyupCheck(ele);
				break;
			case 'inputPassword':
				passwordKeyupCheck(ele);
				break;
			case 'inputPasswordAgain':
				passwordAgainKeyupCheck(ele);
				break;
			case 'inputEmail':
				emailKeyupCheck(ele);
				break;
			case 'inputCel':
				celKeyupCheck(ele);
				break;
			default:
				return;
		}
	}

	function nameKeyupCheck(ele) {
		var value = ele.value;
		var value = value.replace(/[^\x00-\xff]/g, '**');
		var namePoint = ele.parentNode.lastElementChild;
		var pattern = /^[a-zA-Z0-9-_*]{4,16}$/;
		if (pattern.test(value)) {
			namePoint.innerHTML = '名称格式正确'
			ele.className = namePoint.className = 'success';
		} else if(!pattern.test(value) && value.length != 0) {
			namePoint.innerHTML = '名称格式错误'
			ele.className = namePoint.className = 'wrong';
		} else if (value === '') {
			namePoint.innerHTML = '姓名不能为空'
			ele.className = namePoint.className = 'warning';
		} else {
			return;
		}
	}
	function passwordKeyupCheck(ele) {
		var value = ele.value;
		var namePoint = ele.parentNode.lastElementChild;
		var pattern = /^[a-zA-Z0-9-_]{8,16}$/;
		if (pattern.test(value)) {
			namePoint.innerHTML = '密码格式正确'
			ele.className = namePoint.className = 'success';
		} else if(!pattern.test(value) && value !== '') {
			namePoint.innerHTML = '密码格式错误'
			ele.className = namePoint.className = 'wrong';
		} else if (value === '') {
			namePoint.innerHTML = '密码不能为空'
			ele.className = namePoint.className = 'warning';
		} else {
			return;
		}
	}
	function passwordAgainKeyupCheck(ele) {
		var value = ele.value;
		var password = form['inputPassword'].value;
		var namePoint = ele.parentNode.lastElementChild;
		if (value === password && value !== '') {
			namePoint.innerHTML = '输入一致'
			ele.className = namePoint.className = 'success';
		} else if(value !== password && value !== '') {
			namePoint.innerHTML = '输入不一致'
			ele.className = namePoint.className = 'wrong';
		} else if (value === '') {
			namePoint.innerHTML = '再次输入密码'
			ele.className = namePoint.className = 'warning';
		} else {
			return;
		}
	}	
	function emailKeyupCheck(ele) {
		var value = ele.value;
		var namePoint = ele.parentNode.lastElementChild;
		var pattern = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
		if (pattern.test(value)) {
			namePoint.innerHTML = '邮箱格式正确'
			ele.className = namePoint.className = 'success';
		} else if(!pattern.test(value) && value !== '') {
			namePoint.innerHTML = '邮箱格式错误'
			ele.className = namePoint.className = 'wrong';
		} else if (value === '') {
			namePoint.innerHTML = '邮箱不能为空'
			ele.className = namePoint.className = 'warning';
		} else {
			return;
		}
	}	function celKeyupCheck(ele) {
		var value = ele.value;
		var namePoint = ele.parentNode.lastElementChild;
		var pattern = /^[\d]{8,13}$/;
		if (pattern.test(value)) {
			namePoint.innerHTML = '手机格式正确'
			ele.className = namePoint.className = 'success';
		} else if(!pattern.test(value) && value !== '') {
			namePoint.innerHTML = '手机格式错误'
			ele.className = namePoint.className = 'wrong';
		} else if (value === '') {
			namePoint.innerHTML = '号码不能为空'
			ele.className = namePoint.className = 'warning';
		} else {
			return;
		}
	}

	document.getElementsByName('button')[0].addEventListener('click', function(){
		var inputs = document.querySelectorAll('input[id*=input]');
		var inputsArray = [];
		for (var i =0; i < inputs.length; i ++) {
			inputsArray.push(inputs[i]);
		}
		inputsArray.map(function(item) {
			if (item.value === '') {
				item.focus();
				item.blur();
			}
		})
		var result = inputsArray.every(function(item) {
			if (item.classList.contains('success')) {
				return true;
			} else {
				return false;
			}
		})
		alert(result ? '成功' : '有误');
	}, false);
})();