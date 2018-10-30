/* 监听对象中所有值的访问、改变 */

// 观察者构造函数
function Observer(data) {
  this.data = data;
  this.walk(data);
}

let p = Observer.prototype;

// 此函数用于深层次遍历对象的各个属性
// 采用的是递归的思路
// 因为我们要为对象的每一个属性绑定getter和setter
p.walk = function(obj) {
  let val;
  for (let key in obj) {
    // 这里为什么要用hasOwnProperty进行过滤呢？
    // 因为for...in会把对象原型链上所有可枚举属性都循环出来
    // 而我们想要的仅仅是这个对象本身拥有的属性
    if (obj.hasOwnProperty(key)) {
      val = obj[key];

      // 这里进行判断，如果还没遍历到最底层，继续new Observer
      if (typeof val === 'object') {
        new Observer(val);
      }

      this.convert(key, val);
    }
  }
};

p.convert = function(key, val) {
  Object.defineProperty(this.data, key, {
    enumerable: true,
    configurable: true,
    get: function() {
      console.log('你访问了' + key);
      return val;
    },
    set: function(newVal) {
      console.log('你设置了' + key);
      console.log('新的' + key + '=' + newVal);
      if (newVal === val) return;
      val = newVal

      // 只监听的对象的变化，没有处理数组的变化。
      // 当你重新set的属性是对象的话，那么新set的对象里面的属性不能调用getter和setter。
      // 解决方法
      if (typeof newVal === 'object') {
        new Observer(newVal);
      }
    }
  })
}

let data = {
  user: {
    name: 'xiaoming',
  },
}
let app = new Observer(data);
