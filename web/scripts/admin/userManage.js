$(function () {
    $(document).on("click",".pwdEdit",function () {
        if ($(this).prev().prop("disabled") === true) {
            setUserEdit($(this), false, {"border-bottom": "2px solid #3e1b1b"}, "url(images/adminClose.png)", "#1d1717");
        } else {
            setUserEdit($(this), true, {"border": 0}, "url(images/adminEdit.png)", "#222222");
        }
    });

    $(".userSave").click(function () {
        console.log("asdasda");
    });
});

function setUserEdit(obj, disabled, border, image, color) {
    obj.prev().attr("disabled", disabled);
    obj.prev().css(border);
    obj.css({"background-image": image});
    obj.closest(".userList").css({"background-color": color});
}

function setUserContent() {
    $("#userContent").show();
    Ajax("admin/getUserAll", null, false, function (json) {
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
    })
}