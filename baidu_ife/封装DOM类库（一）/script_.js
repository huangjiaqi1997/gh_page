var timer = window.requestAnimationFrame || setTimeout;
var tween = {
    startTime: 0,
    el: document.body,
    property: 'marginLeft',
    start: 0,
    end: 200,
    unit: 'px',
    duration: 1000,
    easing: function(p) {return p;},
    begin: function() {console.log('begin')},
    progress: function() {console.log('progress')},
    complete: function() {console.log('complete')}
};
var tick = function() {
    if (!tween.startTime) {
        tween.startTime = Date.now();
        tween.begin && tween.begin.call(tween.el);
    }
    var p = Math.min((Date.now() - tween.startTime) / tween.duration, 1);
    var delta = tween.end - tween.start;
    if (p < 1) {
        tween.el.style[tween.property] = tween.start + delta * tween.easing(p) + tween.unit;
        tween.progress && tween.progress.call(tween.el);
        timer(tick);
    }
    else {
        tween.el.style[tween.property] = tween.end + tween.unit;
        tween.complete && tween.complete.call(tween.el);
    }
}
// use
tick();

