var menuShow = false;
$(function () {
    $("#hair").click(function (e) {
        if (menuShow) {
            return;
        }
        if ($("#menu").width() === 85) {
            menuAnimate({width: 40}, {
                borderColor: "rgba(255, 255, 255, 0)",
                backgroundColor: "rgba(255, 255, 255, 0)"
            }, 500, 30);
            menuShow = true;
        } else {
            menuAnimate({
                borderColor: "rgb(124, 124, 124)",
                backgroundColor: "rgb(240, 240, 240)"
            }, {width: 85}, 30, 500);
            menuShow = true;
        }
        e.stopPropagation();
    });

    $(document).click(function () {
        if (menuShow) {
            return;
        }
        if ($("#menu").width() === 85) {
            menuAnimate({width: 40}, {
                borderColor: "rgba(255, 255, 255, 0)",
                backgroundColor: "rgba(255, 255, 255, 0)"
            }, 500, 30);
            menuShow = true;
        }
    });
});

function menuAnimate(oneStyle, twoStyle, oneTime, twoTime) {
    $("#menu").animate(oneStyle, oneTime, function () {
        $("#menu").animate(twoStyle, twoTime, function () {
            menuShow = false;
        });
    });
}

function judgeNull(value) {
    if (value === "") {
        return true;
    }
    return false;
}

function showMyPoint(textValue, buttonValue, isClose, callback) {
    $("#myPoint").show();
    if (buttonValue != null) {
        $("#pointTrue").show();
        $("#pointTrue").val(buttonValue);
    } else {
        $("#pointTrue").hide();
        $("#pointTrue").val("");
    }
    $("#pointText").html(textValue + $("#pointText").html().substr($("#pointText").html().indexOf("<input")));

    if (isClose) {
        setTimeout(function () {
            callback(false);
        }, 1500);
    }

    $("#pointTrue").click(function () {
        callback(true);
    });

    $("#pointFalse").click(function () {
        callback(false);
    });

    $("#myPoint").mousedown(function (e) {
        e.stopPropagation();
    });
}

function hideMyPoint() {
    $("#myPoint").hide();
}

function Ajax(url, data, async, callback) {
    $.ajax({
        url: url,
        data: data,
        type: "POST",
        async: async,
        dataType: "text",
        success: function (json) {
            callback(json);
        },
        error: function () {
            showMyPoint("发现了一个异常...", null, false, function () {
                hideMyPoint();
            });
            return false;
        }
    });
}

function showUserPicture(tag, id) {
    var src = $("#hair")[0].src
    src = src.substr(src.lastIndexOf("&num=") + 5);
    var sum = Math.random();
    if (sum !== src) {
        tag.attr("src", "admin/showUserPicture?id=" + id + "&num=" + sum);
    } else {
        showUserPicture(tag, id);
    }
}

function getImgToBase64(url, callback) {
    if (url != null) {
        var canvas = document.createElement("canvas"),
            ctx = canvas.getContext("2d"),
            img = new Image;
        img.crossOrigin = "Anonymous";
        img.onload = function () {
            canvas.height = img.height;
            canvas.width = img.width;
            ctx.drawImage(img, 0, 0);
            var dataURL = canvas.toDataURL("image/png");
            callback(dataURL);
            canvas = null;
        };
        img.src = url;
    } else {
        callback(null);
    }
}

function getObjList(obj,condition,result) {
    return obj.filter(function () {
        return $(this).css(condition) === result;
    });
}