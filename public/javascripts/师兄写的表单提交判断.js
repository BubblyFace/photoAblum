(function($) {
    $.fn.validateForm = function() {
        var inputs = $(this).find("input");
        for (var i = 0; i < inputs.length; i++) {
            if ($(inputs[i]).attr("required") == "required" && $(inputs[i]).val() == "")
                return false;
        }
        var selects = $(this).find("select");
        for (var i = 0; i < selects.length; i++) {
            if ($(selects[i]).attr("required") == "required" && $(selects[i]).val() == "")
                return false;
        }
        return true;
    }
})(jQuery);