$(function () {
    $(document).on("click", ".replyExpand", function () {
        var obj = $(this);
        if (obj.closest(".replyHeader").next().css("display") === "none") {
            obj.closest(".replyHeader").next().slideDown(300, function () {
                obj.closest(".replyHeader").next().show();
            });
        } else {
            obj.closest(".replyHeader").next().slideUp(300, function () {
                obj.closest(".replyHeader").next().hide();
            });
        }
    });

    $("#contentBtn").click(function () {
        if (content === "reply") {
            var searchText = $("#contentSearch").val();
            if (judgeNull(searchText.trim())) {
                showReplyContent("admin/getReplyAll",null);
            } else {
                showReplyContent("admin/searchReply", {searchText: searchText});
            }
        }
    });

    $(document).on("click", ".replyDelete", function () {
        var obj = $(this);
        showMyPoint("您确定删除吗？", "确定", false, function (res) {
            if (res) {
                Ajax("admin/deleteReply", {id: obj.parents(".replyItem").data("id")}, true, function (json) {
                    if ($.parseJSON(json) === "SUCCESS") {
                        showMyPoint("删除成功...", null, true, function () {
                            obj.parents(".replyItem").remove();
                            hideMyPoint();
                        });
                    } else {
                        showMyPoint("删除失败..", null, true, function () {
                            hideMyPoint();
                        });
                    }
                });
            }
            hideMyPoint();
        });
    });
});

function showReplyContent(url, data) {
    $("#replyContent").show();
    Ajax(url, data, true, function (json) {
        var list = eval("(" + json + ")");
        $("#replyContent .replyItem").remove();
        $.each(list, function (index, object) {
            Ajax("admin/getUserNameById", {id: object.userId}, false, function (name) {
                Ajax("admin/getPostsTitleById", {id: object.postsId}, false, function (title) {
                    $("#replyContent").append('<div class="replyItem" data-id="' + object.id + '">\n' +
                        '                    <div class="replyHeader">\n' +
                        '                        <P class="replyUserName">评论人：' + eval("(" + name + ")") + '</P>\n' +
                        '                        <P class="replyTime">评论时间：' + object.replyTime + '</P>\n' +
                        '                        <a class="replyExpand"></a>\n' +
                        '                        <a class="replyDelete"></a>\n' +
                        '                        <pre class="replyTitle">贴子标题：' + eval("(" + title + ")") + '</pre>\n' +
                        '                    </div>\n' +
                        '                    <pre class="replyText">评论内容：' + object.replyContent + '</pre>\n' +
                        '                </div>');
                });
            })
        });
    });
}