var isPosts = false;
var count = 0;
var wight = 109;
var sum;
var plateId;
var postsId;
var plateScroll = 0;
var my = false;
$(function () {
    $("#langLeft").click(function () {
        sum = $("#langList .lang").size();
        if (!isPosts) {
            if (count !== -(sum - 5) && sum > 5) {
                count--;
                ulSlide();
            }
        } else {
            $("#langList").show();
            $("#langRight").show();
            $("#Posts").hide();
            $("#list .ItemBtn").hide();
            isPosts = false;
            my = false;
            $("#postsHair").attr("src", "");
            $("#postsName").html("");
            $("#seatext").val("");
            showPosts("user/showPosts", {plateId: plateId});
            if (postsId !== undefined && postsId !== "") {
                showContent(postsId);
                setPostsCss(-1);
                $("#list").scrollTop(plateScroll);
                $("#reply").scrollTop(replyScroll);
            } else {
                setPostsCss($("#topic").data("id"));
            }
        }
    });

    $("#langRight").click(function () {
        sum = $("#langList .lang").size();
        if (count !== 0) {
            count++;
            ulSlide();
        }
    });

    $(document).on("click", "#langList .lang", function () {
        showPosts("user/showPosts", {plateId: $(this).data("id")});
        $("#langList .lang").css({"border": "7px double #414141"});
        $(this).css({"border": "7px double #413232"});
        setPostsCss(-1);
    });

    $("#seaSa").click(function () {
        if (judgeNull($("#seatext").val().trim())) {
            showMyPoint("搜索内容不许为空...", null, false, function () {
                hideMyPoint();
            });
        } else {
            Ajax("user/searchPosts", {searchText: $("#seatext").val()}, true, function (json) {
                var list = eval("(" + json + ")");
                setHead();
                $("#postsHair").hide();
                $("#postsName").html("与&nbsp;&nbsp;" + $("#seatext").val() + "&nbsp;&nbsp;相关的贴子");
                $("#postsName").css({"padding-left": 0});
                addItemElement(list);
            })
        }
    });
});

function ulSlide() {
    $("#langList").stop(true, false).animate({marginLeft: parseInt(count * wight)}, 300);
}

function setHead() {
    if (!isPosts) {
        plateScroll = $("#list").scrollTop();
        replyScroll = $("#reply").scrollTop();
    }
    plateId = getClickId($("#langList .lang"));
    $("#langList").hide();
    $("#langRight").hide();
    $("#Posts").show();
    $("#postsHair").show();
    $("#postsName").css({"padding-left": 62});
    isPosts = true;
    $("#addEssay").hide();
    textClear();
    $("#langItem").hide();
    langItemStyle("images/drop.png", "-15px", false);
    menuAnimate({width: 40}, {
        borderColor: "rgba(255, 255, 255, 0)",
        backgroundColor: "rgba(255, 255, 255, 0)"
    }, 500, 30);
    menuShow = true;
    hideMyInfo();
}

function setUser(userId, operating) {
    setHead();
    $("#seatext").val("");
    $("#postsHair").attr("src", $("#infoHair")[0].src);
    if (operating === "posts") {
        $("#postsName").html($("#infoName").html() + "&nbsp;&nbsp;的贴子");
        showPosts("user/getUserPosts", {userId: userId});
        if (my) {
            $("#list .ItemBtn").show();
        }
    } else if (operating === "collect") {
        $("#postsName").html($("#infoName").html() + "&nbsp;&nbsp;的收藏");
        getCollectPosts(userId);
    }
}