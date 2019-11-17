$(function () {
    $(document).on("click", ".option", function () {
        if ($(this).data("value") !== $(this).parents(".nice-select").prevAll(".postsPlatePoint").data("id")) {
            $(this).parents(".nice-select").next().show();
        } else {
            $(this).parents(".nice-select").next().hide();
        }
    });

    $(document).on("click", ".postsExpand", function () {
        var obj = $(this);
        if (obj.closest(".postsHeader").next().css("display") === "none") {
            obj.closest(".postsHeader").next().slideDown(300, function () {
                obj.closest(".postsHeader").next().show();
            });
        } else {
            obj.closest(".postsHeader").next().slideUp(300, function () {
                obj.closest(".postsHeader").next().hide();
            });
        }
    });

    $("#contentSave").click(function () {
        if (content === "posts") {
            var postsList = [];
            var objList = getObjList($(".postsUpdate"), "display", "block");
            $.each(objList, function (index, object) {
                postsList.push({"id": $(object).parents(".postsItem").data("id"), "plateId": $(object).prev().children(".list").children(".selected").data("value")});
            });
            if (postsList.length !== 0) {
                Ajax("admin/updatePostsList", {"postsList": JSON.stringify(postsList)}, true, function (json) {
                    if ($.parseJSON(json) === "SUCCESS") {
                        showMyPoint("保存成功...", null, true, function () {
                            $.each(objList,function (index, object) {
                                $(object).prevAll(".postsPlatePoint").data("id", postsList[index].plateId);
                                $(object).hide();
                                console.log($(object).prevAll(".postsPlatePoint").data("id"));
                            });
                            hideMyPoint();
                        });
                    } else {
                        showMyPoint("保存失败...", null, true, function () {
                            hideMyPoint();
                        });
                    }
                });
            }
        }
    });

    $("#contentBtn").click(function () {
        if (content === "posts") {
            var searchText = $("#contentSearch").val();
            if (judgeNull(searchText.trim())) {
                showPostsContent("admin/gatPostsAll", null);
            } else {
                showPostsContent("admin/searchPosts", {searchText: searchText});
            }
        }
    });

    $(document).on("click", ".postsUpdate", function () {
        var obj = $(this);
        var plateId = obj.prev().children(".list").children(".selected").data("value");
        Ajax("admin/updatePosts", {id: obj.closest(".postsItem").data("id"), plateId: plateId}, true, function (json) {
            if ($.parseJSON(json) === "SUCCESS") {
                showMyPoint("保存成功...", null, true, function () {
                    obj.prevAll(".postsPlatePoint").data("id", plateId);
                    obj.hide();
                    console.log(obj.prevAll(".postsPlatePoint").data("id"));
                    hideMyPoint();
                });
            } else {
                showMyPoint("保存失败...", null, true, function () {
                    hideMyPoint();
                });
            }
        });
    });

    $(document).on("click", ".postsDelete", function () {
        var obj = $(this);
        showMyPoint("您确定删除吗？", "确定", false, function (res) {
            if (res) {
                Ajax("admin/deleteAdminCollect", {postsId: obj.parents(".postsItem").data("id")}, true, function (json) {
                    if ($.parseJSON(json) === "SUCCESS") {
                        Ajax("admin/deleteAdminReply", {postsId: obj.parents(".postsItem").data("id")}, true, function (json) {
                            if ($.parseJSON(json) === "SUCCESS") {
                                Ajax("admin/deletePosts", {id: obj.parents(".postsItem").data("id")}, true, function (json) {
                                    if ($.parseJSON(json) === "SUCCESS") {
                                        showMyPoint("删除成功...", null, true, function () {
                                            obj.parents(".postsItem").remove();
                                            hideMyPoint();
                                        });
                                    } else {
                                        showMyPoint("删除失败..", null, true, function () {
                                            hideMyPoint();
                                        });
                                    }
                                });
                            } else {
                                showMyPoint("删除失败...", null, true, function () {
                                    hideMyPoint();
                                });
                            }
                        });
                    } else {
                        showMyPoint("删除失败...", null, true, function () {
                            hideMyPoint();
                        });
                    }
                });
            }
            hideMyPoint();
        });
    })

});

function showPostsContent(url, data) {
    $("#postsContent").show();
    Ajax(url, data, true, function (json) {
        var list = eval("(" + json + ")");
        $("#postsContent .postsItem").remove();
        Ajax("admin/getPlateAll", null, true, function (json) {
            var plate = '<select>';
            var plateList = eval("(" + json + ")");
            $.each(plateList, function (index, object) {
                plate += '<option value="' + object.id + '">' + object.plateName + '</option>'
            });
            plate += '</select>';
            $.each(list, function (index, object) {
                Ajax("admin/getUserNameById", {id: object.userId}, false, function (json) {
                    $("#postsContent").append('<div class="postsItem" data-id="' + object.id + '">\n' +
                        '                    <div class="postsHeader">\n' +
                        '                        <P class="postsUserName">发贴人：' + eval("(" + json + ")") + '</P>\n' +
                        '                        <P class="postsPlatePoint" data-id="' + object.plateId + '">所属板块：</P>\n' + plate +
                        '                        <a class="postsUpdate"></a>\n' +
                        '                        <P class="postsTime">发帖时间：' + object.postsTime + '</P>\n' +
                        '                        <a class="postsExpand"></a>\n' +
                        '                        <a class="postsDelete"></a>\n' +
                        '                        <pre class="postsTitle">标题：' + object.postsTitle + '</pre>\n' +
                        '                    </div>\n' +
                        '                    <pre class="postsText">贴子内容：' + object.postsContent + '</pre>\n' +
                        '                </div>');
                    $("select").eq(index).val(object.plateId);
                    $("select").niceSelect();
                });
            });
        });
    });
}