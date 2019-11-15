<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
    <meta charset="utf-8">
    <title>Limitless_Admin</title>
    <script src="scripts/jquery.js" type="text/javascript"></script>
    <script src="scripts/jquery.animate-colors.js" type="text/javascript"></script>
    <script src="scripts/jquery.nice-select.js" type="text/javascript"></script>
    <script src="scripts/admin/adminUtils.js" type="text/javascript"></script>
    <script src="scripts/admin/adminMain.js" type="text/javascript"></script>
    <script src="scripts/admin/userManage.js" type="text/javascript"></script>
    <script src="scripts/admin/plateManage.js" type="text/javascript"></script>
    <script src="scripts/admin/postsManage.js" type="text/javascript"></script>
    <link rel="stylesheet" href="css/nice-select.css" type="text/css"/>
    <link rel="stylesheet" href="css/admin.css" type="text/css"/>
    <link rel="stylesheet" href="css/scroll.css" type="text/css"/>
</head>
<body>
<!--主页面-->
<div>
    <div id="top">
        <div class="ctd">
            <p id="logo"></p>
            <a class="nav" href="#">Limitless_Admin</a>
            <div id="menu">
                <img id="hair" src="images/avatar.png"/>
                <p id="quit" class="menuItem">退出</p>
            </div>
        </div>
    </div>

    <div id="title">
        <a id="user" class="titleImg"></a>
        <a id="plate" class="titleImg"></a>
        <a id="posts" class="titleImg"></a>
        <a id="reply" class="titleImg"></a>
    </div>

    <div id="content">
        <div id="contentHeader">
            <a id="return"></a>
            <p id="contentText"></p>
            <input id="contentBtn" type="button"/>
            <input id="contentSearch" type="text" placeholder="搜索" value=""/>
            <input id="contentSave" type="button" value="全部保存"/>
        </div>
        <div id="contentBody">
            <!--用户管理-->
            <div id="userContent">
                <div id="userBody">
                </div>
                <div id="userBottom">
                    <img class="userPicture" src="images/avatar.png" onError="this.src='images/avatar.png'"/>
                    <P class="userNameText">用户名：</P>
                    <input id="newName" class="userPwdText" type="text" placeholder="请输入用户名"/>
                    <P class="userNewText">密码：</P>
                    <input id="newPwd" class="userPwdText" type="text" placeholder="请输入密码"/>
                    <a id="userAdd"></a>
                </div>
            </div>
            <!--板块管理-->
            <div id="plateContent" class="contentStyle">
                <p id="out">长按选择删除</p>
                <a id="plateShow"></a>
                <div id="plateAddItem">
                    <input id="plateAddText" type="text"/>
                    <a id="plateAddClose"></a>
                </div>
                <a id="plateAdd"></a>
            </div>
            <!--贴子管理-->
            <div id="postsContent" class="contentStyle">
                <div class="postsItem">
                    <div class="postsHeader">
                        <P class="postsUserName">发贴人：阿三打撒</P>
                        <P class="postsPlatePoint">所属板块：</P>
                        <select>
                            <option value="1">javascript</option>
                            <option value="2">JAVA</option>
                            <option value="3">阿萨的</option>
                            <option value="4">11111</option>
                            <option value="5">11111</option>
                            <option value="11111">11111</option>
                            <option value="11111">11111</option>
                            <option value="11111">11111</option>
                            <option value="11111">11111</option>
                            <option value="11111">11111</option>
                            <option value="11111">11111</option>
                            <option value="11111">11111</option>
                        </select>
                        <a class="postsUpdate"></a>
                        <P class="postsTime">发帖时间：2019-5-5 20:50</P>
                        <a class="postsExpand"></a>
                        <a class="postsDelete"></a>
                        <pre class="postsTitle">标题：豆腐干大范甘迪豆腐干豆腐干豆腐干豆腐干豆腐干地方豆腐干豆腐干地方鬼地方鬼地方豆腐干地方豆腐干地方DDSGSFGDFGDFGFDGDdfgdfgdfgdfgdfgdfgdfgdfgdfgdf上的梵蒂冈地方官地方官豆腐干豆腐干豆腐干豆腐干豆腐干豆腐干豆腐干地方的风格gdfgdfgdf</pre>
                    </div>
                    <pre class="postsText">贴子内容：付款就更好的口感较好的疯狂过后的法兰克独立开发工具打卡练腹肌快递费dlfkgjdflkgjdfklgjdkl付款就更好的口感较好的疯狂过后的法兰克独立开发工具打卡练腹肌快递费dlfkgjdflkgjdfklgjdklfjgkdlfjgdkfjjgdklfjgdlkfjgdlfkgjdlkjfkgldj;flkgdjf;k来的客人法国军队联发科机构两块豆腐价格独立开发工具电流反馈给就电流反馈给酱豆腐立刻结果领导反馈感觉到了来到了；的法律高科技fjgkdlfjgdkfjjgdklfjgdlkfjgdlfkgjdlkjfkgldj;flkgdjf;k来的客人法国军队联发科机构两块豆腐价格独立开发工具电流反馈给就付款就更好的口感较好的疯狂过后的法兰克独立开发工具打卡练腹肌快递费dlfkgjdflkgjdfklgjdklfjgkdlfjgdkfjjgdklfjgdlkfjgdlfkgjdlkjfk付款就更好的口感较好的疯狂过后的法兰克独立开发工具打卡练腹肌快递费dlfkgjdflkgjdfklgjdklfjgkdlfjgdkfjjgdklfjgdlkfjgdlfkgjdlkjfkgldj;flkgdjf;k来的客人法国军队联发科机构两块豆腐价格独立开发工具电流反馈给就电流反馈给酱豆腐立刻结果领导反馈感觉到了来到了；的法律高科技gldj;flkgdjf;k来的客人法国军队联发科机构两块豆腐价格独立开发工具电流反馈给就电流反馈给酱付款就更好的口感较好的疯狂过后的法兰克独立开发工具打卡练腹肌快递费dlfkgjdflkgjdfklgjdklfjgkdlfjgdkfjjgdklfjgdlkfjgdlfkgjdlkjfkgldj;flkgdjf;k来的客人法国军队联发科机构两块豆腐价格独立开发工具电流反馈给就电流反馈给酱豆腐立刻结果领导反馈感觉到了来到了；的法律高科技豆腐立刻结果领导反馈感觉到了来到了；的法律高科技电流反馈给酱豆腐立刻结果领导反馈感觉到了来到了；的法律高科技</pre>
                </div>
            </div>
            <!--评论管理-->
            <div id="replyContent" class="contentStyle">
                <div class="replyItem">
                    <div class="replyHeader">
                        <P class="replyUserName">评论人：阿三打撒</P>
                        <P class="replyTime">评论时间：2019-5-5 20:50</P>
                        <a class="replyExpand"></a>
                        <a class="replyDelete"></a>
                        <pre class="replyTitle">贴子标题：豆腐干大范甘迪豆腐干豆腐干豆腐干豆腐干豆腐干地方豆腐干豆腐干地方鬼地方鬼地方豆腐干地方豆腐干地方DDSGSFGDFGDFGFDGDdfgdfgdfgdfgdfgdfgdfgdfgdfgdf上的梵蒂冈地方官地方官豆腐干豆腐干豆腐干豆腐干豆腐干豆腐干豆腐干地方的风格gdfgdfgdf</pre>
                    </div>
                    <pre class="replyText">评论内容：付款就更好的口感较好的疯狂过后的法兰克独立开发工具打卡练腹肌快递费dlfkgjdflkgjdfklgjdkl付款就更好的口感较好的疯狂过后的法兰克独立开发工具打卡练腹肌快递费dlfkgjdflkgjdfklgjdklfjgkdlfjgdkfjjgdklfjgdlkfjgdlfkgjdlkjfkgldj;flkgdjf;k来的客人法国军队联发科机构两块豆腐价格独立开发工具电流反馈给就电流反馈给酱豆腐立刻结果领导反馈感觉到了来到了；的法律高科技fjgkdlfjgdkfjjgdklfjgdlkfjgdlfkgjdlkjfkgldj;flkgdjf;k来的客人法国军队联发科机构两块豆腐价格独立开发工具电流反馈给就付款就更好的口感较好的疯狂过后的法兰克独立开发工具打卡练腹肌快递费dlfkgjdflkgjdfklgjdklfjgkdlfjgdkfjjgdklfjgdlkfjgdlfkgjdlkjfk付款就更好的口感较好的疯狂过后的法兰克独立开发工具打卡练腹肌快递费dlfkgjdflkgjdfklgjdklfjgkdlfjgdkfjjgdklfjgdlkfjgdlfkgjdlkjfkgldj;flkgdjf;k来的客人法国军队联发科机构两块豆腐价格独立开发工具电流反馈给就电流反馈给酱豆腐立刻结果领导反馈感觉到了来到了；的法律高科技gldj;flkgdjf;k来的客人法国军队联发科机构两块豆腐价格独立开发工具电流反馈给就电流反馈给酱付款就更好的口感较好的疯狂过后的法兰克独立开发工具打卡练腹肌快递费dlfkgjdflkgjdfklgjdklfjgkdlfjgdkfjjgdklfjgdlkfjgdlfkgjdlkjfkgldj;flkgdjf;k来的客人法国军队联发科机构两块豆腐价格独立开发工具电流反馈给就电流反馈给酱豆腐立刻结果领导反馈感觉到了来到了；的法律高科技豆腐立刻结果领导反馈感觉到了来到了；的法律高科技电流反馈给酱豆腐立刻结果领导反馈感觉到了来到了；的法律高科技</pre>
                </div>
            </div>
        </div>
    </div>
</div>

<div id="bg"></div>

<!--登录-->
<div id="userLogin">
    <p id="point">管理员登录</p>
    <input class="nameText" type="text" id="loginName" placeholder="用户名"/><br/>
    <input class="nameText" type="password" id="loginPwd" placeholder="密码"/><br/>
    <input type="button" class="userBtn" id="loginLeft" value="登录"/>
</div>

<!--提示框-->
<div id="myPoint">
    <p id="pointText">
        <input id="pointTrue" class="userBtn" type="button" value="确定"/>
        <a id="pointFalse" href="#"></a>
    </p>
</div>
</body>
</html>
