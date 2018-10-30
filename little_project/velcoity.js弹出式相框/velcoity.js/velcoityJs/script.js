;(function() {
  /**
   * velocity()
   * 调用动画
   */
  $('#box1').velocity({
    width: '200px'
  }, {
    duration: 1000,
    delay: 1000, // delay实现连续
    complete: function() { //回调实现连续
      $('#box2').velocity({
        width: '200px'
      })
    }
  })

  /**
   * $.Velocity.RegisterEffect()
   * 自定义动画
   */
  $.Velocity.RegisterEffect('my.pulse', {
    defaultDuration: 2000,
    calls: [
      [{scaleX: 1.5}, 0.5],
      [{scale: [1, 0.3], translateX: [100, 0]}] // 相反
    ]
  });
  $('#box1').on('mouseover', function() {
    $(this).velocity('my.pulse');
  })
 
  /**
   * $.Velocity.RunSequence(seq)
   * 执行定义的动画序列
   */
  var seq = [
    {
      elements: $('#box1'),
      properties: 'my.pulse',
      options: {duration: 1000}
    },
    {
      elements: $('#box2'),
      properties: {width: '200px'},
      options: {duration: 1000}
    }
  ];
  $.Velocity.RunSequence(seq);
  
})();