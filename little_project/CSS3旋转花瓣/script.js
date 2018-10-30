window.onload = function() {
  // 20种色阶
  var colors = ['#FF0088', '#FF0000', '#FF5511', '#FF8800', '#FFBB00', '#FFFF00', '#BBFF00', '#77FF00', '#00FF00', '#00FF99', '#00FFCC', '#00FFFF', '#00BBFF', '#0066FF', '#0000FF', '#5500FF', '#7700FF', '#9900FF', '#CC00FF', '#FF00FF'];
  var sheet = document.styleSheets[0];
  var el = document.querySelectorAll('.icon-leaf');
  
  for (let i = 0; i < el.length; i++) {
    sheet.insertRule(
      `@keyframes leaf-${i+1} {
        0%{ opacity:0; transform:rotate(0deg); transform-origin:50% 110px; }
        100%{ opacity:0.3;transform:rotate(${i*18}deg); transform-origin:50% 110px; color: ${colors[i]} }
      }`
    )
    // ${0.1*i}s
    // 3s infinite
    sheet.insertRule(
      `.leaf-${i+1}.icon-leaf {
        animation: leaf-${i+1} ease 3s infinite both;
      }`
    )
  }
}