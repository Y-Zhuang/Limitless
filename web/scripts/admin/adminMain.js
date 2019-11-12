$(function () {
    $("#loginLeft").click(function () {
        var userName = $("#loginName").val();
        var userPicture = $("#loginPwd").val();
        if (judgeNull(userName.trim()) || judgeNull(userPicture.trim())) {
            showMyPoint("用户名与密码不许为空...", null, false, function () {
                hideMyPoint();
            });
        } else {
            // Ajax("user/loginUser", {
            //     userName: userName,
            //     userPassword: userPicture
            // }, true, function (json) {
            //     if ($.parseJSON(json) === "SUCCESS") {
            //         showMyPoint("登录成功，请稍后...", null, true, function () {
            //             hideMyPoint();
            //             divHide();
            //         });
            //     } else {
            //         showMyPoint("用户名或密码有误...", null, false, function () {
            //             hideMyPoint();
            //         });
            //     }
            // });
        }
    });

    $(document).ready(function () {
        divHide();
        $('select').niceSelect();
    });

    $("#title .titleImg").click(function () {
        switch ($(this).attr("id")) {
            case "user":
                setContent("用户管理", "block", "block");
                break;
            case "plate":
                setContent("板块管理", "block", "none");
                break;
            case "posts":
                setContent("贴子管理", "block", "block");
                break;
            case "reqly":
                setContent("评论管理", "none", "block");
                break;
            default:
                break;
        }
    });

    $("#return").click(function () {
        $("#title").show();
        $("#content").hide();
    });
});

function divHide() {
    $("#userLogin").hide();
    $("#bg").hide();
    $(".nameText").val("");
}

function setContent(contentText, save, search) {
    $("#title").hide();
    $("#content").show();
    $("#contentText").html(contentText);
    $("#contentBtn").css({"display": search});
    $("#contentSearch").css({"display": search});
    $("#contentSave").css({"display": save});
}
