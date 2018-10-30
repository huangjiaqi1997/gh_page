/**
 * Created by asus on 2017/3/20.
 */
'use strict';

var loadImage = require('./imageloader'); //调用loadImage
var TimeLine = require('./timeline');

//初始化状态
var STATE_INITIAL = 0;
//开始状态
var STATE_START = 1;
//停止状态
var STATE_STOP = 2;
//同步任务
var TASK_SYNC = 0;
//异步任务
var TASK_ASYNC = 1;

/**
 * 动画库帧类
 * @constructor
 */
function Animation() {
    this.taskQueue = [];
    this.index = 0;
    this.timeline = new TimeLine();
    this.state = STATE_INITIAL;
}

/**
 * 添加一个同步任务，去预加载图片
 * @param imglist 图片数组
 */
Animation.prototype.loadImage=function (imgList) {
    var taskFn = function (next) {
        loadImage(imgList.slice(), next);
    };
    var type = TASK_SYNC;

    return this._add(taskFn, type); //链式
};

/**
 * 添加一个异步定时任务，通过定时改变图片背景位置，实现帧动画
 * @param ele DOM对象
 * @param positions 背景位置数组
 * @param imgUrl 图片地址
 */
Animation.prototype.changePosition=function (ele,positions,imgUrl) {
	var len = positions.length, taskFn, type;
	if (len) {
		var me = this;
		taskFn = function (next, time) {
			if (imgUrl) {
				ele.style.backgroundImage = 'url(' + imgUrl + ')';
			}
			//获取当前图片索引
			var index = Math.min(time / me.interval || 0, len - 1);
			var position = position[index].split(' ');
			//改变背景图片位置
			ele.style.backgroundPosition = position[0] + 'px' + position[1] + 'px';
			if (index === len - 1) {
				next();
			}
		};
		type = TASK_ASYNC;
	}
	else {
		taskFn = next;
		type = TASK_ASYNC;
	}

	return this._add(taskFn, type);
};

/**
 * 添加一个异步定时任务，通过定时改变img标签的src属性，实现帧动画
 * @param ele image标签
 * @param imglist 图片数组
 */
Animation.prototype.changeSrc=function (ele,imglist) {
	var len = imglist.length, taskFn, type;
	if (len) {
		var me = this;
		taskFn = function (next, time) {
			//获取当前图片索引
			var index = Math.min(time / me.interval || 0, len - 1);
			//改变背景图片url
			ele.src = imglist[index];
			if (index === len - 1) {
				next();
			}
		};
		type = TASK_ASYNC;
	}
	else {
		taskFn = next;
		type = TASK_ASYNC;
	}
	return this._add(taskFn, type);
};

/**
 * 高级用法，添加一个异步定时执行的任务
 * 该任务自定义动画每帧执行的任务函数
 * @param taskFn 自定义每帧执行的任务函数
 */
Animation.prototype.enterFrame=function (taskFn) {
	return this._add(taskFn, TASK_ASYNC);
};

/**
 * 添加一个同步任务，可以在上个任务执行完后执行回调函数
 * @param callback 回调函数
 */
Animation.prototype.then=function (callback) {
	var taskFn = function (next) {
		callback();
		next();
	};
	var type = TASK_SYNC;

	return this._add(taskFn, type);
};
/**
 * 开始执行任务，异步定义任务执行的间隔
 * @param interval
 */
Animation.prototype.start=function (interval) {
    if (this.state === STATE_START) {return this;}
    if(!this.taskQueue.length) {return this;}

    this.state = STATE_START;
    this.interval = interval;
    this._runTask();
    return this;
};

/**
 * 添加一个同步任务，该任务就是回到上一个任务中
 * 实现重复上一个任务的效果，可以重复定义次数
 * @param times 重复次数
 */
Animation.prototype.repeat=function (times) {
	var me = this;
	var taskFn = function () {
		if (typeof times === 'undefined') {
			//无限回退到上一个任务
			me.index--;
			me._runTask();
			return;
		}
		if (times) {
			times--;
			//回退
			me.index--;
			me._runTask();
		} else {
			var task = me.taskQueue[me.index];
			me._next(task);
		}
	};
	var type = TASK_SYNC;
	return this._add(taskFn, type);
};

/**
 * 添加一个同步任务，相当于repeat()更友好的接口，无限循环上一次任务
 */
Animation.prototype.repeatForever=function () {
	return this.repeat();
};

/**
 * 设置当前任务执行结束后到下一个任务前的等待时间
 * @param time 等待时长
 */
Animation.prototype.wait = function (time) {
	if (this.taskQueue && this.taskQueue.length >0) {
		this.taskQueue[this.taskQueue.length - 1].wait = time;
	}
	return this;
};

/**
 * 暂停当前异步定时任务
 */
Animation.prototype.pause = function () {
	if (this.state === STATE_START) {
		this.state = STATE_STOP;
		this.timeline.stop();
		return this;
	}
	return this;
};

/**
 * 重新执行上次暂停的异步任务
 * @returns {Animation}
 */
Animation.prototype.restart = function () {
	if (this.state === STATE_STOP) {
		this.state = STATE_START;
		this.timeline.restart();
		return this;
	}
	return this;
};
/**
 * 释放资源
 */
Animation.prototype.dispose = function () {
	if (this.state !== STATE_INITIAL) {
		this.state = STATE_INITIAL;
		this.taskQueue =null;
		this.timeline.stop();
		this.timeline = null;
		return this;
	}
	return this;
};



/**
 * 添加一个任务到任务列队中
 * @param taskFn 任务方法
 * @param type 任务类型
 * @private
 */
Animation.prototype._add = function (taskFn, type) {
    this.taskQueue.push({
        taskFn: taskFn,
        type: type
    });
    return this;
};

/**
 * 执行任务 -> 同步任务、异步任务
 * @private
 */
Animation.properties._runTask = function () {
    if (!this.taskQueue || this.state !== STATE_START) {return;}
    if (this.index === this.taskQueue.length) { //任务执行完毕
        this.dispose();
        return;
    }
    //获得任务链上的当前任务
    var task=this.taskQueue[this.index];
    if ( task.type === TASK_SYNC ) {
        this._syncTask(task);
    } else {
        this._asyncTask(task);
    }
};
/**
 * 调用同步任务
 * @param task 执行任务对象
 * @private
 */
Animation.prototype._syncTask = function (task) {
    var me = this;
    var next = function () {
        me._next(task); //切换到下一个任务
    };
    var taskFn = task.taskFn;
    taskFn(next);
};
/**
 * 调用异步任务（需要创建一个时间轴，构建动画）
 * @param task
 * @private
 */
Animation.prototype._asyncTask = function (task) {
    var me = this;
    //定义每一帧执行的回调函数
    var enterFrame = function (time) {
	    var taskFn = task.taskFn;
	    var next = function () {
		    me.timeline.stop(); //停止当前任务
		    me._next(task); //执行下一个任务
	    };
	    taskFn(next, time);
    };

    this.timeline.onenterframe = enterFrame;
    this.timeline.start(this.interval);
};

/**
 * 切换到下一个任务
 * @param task 当前任务
 * @private
 */
Animation.prototype._next = function (task) {
	this.index++;
	var me = this;
	task.wait ? setTimeout(function () {
		me._runTask();
	},task.wait) : this._runTask()
};

/**
 * 简单的函数封装，执行callback
 * @param callback
 */
function next(callback) {
	callback && callback();
}

module.exports = function () {
	return new Animation();
};