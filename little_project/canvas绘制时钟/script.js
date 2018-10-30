/**
 * Created by asus on 2017/5/28.
 */

/** x轴向右、y轴向下**/

var dom = document.getElementById('clock'),
	ctx = dom.getContext('2d'),
	width = ctx.canvas.width,
	height = ctx.canvas.height,
	r = width / 2,
	rem = width / 200; //比例


function drawBackground() {
	ctx.save(); //到最后
	ctx.translate(r, r); //中心
	ctx.beginPath(); //开始
	ctx.lineWidth = 10 * rem; //线宽
	ctx.arc(0, 0, r - 5 * rem, 0, 2 * Math.PI); //绘圆
	ctx.stroke(); //填充

	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';

	var hourNumbers = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2];
	ctx.font = 20 * rem + 'px Arial'; //填充之前
	hourNumbers.forEach(function (number, i) {
		var rad = 2 * Math.PI / 12 * i;
		var x = Math.cos(rad) * (r - 30 * rem);
		var y = Math.sin(rad) * (r - 30 * rem);
		ctx.fillText(number, x ,y);
	});

	for (var i = 0; i < 60; i++) {
		var rad = 2 * Math.PI / 60 * i;
		var x = Math.cos(rad) * (r - 16 * rem);
		var y = Math.sin(rad) * (r - 16 * rem);
		ctx.beginPath();
		if (i % 5 === 0) {
			ctx.fillStyle = '#000';
			ctx.arc(x, y, 2 * rem, 0, 2 * Math.PI, false);
		} else {
			ctx.fillStyle = "#ccc";
			ctx.arc(x, y, 2 * rem, 0, 2 * Math.PI, false);
		}
		ctx.fill();
	}
}

function drawHour(hour, minute) {
	ctx.save(); //保存当前的未旋转画布
	ctx.beginPath();
	var rad = 2 * Math.PI / 12 * hour;
	var mrad = 2 * Math.PI / 60 * minute / 12;
	ctx.rotate(rad + mrad); //以原点 自身旋转1/3rad
	ctx.lineWidth = 6 * rem;
	ctx.lineCap = 'round';
	ctx.moveTo(0, 10 * rem);
	ctx.lineTo(0, - r / 2);
	ctx.stroke();
	ctx.restore(); //还原回保存的画布
}
function  drawMinute(minute) {
	ctx.save();
	ctx.beginPath();
	var rad = 2 * Math.PI / 60 * minute;
	ctx.rotate(rad); //旋转
	ctx.lineWidth = 3 * rem;
	ctx.lineCap = 'round';
	ctx.moveTo(0, 10 * rem);
	ctx.lineTo(0, - r + 30 * rem);
	ctx.stroke();
	ctx.restore();
}
function  drawSecond(second) {
	ctx.save();
	ctx.beginPath();
	var rad = 2 * Math.PI / 60 * second;
	ctx.fillStyle = 'red';
	ctx.rotate(rad); //旋转
	ctx.moveTo(-2 * rem, 20 * rem);
	ctx.lineTo(2 * rem, 20 * rem);
	ctx.lineTo(rem, -r + 18 * rem);
	ctx.lineTo(-rem, -r + 18 * rem);
	ctx.fill();
	ctx.restore();
}

function drawDot() {
	ctx.beginPath();
	ctx.fillStyle = '#fff';
	ctx.arc(0, 0, 3 * rem, 0, 2 * Math.PI, false);
	ctx.fill();
}


function draw() {
	ctx.clearRect(0, 0, width, height);
	var now = new Date();
	var hour = now.getHours();
	var minute = now.getMinutes();
	var second = now.getSeconds();
	drawBackground();
	drawHour(hour, minute);
	drawMinute(minute);
	drawSecond(second);
	drawDot();
	ctx.restore();
}

draw();
setInterval(draw, 1000);