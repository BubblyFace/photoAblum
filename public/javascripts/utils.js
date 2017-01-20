(function($) {
    $.sendRequest = function(inf, sc, ec) {
        var url = inf.url || '/';
        var type = inf.type || 'GET';
        var data = inf.data || '';
        $.ajax({
            url: url,
            type: type,
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            data: data,
            timeout: 10000,
            dataType: 'json',
            success: function(json) {
                sc(json);
            },
            error: function(e) {
                ec(e);
            }
        })
    }



    //将表单数据json化
    $.getFormJson = function(form) {
        var o = {};
        var a = $(form).serializeArray();
        $.each(a, function() {
            if (o[this.name] !== undefined) {
                if (!o[this.name].push) {
                    //嵌套化处理
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    }
})(jQuery)
