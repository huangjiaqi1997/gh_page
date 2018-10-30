;(function() {
  var wpr = document.querySelector('#wrapper');
  var list = document.querySelector('.list');

  var isLoading = false;
  var i = 11;
  wpr.onscroll = function() {
    var wprCH = wpr.clientHeight;
    var wprST = wpr.scrollTop;
    var listSH = list.scrollHeight;
    var wprSB = listSH - wprCH - wprST;

    if ((wprSB === 0 || wprSB < 0) && !isLoading) {
      
      isLoading = true;
      var loadLi = document.createElement('li');
      loadLi.id = 'loading';
      loadLi.innerText = 'Loading...';
      list.appendChild(loadLi);

      var timer = setTimeout(function() {
        var j = i + 10;
        for (; i < j ; i++) {
          var item = document.createElement('li');
          item.innerText = i;
          list.appendChild(item);
          
        }
        list.removeChild(loadLi);
        isLoading = false;
        clearTimeout(timer)
      }, 1000);
    }
  }
})();