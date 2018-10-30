(function($){
	var container = $('.container'),
        box = $('.box'),
        buddy = $('.buddy'),
        pop = $('.pop'),
        open = $('.btn'),
        close = $('.close'),
        imgs = pop.find('img');

	//自定义动画 向上淡入
	$.Velocity.RegisterUI('my.slideUpIn', {
		defaultDuration: 500,
		calls: [
		[{opacity: [1, 0], translateY: [0, 100]}]
		]
	});
	//向下淡出
	$.Velocity.RegisterUI('my.slideDownOut', {
        defaultDuration: 300,
        calls: [
            [{opacity: [0, 1], translateY: [100, 0]}]
        ]
    });
	//放大淡入
    $.Velocity.RegisterUI('my.scaleIn', {
        defaultDuration: 300,
        calls: [
            [{opacity: [1, 0], scale: [1, 0.3]}]
        ]
    });
    //缩小淡出
    $.Velocity.RegisterUI('my.scaleOut', {
        defaultDuration: 300,
        calls: [
            [{opacity: [0, 1], scale: [0.3, 1]}]
        ]
    });


    //动画序列 页面载入
	var seqInit = [{
		elements: container,
		properties: 'my.slideUpIn',
		options: {
			delay: 300
		}
	}, {
		elements: box,
		properties: 'my.slideUpIn',
		options: {
			sequenceQueue: false
		}
	}, {
		elements: buddy,
		properties: 'my.slideUpIn',
		options: {
			delay: 60,
			sequenceQueue: false
		}
	}];


	//点击按钮
    var seqClick = [{
        elements: container,
        properties: 'my.slideDownOut',
    }, {
        elements: box,
        properties: 'my.slideDownOut',
        options: {
            sequenceQueue: false
        }
    }, {
        elements: container,
        properties: 'my.slideUpIn',
    }, {
        elements: pop,
        properties: 'my.slideUpIn',
        options: {
            sequenceQueue: false
        }
    }, {
        elements: imgs,
        properties: 'my.scaleIn',
    }];



    //点击关闭
    var seqClose = [{
        elements: imgs,
        properties: 'my.scaleOut',
    }, {
        elements: container,
        properties: 'my.slideDownOut',
    }, {
        elements: pop,
        properties: 'my.slideDownOut',
        options: {
            sequenceQueue: false
        }
    }, {
        elements: container,
        properties: 'my.slideUpIn',
    }, {
        elements: box,
        properties: 'my.slideUpIn',
        options: {
            sequenceQueue: false
        }
    }, {
        elements: buddy,
        properties: 'my.slideUpIn',
        options: {
            delay: 60,
            sequenceQueue: false
        }
    }];


    //事件绑定
    $.Velocity.RunSequence(seqInit);
    open.on('click', function () {
        $.Velocity.RunSequence(seqClick);
    });
    close.on('click', function () {
        $.Velocity.RunSequence(seqClose);
    });
})(jQuery);