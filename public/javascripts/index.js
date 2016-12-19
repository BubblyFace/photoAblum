$(document).ready(function() {
    $('div.sidebarhover').hover(function() {
        $('div.sidebar').velocity("stop").velocity({
            width: 150
        }, 300);
        $('.testMargin').velocity("stop").velocity({
            marginLeft: parseInt($('.testMargin').css('marginLeft')) - 150
        }, 300)
    }, function() {
        $('div.sidebar').velocity("stop").velocity({
            width: 0
        }, 300)
        $('.testMargin').velocity("stop").velocity({
            marginLeft:(parseInt($(".row-1").css("width"))/12*2)
        })
    })
    $('div.row-1>div').hover(function() {
        $(this).velocity('stop').velocity({
            backgroundColor: "#ff0000",
            backgroundColorAlpha: 0.5,
        }, 300)
    }, function() {
        $(this).velocity('stop').velocity({
            backgroundColorAlpha: 0
        })
    })
})
