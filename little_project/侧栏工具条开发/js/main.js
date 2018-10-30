/**
 * Created by asus on 2017/6/4.
 */
requirejs.config({
    paths: {
        jquery: 'jquery-3.2.1'
    }
});

requirejs(['jquery', 'backtop'], function ($, backtop) {
   /* new backtop.BackTop( $('#backTop'), {mode: 'move', pos: '200'});*/


    $('#backTop').backtop({
            mode: 'move',
            pos : 300,
            dest: 100,
            speed: 2000
    });
});



