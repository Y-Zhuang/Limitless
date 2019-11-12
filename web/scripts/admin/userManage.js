$(function () {
    $(".pwdEdit").click(function () {
        if ($(this).prev().prop("disabled") == true) {
            $(this).prev().attr("disabled", false);
            $(this).prev().css({"border-bottom": "2px solid #3e1b1b"});
            $(this).css({"background-image": "url(images/adminClose.png)"});
            $(this).closest(".userlist").css({"background-color": "#1d1717"});
        } else {
            $(this).prev().attr("disabled", true);
            $(this).prev().css({"border": 0});
            $(this).css({"background-image": "url(images/adminEdit.png)"});
            $(this).closest(".userlist").css({"background-color": "#222222"});
        }
    });

    $(".userSave").click(function () {
        console.log("asdasda");
    });
})
