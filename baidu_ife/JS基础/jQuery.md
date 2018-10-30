#jQuery
##选择器
E F  E>F  E~F  E+F
[attr][attr="val"][attr~="val"][attr^="val"][attr$="val"][attr*="val"][attr|="val"]
E:link visited hover active focus empty checked selected enabled disabled target
E:not(s)
E:root
E:first/last-child
E:only-child
E:nth-child(1)
E:first/last-of-type
E:nth-of-type(1)

E::before after
E::first-letter
E::first-line
新增
:first
:last
:even
:odd
:eq(1)
:gt(3)
:lt(3)
:header
:animated
:contains()
:hidden
:visivble
:focus
:has()
:parent
[attr!=value]
:input :text :password :radio :checkbox 
:submit :reset :button :image :file
$(s1, s2, s3)



get()
index()
data()


##DOM操作

###节点内容操作
text
html
val
attr
prop
removeAttr
removeProp

###节点操作
after
before
append
appendTo
prepend
prependTo
insertAfter
insertBefore
empty
remove
wrap
wrapAll
replaecWith
replaceAll
detach
clone

###样式操作
addClass/removeClass/toggleClass
css
width/innerWidth/outerWidth/scrollTop/offset
posiiton

###遍历
parent/parents/parentsUntil/offsetParent
children
siblings/next/prev/nextAll/nextUntill
first/last/eq


filter() not() is()
hasClass()
map() each()
has()
slice()
find()
add()
contents()
end()




##动画
###显示隐藏
show
hide
toggle

###淡入淡出
fadeIn
fadeOut
fadeToggle
fadeTo

###滑上滑下
slideDown
slideUp
slideToggle

###动画animate
animate
stop
stopAll
delay
finish

---

##事件
###页面载入
ready(fn)

###事件处理
on/off/one
trigger/triggerHandler

###事件切换
hover
toggle

###事件类型
click/dbclick
mouseenter/mouseover/mousemove/mouseleave/mousedown/mouseup
hover/focus/blur/change/select/submit
scroll

###事件对象
target/type/data/pageX
preventDefault()
stopPropagation()

---

$.inArray()
$.isArray()
$.isFunction()
$.each()
$.extend()
$.grep()
$.map()
$.merge()
$.proxy()
$.contains()
$.type()
$.trim()
$.param()
$.parseJSON
$.fn.extend()
$.extend()
$.noConflict()


Ajax
load(URL, data, callback)
[responseTxt, statusTxt, xhr]
get(URL, callback)
post(URL, data, callback)
[data, status]


