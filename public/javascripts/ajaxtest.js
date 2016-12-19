$(".ajax").find('botton').on('click','ajaxPost')
function ajaxPost() {
    ajax({
        type: "POST",
        url: "/1"
        data: { data: 1 }
    }).suc(function(msg) {
        alert(msg.text)
    }).fail(function(jqXHR, textStatus) {
        alert('shibai:' + textStatus)
    })
}

