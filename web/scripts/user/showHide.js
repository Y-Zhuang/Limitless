var menuShow = false;
$(function () {
    $("#hair").click(function () {
        Ajax("user/isLogin", null, true, function (json) {
            if ($.parseJSON(json) === "TRUE") {
                if (menuShow) {
                    return;
                }
                if ($("#menu").width() === 120) {
                    menuAnimate({width: 40}, {
                        borderColor: "rgba(255, 255, 255, 0)",
                        backgroundColor: "rgba(255, 255, 255, 0)"
                    }, 500, 30);
                    menuShow = true;
                } else {
                    menuAnimate({
                        borderColor: "rgb(124, 124, 124)",
                        backgroundColor: "rgb(240, 240, 240)"
                    }, {width: 120}, 30, 500);
                    menuShow = true;
                }
            } else {
                LoginRegShowHide();
            }
        });
    });

    $("#issbtn").click(function () {
        Ajax("user/isLogin", null, true, function (json) {
            if ($.parseJSON(json) === "TRUE") {
                if ($("#addEssay").is(":hidden")) {
                    $("#addEssay").show();
                } else {
                    $("#addEssay").hide();
                }
                textClear();
                $("#langItem").hide();
                $("#seatext").val("");
                langItemStyle("images/drop.png", "-15px", false);
                menuAnimate({width: 40}, {
                    borderColor: "rgba(255, 255, 255, 0)",
                    backgroundColor: "rgba(255, 255, 255, 0)"
                }, 500, 30);
                menuShow = true;
            } else {
                LoginRegShowHide();
            }
        });
    });

    $("#quit").click(function () {
        Ajax("user/quitLogin", null, false, function (json) {
            showMyPoint("已退出，感谢您的使用...", null, true, function () {
                hideMyPoint();
            });
            showUserPicture($("#hair"), -1);
            menuAnimate({width: 40}, {
                borderColor: "rgba(255, 255, 255, 0)",
                backgroundColor: "rgba(255, 255, 255, 0)"
            }, 500, 30);
            menuShow = true;
            $("#langList").show();
            $("#langRight").show();
            $("#Posts").hide();
            isPosts = false;
            $("#postsHair").attr("src", "");
            $("#postsName").html("");
            $("#seatext").val("");
            $("#addEssay").hide();
            $("#langItem").hide();
            langItemStyle("images/drop.png", "-15px", false);
            showPosts("user/showPosts", {plateId: $("#langList .lang").eq(0).data("id")});
            $("#langList .lang").eq(0).css({"border": "7px double #413232"});
            setPostsCss(-1);
            if($("#topic").data("id") != undefined && $("#topic").data("id") != ""){
                showReply($("#topic").data("id"));
                $("#inputCollect").css({"background-image": "url(images/input_collect_not.png)"});
            }
        });
    });

    $(document).mousedown(function () {
        $(document).mousedown(function () {
            divHide();
        });
    });

    $("#menu,.LogReg,#issbtn,#bg,#inputBtn").mousedown(function (e) {
        e.stopPropagation();
    });

    $("#loginRight").click(function () {
        $("#userLogin").hide();
        $("#userReg").show();
        textClear();
    });

    $("#regRight").click(function () {
        $("#userLogin").show();
        $("#userReg").hide();
        textClear();
    });

    $(".close").click(function () {
        divHide();
    });
});

function textClear() {
    $(".nameText").val("");
    $("#essayTitle").val("");
    $("#addText").val("");
    $("#essayLang").val("");
    $("#essayLang").data("id", "");
    $("#addEssay .point").html("发帖");
}

function divHide() {
    $("#userLogin").hide();
    $("#userReg").hide();
    $("#addEssay").hide();
    $("#bg").hide();
    textClear();
    if (menuShow) {
        return;
    }
    if ($("#menu").width() === 120) {
        menuAnimate({width: 40}, {
            borderColor: "rgba(255, 255, 255, 0)",
            backgroundColor: "rgba(255, 255, 255, 0)"
        }, 500, 30);
        menuShow = true;
    }
}

function menuAnimate(oneStyle, twoStyle, oneTime, twoTime) {
    $("#menu").animate(oneStyle, oneTime, function () {
        $("#menu").animate(twoStyle, twoTime, function () {
            menuShow = false;
        });
    });
}

function LoginRegShowHide() {
    if ($("#userLogin").is(":hidden") && $("#userReg").is(":hidden")) {
        $("#userLogin").show();
    } else {
        $("#userLogin").hide();
        $("#userReg").hide();
    }
}