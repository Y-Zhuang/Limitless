var replyScroll = 0;
$(function () {
    $("#inputBtn").click(function () {
        if ($("#topic").data("id") !== undefined && $("#topic").data("id") !== "") {
            Ajax("user/isLogin", null, true, function (json) {
                if ($.parseJSON(json) === "TRUE") {
                    if (judgeNull($("#inputText").val().trim())) {
                        showMyPoint("回复内容不允许为空...", null, false, function () {
                            hideMyPoint();
                        });
                    } else {
                        Ajax("user/addReply", {
                            postsId: $("#topic").data("id"),
                            replyContent: $("#inputText").val()
                        }, true, function (json) {
                            if ($.parseJSON(json) === "SUCCESS") {
                                showMyPoint("回复成功，请稍后...", null, true, function () {
                                    showReply($("#topic").data("id"));
                                    hideMyPoint();
                                });
                            } else {
                                showMyPoint("回复失败，请检查...", null, false, function () {
                                    hideMyPoint();
                                });
                            }
                        });
                    }
                } else {
                    LoginRegShowHide();
                }
            });
        }
    });

    $(document).on("click", "#reply .replyDelete", function () {
        var reply = $(this);
        showMyPoint("您确定删除吗？", "确定", false, function (res) {
            if (res) {
                hideMyPoint();
                Ajax("user/deleteReply", {id: reply.closest(".replyItem").data("id")}, true, function (json) {
                    if ($.parseJSON(json) === "SUCCESS") {
                        reply.closest(".replyItem").remove();
                    }
                });
            }
            hideMyPoint();
        });
    });

    $(document).on("click", "#reply .replyHair,#reply .replyName", function () {
        var userId = $(this).data("id");
        if (userId === undefined || userId === "") {
            userId = $(this).next().data("id");
        }
        setLoginUser(userId);
    });
});

function showReply(id) {
    Ajax("user/getReplyByPostsId", {postsId: id}, false, function (json) {
        var list = eval("(" + json + ")");
        $(".replyItem").remove();
        list.reverse();
        $("#inputText").val("");
        $.each(list, function (index, object) {
            Ajax("user/getUserById", {id: object.userId}, false, function (json) {
                var name = "";
                if ($.parseJSON(json) !== "ERROR") {
                    name = eval("(" + json + ")").name;
                }
                $("#reply").append(' <div class="replyItem" data-id="' + object.id + '">\n' +
                    '                        <div class="replyUser">\n' +
                    '                            <img class="replyHair" src="" onError="this.src=\'images/avatar.png\'" />\n' +
                    '                            <p class="replyName" data-id="' + object.userId + '">' + name + '</p>\n' +
                    '                        </div>\n' +
                    '                        <pre class="replyText">' + object.replyContent + '</pre>\n' +
                    '                        <p class="replyDate">' + object.replyTime + '</p>\n' +
                    '                        <a href="#" class="replyDelete"></a>' +
                    '                    </div>');
                showUserPicture($(".replyHair").eq(index), object.userId);
                Ajax("user/getUserById", {id: -1}, false, function (json) {
                    if (eval("(" + json + ")").id === object.userId) {
                        $(".replyDelete").eq(index).show();
                    } else {
                        $(".replyDelete").eq(index).hide();
                    }
                });
            });
        });
    });
}