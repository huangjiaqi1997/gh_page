/**
 * 访问、改变特定key的 后代的值 时
 * 调用自定义的函数（冒泡）
 */


// 观察者
function Observer(data) {
  this.data = data;
}

Observer.prototype.$watch = function(mykey, cb) {
  // 设置当前的Obj
  // 设置监听的Key
  // 设置setter中执行的函数
  this.walk(this.data, mykey, cb);
}

Observer.prototype.walk = function(obj, mykey, cb) {
  // 深层次遍历对象
  let val;
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      val = obj[key];
      if (typeof val === 'object') {
        this.walk(val, mykey, cb);
      }


      // 如果值是Object
      // 并且键是mykey
      // 对这个Object中的所有值（包括后代）设置setter
      // val是name的值
      if (typeof val === 'object' && key === mykey) {
        this.myWalk(val, cb);
      }
    }
  }
};

Observer.prototype.myWalk = function(obj, cb) {
  // 深层次遍历对象
  let val;
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      val = obj[key];
      if (typeof val === 'object') {
        this.myWalk(val, cb);
      }

      this.convert(obj, key, val, cb);
    }
  }
}

Observer.prototype.convert = function(obj, key, val, cb) {
  const _this = this;
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function() {
      return val;
    },
    set: function(newVal) {
      console.log(obj);
      cb(newVal);
      if (newVal === val) return;
      val = newVal
      
      if (typeof newVal === 'object') {
        _this.myWalk(newVal, cb);
      }
    }
  })
}





let data =

{
  user:

  {
    name: 

    {
      first: {Eng: 'huang', Ch: '黄'},
      last: 'jiaqi'
    }
  }
}

let app = new Observer(data);
app.$watch('name', function(name) {
  console.log('我的名字发生了变化，可能是姓氏变了，也可能是名字变了。')
});

