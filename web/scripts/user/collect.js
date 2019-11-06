$(function () {
    $("#inputCollect").click(function () {
        if ($("#topic").data("id") !== undefined && $("#topic").data("id") !== "") {
            Ajax("user/isLogin", null, true, function (json) {
                if ($.parseJSON(json) === "TRUE") {
                    Ajax("user/addCollect", {postsId: $("#topic").data("id")}, true, function (json) {
                        if ($.parseJSON(json) === "BLACK") {
                            $("#inputCollect").css({"background-image": "url(images/input_collect_not.png)"});
                            if (my) {
                                $("#list .item").filter(function () {
                                    return $(this).data("id") === $("#topic").data("id");
                                }).remove();
                            }
                        } else if ($.parseJSON(json) === "RED") {
                            $("#inputCollect").css({"background-image": "url(images/input_collect.png)"});
                            if (my) {
                                var collectScroll = $("#list").scrollTop();
                                getCollectPosts(-1);
                                $("#list").scrollTop(collectScroll);
                            }
                        }
                    });
                } else {
                    LoginRegShowHide();
                }
            });
        }
    });
});

function judgeCollectBeing(postsId) {
    Ajax("user/judgeCollectBeing", {postsId: postsId}, true, function (json) {
        if ($.parseJSON(json) === "TRUE") {
            $("#inputCollect").css({"background-image": "url(images/input_collect.png)"});
        } else {
            $("#inputCollect").css({"background-image": "url(images/input_collect_not.png)"});
        }
    });
}

function getCollectPosts(userId) {
    Ajax("user/getCollectByUserId", {userId: userId}, true, function (json) {
        var list = eval("(" + json + ")");
        var postsIdList = [];
        $.each(list, function (index, object) {
            postsIdList.push(object.postsId);
        });
        showPosts("user/getCollectPosts", $.param({"postsIdList": postsIdList}, true));
    });
}