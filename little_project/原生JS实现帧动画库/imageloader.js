'use strict';
/**
 * 预加载图片函数
 * @param images 图片数组或对象
 * @param callback 全部图片加载完毕后调用的回调函数
 * @param timeout 加载超时的时长
 */
function loadImage(images,callback,timeout) {
    var count = 0; //加载完成图片的计时器
    var success = true; //全部图片加载完成的标志位
    var timeoutId = 0; //超时timer的id
    var isTimeout = false; //是否加载超时的标志位

    //对图像数组或（对象）进行遍历，生成item对象、item.id、item.src
    for (var key in images) {
        if (!images.hasOwnProperty(key)) {continue;} //过滤prototype的属性
        var item = images[key];//获得每个图片元素 望格式是个object:{scr：xxx}

        if (typeof item === 'string') { //如果是一个字符串，则构建object
            item = images[key] = {
                src: item
            };
        }
        if (!item || !item.src) {continue;}

        count++;

        //设置图片元素的id
        item.id = '__img_' + key + getId();
        //设置图片元素的img，是一个Image对象
        item.img = window[item.id] = new Image();

        //加载
        doLoad(item);
    }

    if(!count){
        callback(success);
    }

    //如果设置了加载时长，则设置超时函数计时器
    else if (timeout) {
        timeoutId = setTimeout(onTimeout, timeout);
    }

    /**
     * 真正进行图片加载的函数
     * @param item 图片元素对象
     */
    function doLoad(item) {
        item.status = 'loading';
        var img = item.img;

        //定义图片加载成功失败的回调函数
        img.onload = function () {
            success = success && true;
            item.status = 'loaded';
            done();
        };
        img.onerror = function () {
            success = false;
            item.status = 'error';
            done();
        };
        img.src = item.src; //发起一个HTTP（s）请求加载图片

        /**
         * 每张图片加载完成后的回调函数
         */
        function done() {
            img.onload = img.onerror=null;
            try{
                delete window[item.id]; //删除window imgObj
            }
            catch(e){}

            //count最终等于4，每张加载完成，count - 1
            //当所有图片加载完成并且没有超时的情况下，清除超时计时器，且执行回调函数
            if (!--count && !isTimeout) {
                clearTimeout(timeoutId);
                callback(success);
            }
        }
    }

    /**
     * 超时函数
     */
    function onTimeout() {
        isTimeout = true;
        callback(false);
    }
}

var __id = 0;
function getId() {
	return ++__id;
}

module.exports = loadImage;
