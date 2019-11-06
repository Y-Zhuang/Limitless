var pwdBtnAnimate = false;
var isModify = false;
var hairImage = null;
$(function () {
    $("#my").click(function () {
        menuAnimate({width: 40}, {
            borderColor: "rgba(255, 255, 255, 0)",
            backgroundColor: "rgba(255, 255, 255, 0)"
        }, 500, 30);
        menuShow = true;
        $("#addEssay").hide();
        textClear();
        $("#langItem").hide();
        langItemStyle("images/drop.png", "-15px", false);
        setInfo("inline-block", "我");
        showInfo(-1);
        my = true;
    });

    $("#infoUp").click(function () {
        $("#file").trigger("click");
        $("#file").change(function () {
            hairImage = URL.createObjectURL($(this)[0].files[0]);
            $("#infoHair").attr("src", hairImage);
            isModify = true;
            $("#infoSave").css({"color": "#aa0000"});
        });
    });

    $("#infoOpen").click(function () {
        if (pwdBtnAnimate) {
            return;
        }
        if ($("#infoLeft").css("marginRight") === "15px" && $("#infoRight").css("marginLeft") === "15px") {
            pwdBtnAnimate = true;
            switchAnimate(150, "none", "inline-block");
            isModify = true;
            $("#infoSave").css({"color": "#aa0000"});
        }
    });

    $("#infoShut").click(function () {
        if (pwdBtnAnimate) {
            return;
        }
        if ($("#infoLeft").css("marginRight") === "150px" && $("#infoRight").css("marginLeft") === "150px") {
            pwdBtnAnimate = true;
            switchAnimate(15, "inline-block", "none");
            $("#infoPwd .nameText").val("");
            isModify = false;
            $("#infoSave").css({"color": "#969696"});
        }
    });

    $("#infoSave").click(function () {
        getImgToBase64(hairImage, function (base) {
            var data = {id: $("#infoSave").data("id"), userPicture: base};
            if ($("#infoLeft").css("marginRight") === "150px" && $("#infoRight").css("marginLeft") === "150px") {
                if (judgeNull($("#oldPwd").val().trim())) {
                    showMyPoint("原密码不许为空...", null, false, function () {
                        hideMyPoint();
                    });
                } else if (judgeNull($("#newPwd").val().trim())) {
                    showMyPoint("新密码不许为空...", null, false, function () {
                        hideMyPoint();
                    });
                } else if (judgeNull($("#newPwd2").val().trim())) {
                    showMyPoint("请确认密码...", null, false, function () {
                        hideMyPoint();
                    });
                } else if ($("#newPwd").val().trim() !== $("#newPwd2").val().trim()) {
                    showMyPoint("密码不相同，请检查...", null, false, function () {
                        hideMyPoint();
                    });
                } else {
                    $.extend(data, {userPassword: $("#newPwd").val(), oldPassword: $("#oldPwd").val()});
                }
            }
            if (data["userPicture"] != null || (data["userPassword"] != null && data["oldPassword"] != null)) {
                Ajax("user/updateUser", data, true, function (json) {
                    if ($.parseJSON(json) === "FALSE") {
                        showMyPoint("原密码不正确，请重新输入...", null, false, function () {
                            hideMyPoint();
                        });
                    } else if ($.parseJSON(json) === "SUCCESS") {
                        showMyPoint("保存成功...", null, true, function () {
                            isModify = false;
                            hideMyInfo();
                            $("#bg").show();
                            $("#myInfo").show();
                            showUserPicture($("#hair"), -1);
                            var id = $("#topic").data("id");
                            if (id !== undefined && id !== "") {
                                showContent(id);
                            }
                            hideMyPoint();
                        });
                    } else {
                        showMyPoint("保存失败...", null, false, function () {
                            hideMyPoint();
                        });
                    }
                });
            }
        });
    });

    $("#myInfo .close").click(function () {
        if (isModify) {
            showMyPoint("未保存，确定退出？", "确定", false, function (res) {
                if (res) {
                    hideMyInfo();
                    isModify = false;
                }
                hideMyPoint();
            });
        } else {
            hideMyInfo();
        }
    });

    $("#lookPosts").click(function () {
        setUser($("#infoSave").data("id"), "posts");
    });

    $("#lookCollect").click(function () {
        setUser($("#infoSave").data("id"), "collect");
    });
});

function switchAnimate(marginValue, openValue, displayValue) {
    $("#infoOpen").css({"display": openValue});
    if (displayValue === "inline-block") {
        $("#infoLeft").animate({marginRight: marginValue}, 400, function () {
            hiddendisplay(displayValue);
        });
        $(".lookBtn").css({"display": openValue});
    } else {
        $("#infoLeft").animate({marginRight: marginValue}, 400, function () {
            $(".lookBtn").css({"display": openValue});
        });
        hiddendisplay(displayValue);
    }
    $("#infoRight").animate({marginLeft: marginValue}, 400, function () {
        pwdBtnAnimate = false;
    });
}

function hiddendisplay(displayValue) {
    $("#infoPwd .nameText").css({"display": displayValue});
    $("#infoShut").css({"display": displayValue});
}

function hideMyInfo() {
    $("#myInfo").hide();
    $("#bg").hide();
    $("#infoOpen").css({"display": "inline-block"});
    $("#infoLeft").css({"margin-right": "15px"});
    $("#infoRight").css({"margin-left": "15px"});
    $(".lookBtn").css({"display": "inline-block"});
    $("#infoPwd .nameText").val("");
    $("#infoShut").val("");
    $("#infoSave").css({"color": "#969696"});
    hiddendisplay("none");
}

function showInfo(id) {
    $("#bg").show();
    $("#myInfo").show();
    Ajax("user/getUserById", {id: id}, true, function (json) {
        $("#infoName").html(eval("(" + json + ")").name);
        showUserPicture($("#infoHair"), eval("(" + json + ")").id);
        $("#infoSave").data("id", eval("(" + json + ")").id);
    });
}

function setInfo(display, btnVal) {
    var look = 50;
    var infoUser = "80px auto";
    if (display === "inline-block") {
        look = -20;
        infoUser = "40px auto";
    }
    $(".infoBtn").css({"display": display});
    $("#infoOpen").css({"display": display});
    $("#infoLeft").css({"display": display});
    $("#infoRight").css({"display": display});
    $("#look").css({"margin-top": look});
    $("#infoUser").css({"margin": infoUser});
    $("#lookPosts").val(btnVal + "的贴子");
    $("#lookCollect").val(btnVal + "的收藏");
}

function setLoginUser(id) {
    Ajax("user/getUserById", {id: -1}, false, function (json) {
        if (eval("(" + json + ")").id === id) {
            setInfo("inline-block", "我");
            my = true;
        } else {
            setInfo("none", "T");
            my = false;
        }
        showInfo(id);
    });
}