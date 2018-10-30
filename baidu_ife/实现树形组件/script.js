;(function() {
  var nodes = [
    {
      name: "食物",
      children: [
        {
          name: "主食",
          children: [
            {
              name: "馒头",
              children: [{name: '白馒头'},{name:'黑馒头'},{name: "花卷"}]
            },
            {name: "大米"},
            {name: "稀饭"}
          ]
        },
        {
          name: "蔬菜"
        }
      ]
    },
    {
      name: "活动",
      children: [{name: "足球"},{name: "跑步"},{name: "乒乓球"}]
    }
  ];



  var html = '';

  function walkJson(nodes) {
    html += '<ul>';
    for( i in nodes) {

      if (!nodes[i].children)
        html += `<li>${nodes[i].name}</li>`

      if (nodes[i].children) {
        html += `<li class="li-contain">${nodes[i].name}</li>`
        walkJson(nodes[i].children);
        }
      }
    html += '</ul>';
  }

  walkJson(nodes)
  var body = document.body;
  body.innerHTML = html;
  

  body.onclick = function(e) {
    var classList = e.target.classList;
    // ["li-contain", "open", value: "li-contain open"]
    if (classList.value.indexOf('li-contain') !== -1) { // 如果li包含li-contain
      var nextUl = e.target.nextElementSibling;
      nextUl.classList.toggle('show'); // nextUl 切换show
      classList.toggle('open'); // li 切换open

      // nextUl的所有子ul.open全部关闭
      var childrenUl = nextUl.querySelectorAll('.show');
      for (var i = 0; i < childrenUl.length; i++) {
        childrenUl[i].classList.remove('show');
        childrenUl[i].previousElementSibling.classList.remove('open');
      }
    }
  }
})();