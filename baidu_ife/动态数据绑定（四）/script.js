function Vue(obj) {
  this.data = obj.data;
  this.walkDom(document.querySelector(obj.el));
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
        this.replace(childList[i]);
      }

      // 如果nodeType是元素
      // 继续walkDom
      if (childList[i].nodeType === 1) {
        this.walkDom(childList[i]);
      }
    }
  },

  replace: function(textNode) {
    // 获得当前textNode中{{}}内的文本
    // 可能有多个
    let matchs = textNode.nodeValue.match(/[[\w+\.]+\w+]?/g, '');

    // 遍历每个文本 user.name || user.age
    for (let i = 0; i < matchs.length; i++) {

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