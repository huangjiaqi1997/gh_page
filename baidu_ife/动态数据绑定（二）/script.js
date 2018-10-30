/**
 * 编写一个方法
 * 当特定的key对应的值改变时
 * 调用一个自定义的函数
 */

// 观察者构造函数
function Observer(data) {
  this.data = data;
}


Observer.prototype.$watch = function(mykey, cb) {
  this.walk(this.data, mykey, cb);
} 

Observer.prototype.walk = function(obj, mykey, cb) {
  // 深层遍历对象
  let val;
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      val = obj[key];
      if (typeof val === 'object') {
        this.walk(val, mykey, cb);
      }

      if (key === mykey) this.convert(obj, mykey, val, cb);
    }
  }
};

Observer.prototype.convert = function(obj, mykey, val, cb) {
  const _this = this;
  Object.defineProperty(obj, mykey, {
    enumerable: true,
    configurable: true,
    get: function() {
      return val;
    },
    set: function(newVal) {
      cb(newVal);
      
      if (newVal === val) return;
      val = newVal
      
      if (typeof newVal === 'object') {
        _this.walk(newVal, mykey, cb);
      }
    }
  })
}


let data = {
  age: {
    age: 10
  }
}

let app = new Observer(data);
app.$watch('age', function(age) {
  console.log(`我的年纪变了，现在已经是：${age}岁了`)
});

