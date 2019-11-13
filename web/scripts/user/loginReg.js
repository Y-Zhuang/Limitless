$(function () {
    $("#loginLeft").click(function () {
        var userName = $("#loginName").val();
        var userPassword = $("#loginPwd").val();
        replyScroll = $("#reply").scrollTop();
        if (judgeNull(userName.trim()) || judgeNull(userPassword.trim())) {
            showMyPoint("用户名与密码不许为空...", null, false, function () {
                hideMyPoint();
            });
        } else {
            Ajax("user/loginUser", {
                userName: userName,
                userPassword: userPassword
            }, true, function (json) {
                if ($.parseJSON(json) === "SUCCESS") {
                    showMyPoint("登录成功，请稍后...", null, true, function () {
                        hideMyPoint();
                        divHide();
                        showUserPicture($("#hair"),-1);
                        var id = $("#topic").data("id");
                        if(id != undefined && id !== ""){
                            showReply(id);
                            judgeCollectBeing(id);
                            $("#reply").scrollTop(replyScroll);
                        }
                    });
                } else {
                    showMyPoint("用户名或密码有误...", null, false, function () {
                        hideMyPoint();
                    });
                }
            });
        }
    });

    $("#regLeft").click(function () {
        var userName = $("#regName").val();
        var userPassword = $("#regPwd").val();
        var userPassword2 = $("#regPwd2").val();
        if (judgeNull(userName.trim()) || judgeNull(userPassword.trim())) {
            showMyPoint("用户名与密码不许为空...", null, false, function () {
                hideMyPoint();
            });
        } else if (userPassword.trim() !== userPassword2.trim() && !judgeNull(userPassword2.trim())) {
            showMyPoint("密码不相同，请检查...", null, false, function () {
                hideMyPoint();
            });
        } else if (judgeNull(userPassword2.trim())) {
            showMyPoint("请确认密码...", null, false, function () {
                hideMyPoint();
            });
        } else {
            Ajax("user/isNameBeing", {userName: userName}, true, function (json) {
                if ($.parseJSON(json) === "TRUE") {
                    showMyPoint("用户名已被使用，请修改...", null, false, function () {
                        hideMyPoint();
                    });
                } else {
                    getImgToBase64("images/avatar.png", function (data) {
                        Ajax("user/regUser", {
                            userName: userName,
                            userPassword: userPassword,
                            userPicture: data
                        }, true, function (json) {
                            if ($.parseJSON(json) === "SUCCESS") {
                                showMyPoint("注册成功，请登录...", null, false, function () {
                                    hideMyPoint();
                                });
                            } else {
                                showMyPoint("注册失败，请重试...", null, false, function () {
                                    hideMyPoint();
                                });
                            }
                        });
                    });
                }
            });
        }
    });
});
