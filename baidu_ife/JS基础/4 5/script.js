(function(){
	var map = document.getElementById('map'),
		redDiv = document.getElementById('red-div'),
		blueDiv = document.getElementById('blue-div'),
		cmd = document.getElementById('cmd'),
		btn = document.getElementById('btn'),
		turnNum = 0;


	cmd.addEventListener('keydown', function(e) {
		if (e.keyCode === 13) {
			var target = e.target;
			var cmdText = target.value;
			target.value = '';
			textHandler(cmdText);
		}
	}, false);
	btn.addEventListener('click', function() {
		textHandler(cmd.value);
		cmd.value = '';
	}, false);

	/*
	toFace: 转向
	face：此时朝向
	direcion：位移方向
	*/

	function textHandler(text) {
		console.log(text);
		switch(text) {
			case 'GO':
				GO();
				break;
			case 'TUN RIG':
			case 'TUN LEF':
			case 'TUN BAC':
				var toFace = text.slice(4);
				TUN(toFace);
				break;
			case 'TRA LEF':
			case 'TRA TOP':
			case 'TRA RIG':
			case 'TRA BOT':
				var direction = text.slice(4);
				TRA(direction);
				break;
			case 'MOV LEF':
			case 'MOV TOP':
			case 'MOV RIG':
			case 'MOV BOT':
				var directionAndToFace = text.slice(4);
				MOV(directionAndToFace);
				break;
			default:
				return;
		}
	}
	
	/*面前移动一格*/
	function GO() {
		var face = getFace();
		moveByDirection(face);
	}
	/*四个方向平移一格*/
	function TRA(direction) {
		moveByDirection(direction);
	}
	function moveByDirection(direction) {
		var offsetY = redDiv.offsetTop;
		var offsetX = redDiv.offsetLeft;
		if (direction ==='TOP' && offsetY !== 0) {
			redDiv.style.top = (offsetY - 50) + 'px';
		} else if (direction ==='RIG' && offsetX !== 450) {
			redDiv.style.left = (offsetX + 50) + 'px';
		} else if (direction ==='BOT' && offsetY !== 450) {
			redDiv.style.top = (offsetY + 50) + 'px';
		} else if (direction ==='LEF' && offsetX !== 0) {
			redDiv.style.left = (offsetX - 50) + 'px';
		}
	}

	/*左转90，右转90，右转180*/
	function TUN(toFace) {
		if (toFace === 'RIG') {
			turnNum = turnNum + 90;
		} else if (toFace === 'LEF') {
			turnNum = turnNum - 90;
		} else if (toFace === 'BAC') {
			turnNum = turnNum + 180;
		}
		redDiv.style.transform = 'rotate(' + turnNum + 'deg)';
	}
	/*四个方向平移一格 转向TRBL*/
	function MOV(directionAndToFace) {
		TRA(directionAndToFace);
		var remainder = turnNum % 360;
		var face = getFace();
		var angle;
		if (directionAndToFace === 'LEF') {
			angle = -90 - remainder
			redDiv.style.transform = 'rotate(' + angle + 'deg)';
		} else if (directionAndToFace === 'RIG') {
			angle = 90 - remainder;
			redDiv.style.transform = 'rotate(' + angle + 'deg)';
		} else if (directionAndToFace === 'TOP') {
			angle = -remainder;
			redDiv.style.transform = 'rotate(' + angle + 'deg)';
		} else if (directionAndToFace === 'BOT') {
			angle = 180 - remainder;
			redDiv.style.transform = 'rotate(' + angle + 'deg)';
		}
	}
	

	function getFace() {
		var remainder = turnNum % 360;
		if (remainder === 0) {return 'TOP';} 
		if (remainder === 90) {return 'RIG';}
		if (remainder === -90) {return 'LEF';}
		if (remainder === 180 || remainder === -180) {return 'BOT';}
	}
})();