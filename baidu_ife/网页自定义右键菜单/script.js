;(function() {
  let customMenu = document.getElementsByClassName('custom-menu')[0];

  /**
   * 获取浏览器窗口有效宽高
   * window.innerWidth
   * document.documentElement.clientWidth || document.body.clientWidth（支持IE6、IE7）
   */
  document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    e.returnValue = false;
    let posX = e.pageX;
    let posY = e.pageY;
    const menuW = customMenu.offsetWidth;
    const menuH = customMenu.offsetHeight;
    const winW = window.innerWidth;
    const winH = document.documentElement.clientHeight || document.body.clientHeight;
    const maxLeft = winW - menuW;
    const maxTop = winH - menuH;

    posX = posX > maxLeft
    ? posX - menuW
    : posX;

    posY = posY > maxTop
    ? posY - menuH
    : posY;

    customMenu.style.visibility = 'visible';
    customMenu.style.left = posX + 'px';
    customMenu.style.top = posY + 'px';
  }, false)

  document.onclick = function(e) {
    customMenu.style.visibility = 'hidden';
  }
})();