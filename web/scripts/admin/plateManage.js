var isOperating = false;
var isLongClick = false;
$(function () {
    var timeout;
    $(document).on("click", ".plateEdit", function (e) {
        if (!isLongClick) {
            if ($(this).prev().prop("disabled") === true) {
                //编辑状态
                if (!isOperating) {
                    setPlateEdit($(this), false, {"border-bottom": "2px solid #3e1b1b"}, "url(images/adminClose.png)", "#567470");
                    setPlateUpdate($(this), true, 0);
                    if ($("#plateAddItem").css("display") !== "none") {
                        setPlateAdd("none");
                    }
                }
            } else {
                //非编辑状态
                if (isOperating) {
                    setPlateEdit($(this), true, {"border": "0px"}, "url(images/adminEdit.png)", "#445956");
                    setPlateUpdate($(this), false, 9);
                }
            }
            e.stopPropagation();
        } else {
            //删除状态
            if ($(this).closest(".plateItem").css("border-color") === "rgb(170, 0, 0)") {
                console.log("删除");
                e.stopPropagation();
            }
        }
    });

    $(document).on("click", ".plateUpdate", function (e) {
        console.log("保存");
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

    $("#plateAddClose").click(function () {
        setPlateAdd("none");
    });

    $(".plateItem").mousedown(function () {
        var plate = $(this);
        if (!isLongClick) {
            timeout = setTimeout(function () {
                setPlateEdit($(".plateItem").children(".plateEdit"), true, {"border": "0px"}, "url(images/adminEdit.png)", "#445956");
                setPlateUpdate($(".plateItem").children(".plateEdit"), false, 9);
                setPlateDelete(plate, true, "url(images/adminDelete.png)", "2px solid #aa0000");
                if ($("#plateAddItem").css("display") !== "none") {
                    setPlateAdd("none");
                }
            }, 1200);
        }
    });

    $(".plateItem").mouseup(function () {
        clearTimeout(timeout);
    });

    $(".plateItem").mouseout(function () {
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
        obj.closest(".plateItem").next().next().css({"margin-left": 31});
    } else {
        $(".plateUpdate").remove();
        obj.closest(".plateItem").next().css({"margin-left": 50});
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
}
