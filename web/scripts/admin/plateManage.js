var isOperating = false;
var isLongClick = false;
var plateScroll = 0;
$(function () {
    var timeout;
    $(document).on("click", ".plateEdit", function (e) {
        if (!isLongClick) {
            if ($(this).prev().prop("disabled") === true) {
                //编辑状态
                if (!isOperating && $("#plateAddItem").css("display") === "none") {
                    setPlateEdit($(this), false, {"border-bottom": "2px solid #3e1b1b"}, "url(images/adminClose.png)", "#567470");
                    setPlateUpdate($(this), true, 0);
                    if ($("#plateAddItem").css("display") !== "none") {
                        setPlateAdd("none");
                    }
                }
            } else {
                //非编辑状态
                if (isOperating && $("#plateAddItem").css("display") === "none") {
                    setPlateEdit($(this), true, {"border": "0px"}, "url(images/adminEdit.png)", "#445956");
                    setPlateUpdate($(this), false, 9);
                }
            }
            e.stopPropagation();
        } else {
            //删除状态
            if ($(this).closest(".plateItem").css("border-color") === "rgb(170, 0, 0)") {
                var obj = $(this);
                showMyPoint("您确定删除吗？", "确定", false, function (res) {
                    if (res) {
                        Ajax("admin/getPostsByPlateId", {plateId: obj.closest(".plateItem").data("id")}, true, function (json) {
                            var list = eval("(" + json + ")");
                            var del = false;
                            $.each(list, function (index, object) {
                                Ajax("admin/deleteAdminCollect", {postsId: object}, false, function (json) {
                                    if ($.parseJSON(json) === "SUCCESS") {
                                        Ajax("admin/deleteAdminReply", {postsId: object}, false, function (json) {
                                            if ($.parseJSON(json) === "SUCCESS") {
                                                del = true;
                                            } else {
                                                showMyPoint("删除失败...", null, true, function () {
                                                    hideMyPoint();
                                                });
                                                del = false;
                                            }
                                        })
                                    } else {
                                        showMyPoint("删除失败...", null, true, function () {
                                            hideMyPoint();
                                        });
                                        del = false;
                                    }
                                });
                            });
                            if (del) {
                                Ajax("admin/deleteAdminPosts", {plateId: obj.closest(".plateItem").data("id")}, true, function (json) {
                                    if ($.parseJSON(json) === "SUCCESS") {
                                        Ajax("admin/deletePlate", {id: obj.closest(".plateItem").data("id")}, true, function (json) {
                                            if ($.parseJSON(json) === "SUCCESS") {
                                                showMyPoint("删除成功..", null, true, function () {
                                                    hideMyPoint();
                                                    obj.closest(".plateItem").remove();
                                                });
                                            } else {
                                                showMyPoint("删除失败...", null, true, function () {
                                                    hideMyPoint();
                                                });
                                            }
                                        })
                                    } else {
                                        showMyPoint("删除失败...", null, true, function () {
                                            hideMyPoint();
                                        });
                                    }
                                });
                            }
                        });
                    }
                    hideMyPoint();
                });
                e.stopPropagation();
            }
        }
    });

    $(document).on("click", ".plateUpdate", function (e) {
        var obj = $(this);
        if (judgeNull(obj.prev().children(".plateText").val().trim())) {
            showMyPoint("板块名不许为空...", null, false, function () {
                hideMyPoint();
            });
        } else {
            Ajax("admin/updatePlate", {
                id: obj.prev().data("id"),
                plateName: obj.prev().children(".plateText").val()
            }, true, function (json) {
                if ($.parseJSON(json) === "SUCCESS") {
                    showMyPoint("保存成功...", null, true, function () {
                        setPlateEdit(obj.prev().children(".plateEdit"), true, {"border": "0px"}, "url(images/adminEdit.png)", "#445956");
                        setPlateUpdate(obj.prev().children(".plateEdit"), false, 9);
                        hideMyPoint();
                    });
                } else {
                    showMyPoint("保存失败...", null, true, function () {
                        hideMyPoint();
                    });
                }
            })
        }
        e.stopPropagation();
    });

    $(document).on("click", ".plateItem", function (e) {
        if ($(this).css("border-color") === "rgb(170, 0, 0)") {
            e.stopPropagation();
        }
    });

    $(document).click(function () {
        if (!isOperating) {
            setPlateDelete($(".plateItem"), false, "url(images/adminEdit.png)", "2px solid #3e1b1b");
        }
    });

    $(document).on("click", "#plateShow", function () {
        setPlateAdd("inline-block");
    });

    $("#plateAdd").click(function () {
        var plateName = $("#plateAddText").val();
        if (judgeNull(plateName.trim())) {
            showMyPoint("板块名不许为空...", null, false, function () {
                hideMyPoint();
            });
        } else {
            Ajax("admin/addPlate", {plateName: plateName}, true, function (json) {
                if ($.parseJSON(json) === "SUCCESS") {
                    showMyPoint("添加成功...", null, true, function () {
                        plateScroll = $("#plateContent").scrollTop();
                        showPlateContent();
                        setPlateAdd("none");
                        hideMyPoint();
                    });
                } else {
                    showMyPoint("添加失败...", null, true, function () {
                        hideMyPoint();
                    });
                }
            })
        }
    });

    $("#plateAddClose").click(function () {
        setPlateAdd("none");
    });

    $(document).on("mousedown", ".plateItem", function (e) {
        var plate = $(this);
        if (!isLongClick) {
            timeout = setTimeout(function () {
                setPlateEdit($(".plateEdit"), true, {"border": "0px"}, "url(images/adminEdit.png)", "#445956");
                setPlateUpdate($(".plateEdit"), false, 9);
                setPlateDelete(plate, true, "url(images/adminDelete.png)", "2px solid #aa0000");
                if ($("#plateAddItem").css("display") !== "none") {
                    setPlateAdd("none");
                }
            }, 1200);
        }
    });

    $(document).on("mouseup", ".plateItem", function () {
        clearTimeout(timeout);
    });

    $(document).on("mouseout", ".plateItem", function () {
        clearTimeout(timeout);
    });
});

function setPlateEdit(obj, disabled, border, image, color) {
    obj.prev().attr("disabled", disabled);
    obj.prev().css(border);
    obj.css({"background-image": image});
    obj.closest(".plateItem").css({"background-color": color});
    isOperating = !disabled;
}

function setPlateUpdate(obj, isUpdate, right) {
    if (isUpdate) {
        obj.closest(".plateItem").after('<a class="plateUpdate"></a>');
        if(obj.closest(".plateItem").index() % 7 !== 0){
            obj.closest(".plateItem").next().next().css({"margin-left": 30});
        }
    } else {
        $(".plateUpdate").remove();
        if(obj.closest(".plateItem").index() % 7 !== 0){
            obj.closest(".plateItem").next().css({"margin-left": 49});
        }
    }
    obj.closest(".plateItem").css({"margin-right": right});
}

function setPlateDelete(obj, isDelete, url, border) {
    obj.children(".plateEdit").css({"background-image": url});
    obj.css({"border": border});
    isLongClick = isDelete;
}

function setPlateAdd(display) {
    if (display === "inline-block") {
        $("#plateShow").remove();
    } else {
        $("#plateAddItem").before('<a id="plateShow"></a>');
    }
    $("#plateAddItem").css({"display": display});
    $("#plateAdd").css({"display": display});
    $("#plateAddText").val("");
}

function showPlateContent() {
    $("#plateContent").show();
    Ajax("admin/getPlateAll", null, true, function (json) {
        var list = eval("(" + json + ")");
        setPlateUpdate($(".plateEdit"), false, 9);
        isOperating = false;
        list.reverse();
        $("#plateContent .plateItem").remove();
        $.each(list, function (index, object) {
            $("#out").after('<div class="plateItem" data-id="' + object.id + '">\n' +
                '                 <input class="plateText" type="text" value="' + object.plateName + '" disabled="true"/>\n' +
                '                 <a class="plateEdit"></a>\n' +
                '            </div>');
        });
        $("#plateContent").scrollTop(plateScroll);
    })
}
