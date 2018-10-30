(function() {
	var name = document.forms[0]['name'];
	var warn = document.getElementsByTagName('p')[0]
	name.addEventListener('blur', function(e) {
		var nameText = e.target.value;
		if (nameText === '') {
			warn.innerHTML = '姓名不能为空！'
			name.className = 'warning';
			warn.className = 'warning';
		} else {
			return;
		}
	}, false);


	name.addEventListener('focus', function(e) {
		var nameText = e.target.value;
		if (nameText === '') {
			warn.innerHTML = '必填，长度为4-16个字符'
			name.className = 'normal';
			warn.className = 'normal';
		} else {
			return;
		}
	}, false);

	name.addEventListener('keyup', function(e) {
		var nameText = name.value;
		console.log(nameText.length)
		var nameText = nameText.replace(/[^\x00-\xff]/, '**');
		if (nameText.length >= 4 && nameText.length <= 16) {
			warn.innerHTML = '名称格式正确'
			name.className = 'success';
			warn.className = 'success';
		} else if((nameText.length < 4 || nameText.length > 16) && nameText.length != 0) {
			warn.innerHTML = '名称格式错误！'
			name.className = 'wrong';
			warn.className = 'wrong';
		} else if (nameText === '') {
			warn.innerHTML = '姓名不能为空！'
			name.className = 'warning';
			warn.className = 'warning';
		} else {
			return;
		}
	}, false);
})();