$(function () {
    $(document).on("click", ".option", function () {
        if ($(this).data("value") !== $(this).parents(".nice-select").prev().prev().data("id")) {
            $(this).parents(".nice-select").next().show();
        }
        else {
            $(this).parents(".nice-select").next().hide();
        }
    });

    

});

function showPostsContent(url, data) {
    $("#postsContent").show();
    Ajax(url, data, true, function (json) {
        var list = eval("(" + json + ")");
        $("#postsContent .postsItem").remove();
        Ajax("admin/getPlateAll", null, true, function (json) {
            var plate = '<select>';
            var plateList = eval("(" + json + ")");
            $.each(plateList, function (index, object) {
                plate += '<option value="' + object.id + '">' + object.plateName + '</option>'
            });
            plate += '</select>';
            $.each(list, function (index, object) {
                Ajax("admin/getUserNameById", {id: object.userId}, false, function (json) {
                    $("#postsContent").append('<div class="postsItem" data-id="' + object.id + '">\n' +
                        '                    <div class="postsHeader">\n' +
                        '                        <P class="postsUserName">发贴人：' + eval("(" + json + ")") + '</P>\n' +
                        '                        <P class="postsPlatePoint" data-id="' + object.plateId + '">所属板块：</P>\n' + plate +
                        '                        <a class="postsUpdate"></a>\n' +
                        '                        <P class="postsTime">发帖时间：' + object.postsTime + '</P>\n' +
                        '                        <a class="postsExpand"></a>\n' +
                        '                        <a class="postsDelete"></a>\n' +
                        '                        <pre class="postsTitle">标题：' + object.postsTitle + '</pre>\n' +
                        '                    </div>\n' +
                        '                    <pre class="postsText">贴子内容：' + object.postsContent + '</pre>\n' +
                        '                </div>');
                    setSelected(object.plateId);
                    $('select').niceSelect();
                });
            });
        });

    });
}

function setSelected(value) {
    $("option").filter(function () {
        return $(this).attr("value") == value;
    }).attr("selected", "selected");
}