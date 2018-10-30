function Vue(obj) {
  this.data = obj.data;
  this.vData = {};
  this.rootEl = document.querySelector(obj.el)
  this.walkDom(this.rootEl);
  this.walkData(this.data);
  
}

Vue.prototype = {
  walkDom: function(el) {
    // 转换当前元素的childNodes为Arr
    let childList = [... el.childNodes];
    // 遍历childNodes
    for (let i = 0; i < childList.length; i++) {

      // 如果nodeType是文本
      // 并且包含{{*}}
      // 就改变这个childNode
      if (childList[i].nodeType === 3 && /{{.+}}/.test(childList[i].nodeValue)) {
        this.DomData(childList[i]);
      }

      // 如果nodeType是元素
      // 继续walkDom
      if (childList[i].nodeType === 1) {
        this.walkDom(childList[i]);
      }
    }
  },

  DomData: function(textNode) {
    // 获得当前textNode中{{}}内的文本
    // 可能有多个
    let matchs = textNode.nodeValue.match(/[[\w+\.]+\w+]?/g, '');
    
    // 遍历每个文本 user.name.first
    for (let i = 0; i < matchs.length; i++) {
    
      // 将文本以'.'分割为数组
      let keyArr = matchs[i].split('.');
      for (let i = 0; i < keyArr.length; i++) {
        if (i === keyArr.length - 1) {
          let data = {[keyArr[i]]: {
            node: textNode,
            value: textNode.nodeValue
          }}
        } else {
          let data = {[keyArr[i]]: ''}
        }
        
        if (i === 0) {
          this.vData = data;
        } else {
          let newObj = walkMyObj(obj, i);
        }
        newObj = data;
      }


      function walkMyObj(obj, i) {
        for (let k in obj) {
          if (typeof obj[k] === 'object') {
            walkMyObj(obj[k]);
          }
          if (k === keyArr[i-1]) {
            return obj[k];
          }
        }
      }
    }

    this.replace(this.vData)
  },

  {
    user: {
      name:{}
      {
        node: textNode,
        value: nodeValue
      },

    }
  }
  replace: function(vData) {
    let allData = Object.assign({}, this.vData, this.data);
    walkMyObj(allData) {
      for (let k in allData) {
        if (typeof allData[k] === 'string')
      }
    }
    // 获得当前textNode中{{}}内的文本
    // 可能有多个
    let matchs = textNode.nodeValue.match(/[[\w+\.]+\w+]?/g, '');

    // 遍历每个文本 user.name || user.age
    for (let i = 0; i < matchs.length; i++) {

      this.dataDom = {
        ...this.dataDom,
        [matchs[i]]: textNode
      }
      console.log(this.dataDom);

      // 将文本以'.'分割为数组
      let keyArr = matchs[i].split('.');

      // 以obj[key]的方式
      // 逐层遍历获取到this.data中的val
      let val = this.data;
      for (let i = 0; i < keyArr.length; i++) {
        val = val[keyArr[i]];
      }
      
      // 将textNode.nodeValue的一个{{*}}部分，替换为val
      textNode.nodeValue = textNode.nodeValue.replace(/{{[\w+\.]+\w+}}/, val)
    }
  },

  walkData: function(obj) {
    let val;
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        
        val = obj[key];
        if (typeof val === 'object') {
          this.walkData(val);
        }

        this.convert(obj, key, val);
      }
    }

  },

  convert: function(obj, key, val) {
    let _this = this;
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get: function() {
        return val;
      },
      set: function(newValue) {
        if (val === newValue) return;
        val = newValue;

        
        _this.dataDom['user.age'].nodeValue = newValue
        console.log(_this.dataDom);


        if (typeof newValue === 'object') {
          walkData(newValue);
        }
      }
    })
  }
}



let app = new Vue({
  el: '#app',
  data: {
    user: {
      name: 'youngwind',
      age: 25
    }
  }
})