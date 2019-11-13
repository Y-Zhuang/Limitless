$(function () {
    $(".pwdEdit").click(function () {
        if ($(this).prev().prop("disabled") === true) {
            setUserEdit($(this),false,{"border-bottom": "2px solid #3e1b1b"},"url(images/adminClose.png)","#1d1717");
        } else {
            setUserEdit($(this),true,{"border": 0},"url(images/adminEdit.png)","#222222");
        }
    });

    $(".userSave").click(function () {
        console.log("asdasda");
    });
});

function setUserEdit(obj,disabled,border,image,color) {
    obj.prev().attr("disabled", disabled);
    obj.prev().css(border);
    obj.css({"background-image": image});
    obj.closest(".userList").css({"background-color": color});
}
