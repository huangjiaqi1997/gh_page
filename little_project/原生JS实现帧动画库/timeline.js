/**
 * Created by asus on 2017/5/28.
 */
'use strict';

var DEFAULT_INTERVAL = 1000 / 60;

var STATE_INITIAL = 0,
	STATE_START = 1,
	STATE_STOP = 2;

/**
 * raf （立即运行，获得参数）
 */
var requestAnimationFrame = (function () {
	return window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		function (callback) {
			return window.setTimeout(callback,callback.interval || DEFAULT_INTERVAL);
		};
})();
var cancelAnimationFrame = (function () {
	return window.cancelAnimationFrame ||
		window.webkitCancelAnimationFrame ||
		window.mozCancelAnimationFrame ||
		window.oCancelAnimationFrame ||
		function (id) {
			return window.clearTimeout(id);
		};
})();

/**
 * TimeLine 时间轴类
 * @constructor
 */
function TimeLine() {
	this.animationHandler = 0;
	this.state = STATE_INITIAL;
}

/**
 * 时间轴上每一次回调执行的函数
 * @param time 从动画开始到当前执行的时间
 */
TimeLine.prototype.onenterframe = function (time) {};

/**
 * 动画开始 -> startTimeline
 * @param interval 每次回调的间隔时间
 */
TimeLine.prototype.start = function (interval) {
	if (this.state === STATE_START) {return;}
	this.state = STATE_START;
	this.interval = interval || DEFAULT_INTERVAL;

	startTimeLine(this, +new Date());

};

/**
 * 动画停止
 */
TimeLine.prototype.stop = function () {
	if (this.state !== STATE_START) {return;}
	this.state = STATE_STOP;

	if(this.startTime) { //若开始过，记录开始到现在的时间
		this.dur = +new Date() - this.startTime;
	}
	cancelAnimationFrame(this.animationHandler);
};
/**
 * 重新开始动画 -> startTimeLine
 */
TimeLine.prototype.restart = function () {
	if (this.state === STATE_START) {return;}
	if (!this.dur || this.interval) {return;}
	this.state = STATE_START;

	this.startTimeLine(this, +new Date() - this.dur);
};

/**
 * 时间轴动画启动
 * @param timeLine 时间轴实例
 * @param startTime 动画开始时间戳
 */
function startTimeLine(timeLine, startTime) {
	timeLine.startTime = startTime;
	nextTick.interval = timeLine.interval;

	var lastTick = +new Date(); //记录上一次回调的时间戳
	nextTick();

	function nextTick() {
		var now = +new Date();

		timeLine.animationHandle = requestAnimationFrame(nextTick);

		if (now - lastTick >= timeLine.interval) { //当前时间-上次回调时间>设置的时间间隔，—> onenterframe
			timeLine.onenterframe(now - startTime);
			lastTick = now;
		}
	}
}

module.reports = TimeLine;