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

function judgeNull(value) {
    if (value === "") {
        return true;
    }
    return false;
}

function showUserPicture(tag, id) {
    var src = $("#hair")[0].src
    src = src.substr(src.lastIndexOf("&num=") + 5);
    var sum = Math.random();
    if (sum !== src) {
        tag.attr("src", "user/showUserPicture?id=" + id + "&num=" + sum);
    } else {
        showUserPicture(tag, id);
    }
}

function convertDateFromString(dateString) {
    if (dateString) {
        var arr1 = dateString.split(" ");
        var sdate = arr1[0].split('-');
        var date = new Date(sdate[0], sdate[1] - 1, sdate[2]);
        return date;
    }
}

function timeStamp2String(time) {
    var datetime = new Date();
    datetime.setTime(time);
    var year = datetime.getFullYear();
    var month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
    var date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
    return year + "-" + month + "-" + date;
}

function getClickId(obj) {
    var id = obj.filter(function () {
        return $(this).css("border-color") === "rgb(65, 50, 50)";
    }).data("id");
    return id;
}

function setPostsCss(postsId) {
    $("#list .item").filter(function () {
        if (postsId === -1) {
            return $(this).data("id") === $("#topic").data("id");
        } else {
            return $(this).data("id") === postsId;
        }
    }).css({"border": "3px solid #413232"});
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

function showPosts(url, data) {
    Ajax(url, data, false, function (json) {
        var list = eval("(" + json + ")");
        addItemElement(list);
    });
}

function addItemElement(list) {
    $("#list .item").remove();
    list.reverse();
    $.each(list, function (index, object) {
        var time = timeStamp2String(convertDateFromString(object.postsTime));
        $("#list").append('<div class="item" data-id="' + object.id + '">\n' +
            '                <pre class="text">' + object.postsTitle + '</pre>\n' +
            '                <p class="date">' + time + '</p>\n' +
            '                <div class="ItemBtn">\n' +
            '                    <a href="#" class="delete"></a>\n' +
            '                    <a href="#" class="edit"></a>\n' +
            '                </div>\n' +
            '            </div>');
    });
}