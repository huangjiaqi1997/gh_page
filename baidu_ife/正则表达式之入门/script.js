;(function() {
  var tel = document.querySelector('.tel');
  var words = document.querySelector('#words');
  // 此处的值已经选定
  // var telValue = tel.value;
  // var wordsValue = words.value;
  var telBtn = document.querySelector('.tel-btn');
  var wordsBtn = document.querySelector('.words-btn');
  

  telBtn.onclick = function() {
    var telValue = tel.value;
    var result = telValue.match(/^1[3,4,5,7,8][0-9]{9}$/);
    if (result) {
      alert('格式正确！');
    } else {
      alert('格式错误！');
    }
  };
  wordsBtn.onclick = function() {
    var wordsValue = words.value;
    var result = wordsValue.match(/\s+\w+\s+|^\w+\s+|\s+\w+$/i);
    console.log(result)
    var resultArr = result.input.trim().split(' ');

    var k = 0;
    for(var i = 0; i < resultArr.length; i++) {
      if (resultArr[i] === resultArr[i + 1]) {
        alert('有重复！')
        break;
      } else {
        k++;
      }
    }
    if (k === resultArr.length) {
      alert('成功！')
    }
  };
  
})();