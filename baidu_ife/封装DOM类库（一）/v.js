(function($){
  //用delay实现动画连续
  $('#div1').velocity({
      width: '300px',
      height: '300px'
    }, {
      duration: 1000,
    });
  $('#div2').velocity({
      width: '300px'
    }, {
      duration: 1000,
      delay: 1000
    });
  
  
  
  //用complete方法使两个动画连续
    $('#div1').velocity({
      width: '300px',
      height: '300px'
    }, {
      duration: 1000,
      complete: function(){
        $('#div2').velocity({
          width: '300px'
        }, {
          duration: 1000
        });
      }
    });
  
    //定义动画序列
    /*var seq = [
    {
      elements: $('#div1'),
      properties: {width: '300px'},
      options: {duration: 1000}
    },
    {
      elements: $('#div2'),
      properties: {width: '300px'},
      options: {duration: 1000}
    },
    {
      elements: $('#div3'),
      properties: {width: '300px'},
      options: {duration: 1000}
    }];
  
    $.Velocity.RunSequence(seq);*/
  
    //使用预学定义动画
    /*$('#div1').on('mouseover', function(){
      $(this).velocity('callout.shake');
    });
  
    //自定义动画
    $.Velocity.RegisterEffect('lixin.pulse', {
      defaultDuration: 300,
      calls: [
      [{scaleX: 1.1}, 0.5],
      [{scaleX: 1.0}, 0.5]
      ]
    });
    $('#div2').on('mouseover', function(){
      $(this).velocity('lixin.pulse');
    });*/
  })(jQuery);