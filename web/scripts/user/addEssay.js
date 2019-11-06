var isEdit = false;
$(function () {
    $("#essayLang").click(function () {
        if ($("#langItem").is(":hidden")) {
            $("#langItem").show();
            langItemStyle("images/drop_click.png", "-20px", true);
        } else {
            $("#langItem").hide();
            langItemStyle("images/drop.png", "-15px", false);
        }
    });

    $(document).on("click", "#langItem li", function () {
        $("#drop").css({"background-image": "url(images/drop.png)", "margin-left": "-15px"});
        $("#essayLang").val($(this).text());
        $("#essayLang").data("id", $(this).data("id"));
        $("#langItem").hide();
        $("#essayTitle").attr("disabled", false);
        $("#addText").attr("disabled", false);
        $("#UP").attr("disabled", false);
    });

    $("#UP").click(function () {
        if (isEdit) {
            upClick("user/updatePosts", {
                id: $(this).data("id"),
                plateId: $("#essayLang").data("id"),
                postsTitle: $("#essayTitle").val(),
                postsContent: $("#addText").val()
            }, "修改成功...", "修改失败，请重试...");
            isEdit = false;
        } else {
            upClick("user/addPosts", {
                plateId: $("#essayLang").data("id"),
                postsTitle: $("#essayTitle").val(),
                postsContent: $("#addText").val()
            }, "发贴成功...", "发贴失败，请重试...");
        }
    });
});

function langItemStyle(imageUrl, marginValue, disabledValue) {
    $("#drop").css({"background-image": "url(" + imageUrl + ")", "margin-left": marginValue});
    $("#essayTitle").attr("disabled", disabledValue);
    $("#addText").attr("disabled", disabledValue);
    $("#UP").attr("disabled", disabledValue);
}

function upClick(url, data, success, error) {
    if (judgeNull($("#essayLang").val().trim())) {
        showMyPoint("请选择板块...", null, false, function () {
            hideMyPoint();
        });
    } else if (judgeNull(data.postsTitle.trim())) {
        showMyPoint("标题不可为空，请检查...", null, false, function () {
            hideMyPoint();
        });
    } else if (judgeNull(data.postsContent.trim())) {
        showMyPoint("内容不可为空，请检查...", null, false, function () {
            hideMyPoint();
        });
    } else {
        Ajax(url, data, false, function (json) {
            if ($.parseJSON(json) === "SUCCESS") {
                showMyPoint(success, null, true, function () {
                    hideMyPoint();
                    if (isPosts) {
                        showPosts("user/getUserPosts", {userId: -1});
                        $("#list").scrollTop(myPostsScroll);
                        $("#list .ItemBtn").show();
                        setPostsCss(-1);
                        if ($("#UP").data("id") === getClickId($("#list .item")) && getClickId($("#list .item")) != null) {
                            showContent($("#UP").data("id"));
                            $("#reply").scrollTop(myReplyScroll);
                        }
                    } else {
                        var id = getClickId($("#langList .lang"));
                        if (id === $("#essayLang").data("id")) {
                            showPosts("user/showPosts", {plateId: id});
                            setPostsCss(-1);
                        }
                    }
                    $("#addEssay").hide();
                    $("#bg").hide();
                });
            } else {
                showMyPoint(error, null, false, function () {
                    hideMyPoint();
                });
            }
        });
    }
}