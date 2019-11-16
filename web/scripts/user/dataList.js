var myPostsScroll = 0;
var myReplyScroll = 0;
$(function () {
    $(document).on("click", "#list .delete", function (e) {
        var item = $(this);
        var postsId = item.closest(".item").data("id");
        showMyPoint("您确定删除吗？", "确定", false, function (res) {
            if (res) {
                myPostsScroll = $("#list").scrollTop();
                Ajax("user/deleteReplyAll", {postsId: postsId}, false, function (json) {
                    if ($.parseJSON(json) === "SUCCESS") {
                        Ajax("user/deleteCollect", {postsId: postsId}, false, function (json) {
                            if ($.parseJSON(json) === "SUCCESS") {
                                Ajax("user/deletePosts", {id: postsId}, true, function (json) {
                                    if ($.parseJSON(json) === "ERROR") {
                                        showMyPoint("删除失败，请重试...", null, true, function () {
                                            hideMyPoint();
                                        });
                                    } else {
                                        item.closest(".item").remove();
                                        $("#list").scrollTop(myPostsScroll);
                                        if (postsId === $("#topic").data("id")) {
                                            initTopic();
                                        }
                                    }
                                });
                            }else {
                                showMyPoint("删除失败，请重试...", null, true, function () {
                                    hideMyPoint();
                                });
                            }
                        });
                    } else {
                        showMyPoint("删除失败，请重试...", null, true, function () {
                            hideMyPoint();
                        });
                    }
                });
            }
            hideMyPoint();
        });
        e.stopPropagation();
    });

    $(document).on("click", "#list .edit", function (e) {
        isEdit = true;
        myPostsScroll = $("#list").scrollTop();
        myReplyScroll = $("#reply").scrollTop();
        Ajax("user/getPostsById", {id: $(this).closest(".item").data("id")}, true, function (json) {
            var entity = eval("(" + json + ")");
            $("#bg").show();
            $("#addEssay").show();
            $("#addEssay .point").html("编辑");
            $("#essayTitle").val(entity.postsTitle);
            $("#addText").val(entity.postsContent);
            $("#UP").data("id", entity.id);
            Ajax("user/getPlateById", {id: entity.plateId}, true, function (json) {
                $("#essayLang").data("id", entity.plateId);
                $("#essayLang").val($.parseJSON(json));
            });
        });
        e.stopPropagation();
    })

    $(document).on("click", "#list .item", function () {
        showContent($(this).data("id"));
        $("#list .item").css({"border": "3px solid #414141"});
        $(this).css({"border": "3px solid #413232"});
        if (!isPosts) {
            postsId = $(this).data("id");
        }
    });

    $("#userHair,#userName").click(function () {
        setLoginUser($("#userName").data("id"));
    });
});

function showContent(id) {
    Ajax("user/getPostsById", {id: id}, false, function (json) {
        var entity = eval("(" + json + ")");
        $("#topic").data("id", entity.id);
        $("#userText").html(entity.postsContent);
        $("#userDate").html(entity.postsTime.substr(entity.postsTime.indexOf("-") + 1));
        $("#inputText").val("");
        $("#userHair").show();
        showUserPicture($("#userHair"), entity.userId);
        showReply(entity.id);
        Ajax("user/getUserById", {id: entity.userId}, true, function (json) {
            $("#userName").html(eval("(" + json + ")").name);
            $("#userName").data("id", eval("(" + json + ")").id);
            Ajax("user/isLogin", null, true, function (json) {
                if ($.parseJSON(json) === "TRUE") {
                    judgeCollectBeing(entity.id);
                }
            });
        });
    });
}

function initTopic() {
    $("#topic").data("id", "");
    $("#userText").html("");
    $("#userDate").html("");
    $("#inputText").val("");
    $("#userName").html("");
    $("#userHair").hide();
    $(".replyItem").remove();
    $("#inputCollect").css({"background-image": "url(images/input_collect_not.png)"});
}