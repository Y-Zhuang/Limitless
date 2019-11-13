$(function () {
    $("#loginLeft").click(function () {
        var adminName = $("#loginName").val();
        var adminPassword = $("#loginPwd").val();
        if (judgeNull(adminName.trim()) || judgeNull(adminPassword.trim())) {
            showMyPoint("用户名与密码不许为空...", null, false, function () {
                hideMyPoint();
            });
        } else {
            Ajax("admin/loginAdmin", {
                adminName: adminName,
                adminPassword: adminPassword
            }, true, function (json) {
                if ($.parseJSON(json) === "SUCCESS") {
                    showMyPoint("登录成功，请稍后...", null, true, function () {
                        hideMyPoint();
                        setLogin("none");
                    });
                } else {
                    showMyPoint("用户名或密码有误...", null, false, function () {
                        hideMyPoint();
                    });
                }
            });
        }
    });

    $("#quit").click(function () {
        Ajax("admin/quitLoginAdmin", null, false, function (json) {
            showMyPoint("已退出，感谢您的使用...", null, true, function () {
                hideMyPoint();
                $("#title").show();
                $("#content").hide();
                setLogin("block");
            });
        });
    });
    
    $(document).ready(function () {
        setLogin("none");
        $('select').niceSelect();
        Ajax("admin/isLoginAdmin", null, true, function (json) {
            if ($.parseJSON(json) === "FALSE") {
                setLogin("block");
            }
        });
    });

    $("#title .titleImg").click(function () {
        switch ($(this).attr("id")) {
            case "user":
                setContent("用户管理", "block", "block");
                setUserContent();
                break;
            case "plate":
                setContent("板块管理", "block", "none");
                break;
            case "posts":
                setContent("贴子管理", "block", "block");
                break;
            case "reply":
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

function setLogin(display) {
    $("#userLogin").css({"display":display});
    $("#bg").css({"display":display});
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