$element.velocity({
    width: "500px",
    property2: value2
}, {
    duration: 400,
    easing: "swing",
    queue: "",
    begin: undefined,
    progress: undefined,
    complete: undefined,
    display: undefined,
    visibility: undefined,
    loop: false,
    delay: false,
    mobileHA: true
});

$element.velocity({ top: 50 }, 1000, function() { alert("Hi"); });