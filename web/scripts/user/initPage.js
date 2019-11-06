$(function () {
    $(document).ready(function () {
        Ajax("user/getPlateAll", null, false, function (json) {
            var list = eval("(" + json + ")");
            $(".lang").remove();
            $.each(list, function (index, object) {
                $("#langList").append('<li class="lang" data-id="' + object.id + '">' + object.plateName + '</li>');
                $("#langItem").append('<li data-id="' + object.id + '">' + object.plateName + '</li>');
            });
            if (list.length <= 5) {
                $("#langLeft, #langRight").hide();
                $("#langContent").css({"marginLeft": "38px"});
            }
        });
        showPosts("user/showPosts", {plateId: $("#langList .lang").eq(0).data("id")});
        $("#langList .lang").eq(0).css({"border": "7px double #413232"});
    });
});