var userScroll = 0;
$(function () {
    $(document).on("click", ".pwdEdit", function () {
        if ($(this).prev().prop("disabled") === true) {
            setUserEdit($(this), false, {"border-bottom": "2px solid #3e1b1b"}, "url(images/adminClose.png)", "#1d1717", "");
        } else {
            setUserEdit($(this), true, {"border": 0}, "url(images/adminEdit.png)", "#222222", "*******");
        }
    });

    $("#contentSave").click(function () {
        if (content === "user") {
            var userList = [];
            $.each(getObjList($(".userList"), "background-color", "rgb(29, 23, 23)"), function (index, object) {
                var userPassword = $(object).children(".userPwdText").val();
                if (judgeNull(userPassword.trim())) {
                    showMyPoint("密码不许为空...", null, false, function () {
                        hideMyPoint();
                    });
                    userList = [];
                    return false;
                } else {
                    userList.push({"id": $(object).data("id"), "userPassword": userPassword});
                }
            });
            if (userList.length !== 0) {
                editUser("admin/updateUserList", {"userList": JSON.stringify(userList)}, $(".userSave"));
            }
        }
    });

    $("#contentBtn").click(function () {
        if (content === "user") {
            var searchText = $("#contentSearch").val();
            if (judgeNull(searchText.trim())) {
                showUserContent("admin/getUserAll", null);
            } else {
                showUserContent("admin/searchUser", {searchText: searchText});
            }
        }
    });

    $(document).on("click", ".userSave", function () {
        if ($(this).prevAll(".userPwdText").prop("disabled") === false) {
            var obj = $(this);
            var userPwdText = obj.prevAll(".userPwdText").val();
            if (judgeNull(userPwdText.trim())) {
                showMyPoint("密码不许为空...", null, false, function () {
                    hideMyPoint();
                });
            } else {
                editUser("admin/updateUser", {
                    id: obj.closest(".userList").data("id"),
                    userPassword: userPwdText
                }, $(this));
            }
        }
    });

    $(document).on("click", ".userDelete", function () {
        var obj = $(this);
        showMyPoint("您确定删除吗？", "确定", false, function (res) {
            if (res) {
                Ajax("admin/deleteAdminCollect", {userId: obj.closest(".userList").data("id")}, true, function (json) {
                    if ($.parseJSON(json) === "SUCCESS") {
                        Ajax("admin/deleteAdminReply", {userId: obj.closest(".userList").data("id")}, true, function (json) {
                            if ($.parseJSON(json) === "SUCCESS") {
                                Ajax("admin/deleteAdminPosts", {userId: obj.closest(".userList").data("id")}, true, function (json) {
                                    if ($.parseJSON(json) === "SUCCESS") {
                                        Ajax("admin/deleteUser", {id: obj.closest(".userList").data("id")}, true, function (json) {
                                            if ($.parseJSON(json) === "SUCCESS") {
                                                showMyPoint("删除成功...", null, true, function () {
                                                    obj.closest(".userList").remove();
                                                    hideMyPoint();
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
                                })
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
            hideMyPoint();
        });
    });

    $("#userAdd").click(function () {
        var newName = $("#newName").val();
        var newPassword = $("#newPwd").val();
        if (judgeNull(newName.trim()) || judgeNull(newPassword.trim())) {
            showMyPoint("用户名与密码不许为空...", null, false, function () {
                hideMyPoint();
            });
        } else {
            Ajax("user/isNameBeing", {userName: newName}, true, function (json) {
                if ($.parseJSON(json) === "TRUE") {
                    showMyPoint("用户名已被使用，请修改...", null, false, function () {
                        hideMyPoint();
                    });
                } else {
                    getImgToBase64("images/avatar.png", function (data) {
                        Ajax("user/regUser", {
                            userName: newName,
                            userPassword: newPassword,
                            userPicture: data
                        }, true, function (json) {
                            if ($.parseJSON(json) === "SUCCESS") {
                                showMyPoint("添加成功...", null, true, function () {
                                    userScroll = $("#userBody").scrollTop();
                                    showUserContent("admin/getUserAll", null);
                                    $("#newName").val("");
                                    $("#newPwd").val("");
                                    hideMyPoint();
                                });
                            } else {
                                showMyPoint("添加失败...", null, true, function () {
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

function setUserEdit(obj, disabled, border, image, color, val) {
    obj.prev().val(val);
    obj.prev().attr("disabled", disabled);
    obj.prev().css(border);
    obj.css({"background-image": image});
    obj.closest(".userList").css({"background-color": color});
}

function showUserContent(url, data) {
    $("#userContent").show();
    Ajax(url, data, false, function (json) {
        var list = eval("(" + json + ")");
        $("#userBody .userList").remove();
        $.each(list, function (index, object) {
            $("#userBody").append('<div class="userList" data-id="' + object.id + '">\n' +
                '                        <img class="userPicture" src="" onError="this.src=\'images/avatar.png\'"/>\n' +
                '                        <P class="userText">用户名：' + object.userName + '</P>\n' +
                '                        <P class="userPwd">密码：</P>\n' +
                '                        <input class="userPwdText" type="text" value="*******" disabled="true"/>\n' +
                '                        <a class="pwdEdit"></a>\n' +
                '                        <a class="userDelete"></a>\n' +
                '                        <a class="userSave"></a>\n' +
                '                    </div>');
            showUserPicture($(".userPicture").eq(index), object.id);
        });
    });
    $("#userBody").scrollTop(userScroll);
}

function editUser(url, data, obj) {
    Ajax(url, data, false, function (json) {
        if ($.parseJSON(json) === "SUCCESS") {
            showMyPoint("修改成功...", null, true, function () {
                setUserEdit(obj.prevAll(".pwdEdit"), true, {"border": 0}, "url(images/adminEdit.png)", "#222222", "*******");
                hideMyPoint();
            });
        } else {
            showMyPoint("修改失败...", null, true, function () {
                hideMyPoint();
            });
        }
    });
}