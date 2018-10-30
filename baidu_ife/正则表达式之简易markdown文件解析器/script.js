function MdEditor() {
  this.init();
}

MdEditor.prototype = {
  init: function() {
    var _this= this;
    this.editor = document.querySelector('#edit-textarea');
    this.preview = document.querySelector('#preview');

    this.editorHandler();
  },

  editorHandler: function() {
    var _this = this;
    var fnArr = [this.head, this.ulList, this.olList, this.quote, this.code, this.blockCode];

    // 对convert设定延时，提高性能
    var flag = 0;
    var timer;
    this.editor.onkeyup = function(e) {
      if (flag === 0 && timer) {
        clearTimeout(timer)
        flag = 0;
      }
      timer = setTimeout(function() {
        flag = 1;
        var text = e.target.value;
        _this.convert(text, fnArr);
      }, 2000);
    }
  },

  convert: function(text, fnArr) {
    var newText = text;
    // 基于上一个转化函数返回的字符串，调用下一个转化函数
    for (let i = 0; i < fnArr.length; i+=2) {
      newText = fnArr[i](newText);
      if (fnArr[i+1]) {
        newText = fnArr[i+1](newText)
      } else {
        return 
      }
    }
    // console.log(newText);
    this.preview.innerHTML = newText;
  },


  /* 转换函数 */
  head: function(text) {
    var headers = text.match(/^#{1,6}\s/gm);
    if (!headers) return text;
    for (let i = 0; i < headers.length; i++) {
      var level = headers[i].length - 1;
      switch (level) {
        case 1:
          text = text.replace(/^#\s(.+)/gm, `<h1>$1</h1>`)
          break;
        case 2:
          text = text.replace(/^##\s(.+)/gm, `<h2>$1</h2>`)
          break;
        case 3:
          text = text.replace(/^###\s(.+)/gm, `<h3>$1</h3>`)
          break;
        case 4:
          text = text.replace(/^#{4}\s(.+)/gm, `<h4>$1</h4>`)
          break;
        case 5:
          text = text.replace(/^#{5}\s(.+)/gm, `<h5>$1</h5>`)
          break;
        case 6:
          text = text.replace(/^#{6}\s(.+)/gm, `<h6>$1</h6>`)
          break;
        default:
          return;
      }
    }
    return text;
  },
  ulList: function(text) {
    var lists = text.match(/^[-*]\s.+/gm);
    if (!lists) return text;
    for (let i = 0; i < lists.length; i++) {
      // 先处理每一个* 123
      text = text.replace(/^[-*]\s(.+)/gm, `<li>$1</li>`)
    }
    // 前瞻不包括<\/li>\n，后瞻不包括\n<li>
    text = text.replace(/(?<!<\/li>\n|<ol>)((<li>.+<\/li>\n)+)(?!<li>|<\/ol>)/gm, `<ul>$1</ul>\n`)
    return text;
  },
  olList:function(text) {
    var lists = text.match(/^\d\.\s.+/gm);
    if (!lists) return text;
    for (let i = 0; i < lists.length; i++) {
      // 先处理每一个\d. 123
      text = text.replace(/^\d\.\s(.+)/gm, `<li>$1</li>`)
    }
    // 前瞻不包括<\/li>\n，后瞻不包括\n<li>
    text = text.replace(/(?<!<\/li>\n|<ul>)((<li>.+<\/li>)\n+)(?!\n<li>|<\/ul>)/gm, `<ol>$1</ol>\n`)
    return text;
  },
  quote: function(text) {
    var lists = text.match(/^>\s.+/gm);
    if (!lists) return text;
    for (let i = 0; i < lists.length; i++) {
      text = text.replace(/^>\s(.+)/gm, `<blockquote><div><p>$1</p></div></blockquote>`)
    }
    return text;
  },

  code: function(text) {
    var lists = text.match(/`[^\n`]+`/g);
    if (!lists) return text;
    for (let i = 0; i < lists.length; i++) {
      text = text.replace(/`([^\n`]+)`/g, `<code>$1</code>`)
    }
    return text;
  },
  blockCode: function(text) {
    // var lists = text.match(/^```\n[^```](.|\n)+\n^```/gm);
    var lists = text.match(/^```\n(.|\n)+\n^```/gm);
    if (!lists) return text;
    for (let i = 0; i < lists.length; i++) {
      text = text.replace(/^```\n((.|\n)+)\n+^```/gm, `<pre><code>$1</code></pre>`)
    }
    return text;
  }
}

var myMdEditor = new MdEditor();