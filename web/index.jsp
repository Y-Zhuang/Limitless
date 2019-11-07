<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
    <meta charset="utf-8">
    <title>Limitless</title>
    <script src="scripts/jquery.js" type="text/javascript"></script>
    <script src="scripts/jquery.animate-colors.js" type="text/javascript"></script>
    <script src="scripts/user/userUtils.js" type="text/javascript"></script>
    <script src="scripts/user/initPage.js" type="text/javascript"></script>
    <script src="scripts/user/showHide.js" type="text/javascript"></script>
    <script src="scripts/user/loginReg.js" type="text/javascript"></script>
    <script src="scripts/user/langList.js" type="text/javascript"></script>
    <script src="scripts/user/dataList.js" type="text/javascript"></script>
    <script src="scripts/user/reply.js" type="text/javascript"></script>
    <script src="scripts/user/addEssay.js" type="text/javascript"></script>
    <script src="scripts/user/myInfo.js" type="text/javascript"></script>
    <script src="scripts/user/collect.js" type="text/javascript"></script>
    <link rel="stylesheet" href="css/index.css" type="text/css"/>
    <link rel="stylesheet" href="css/scroll.css" type="text/css"/>
</head>
<body>
<!--主页面-->
<div>
    <div id="top">
        <div class="ctd">
            <p id="logo"></p>
            <a class="nav" href="#">Limitless</a>
            <div id="menu">
                <img id="hair" src="user/showUserPicture?id=-1&num=0" onError="this.src='images/avatar.png'"/>
                <p id="my" class="menuItem">我</p>
                <p id="quit" class="menuItem">退出</p>
            </div>
        </div>
    </div>

    <div id="in" class="ctd">
        <div id="langBtn">
            <a id="langLeft" href="#"></a>
            <div id="langContent">
                <div id="Posts">
                    <img id="postsHair" src="" onError="this.src='images/avatar.png'"/>
                    <p id="postsName"></p>
                </div>
                <ul id="langList">
                </ul>
            </div>
            <a id="langRight" href="#"></a>
        </div>

        <div id="list">
        </div>

        <div id="det">
            <div id="sea">
                <input type="button" id="issbtn" value="发帖"/>
                <input type="button" id="seaSa"/>
                <input type="text" id="seatext" placeholder="搜索"/>
            </div>

            <div id="primary">
                <div id="topic">
                    <div id="topUser">
                        <img id="userHair" src="" onError="this.src='images/avatar.png'"/>
                        <p id="userName"></p>
						<p id="userDate"></p>
                    </div>
                    <pre id="userText"></pre>
                </div>
                <div id="reply">
                </div>
            </div>

            <div id="input">
                <textarea id="inputText"></textarea>
                <p id="inputCollect"></p>
                <a id="inputBtn" href="#"></a>
            </div>
        </div>
    </div>

    <div id="bottom" class="ctd">

    </div>
</div>

<!--登录-->
<div id="userLogin" class="LogReg">
    <a class="close" href="#"></a>
    <div class="area">
        <p class="point">登录</p>
        <input class="nameText" type="text" id="loginName" placeholder="用户名"/><br/>
        <input class="nameText" type="password" id="loginPwd" placeholder="密码"/><br/>
        <input class="userBtn" type="button" id="loginLeft" value="登录"/>
        <input class="userBtn" type="button" id="loginRight" value="注册"/>
    </div>
</div>

<!--注册-->
<div id="userReg" class="LogReg">
    <a class="close" href="#"></a>
    <div class="area">
        <p class="point">注册</p>
        <input class="nameText" type="text" id="regName" placeholder="用户名"/><br/>
        <input class="nameText" type="password" id="regPwd" placeholder="密码"/><br/>
        <input class="nameText" type="password" id="regPwd2" placeholder="确认密码"/><br/>
        <input class="userBtn" type="button" id="regLeft" value="注册"/>
        <input class="userBtn" type="button" id="regRight" value="登录"/>
    </div>
</div>

<div id="bg"></div>

<!--发帖-->
<div id="addEssay" class="LogReg">
    <a class="close" href="#"></a>
    <p class="point">发帖</p>
    <div>
        <p id="textLang" class="essayText">板块</p>
        <input type="button" id="essayLang" value=""/>
        <p id="drop"></p>
        <p id="textTitle" class="essayText">标题</p>
        <input type="text" id="essayTitle"/>
    </div>
    <textarea id="addText"></textarea>
    <input type="button" id="UP"/>
    <ul id="langItem">
    </ul>
</div>

<!--个人信息-->
<div id="myInfo" class="LogReg">
    <a class="close" href="#"></a>
    <div id="infoPos">
        <input id="file" type="file" accept="image/*"/>
        <img id="infoHair" src="" onError="this.src='images/avatar.png'"/>
        <input type="button" id="infoUp" class="infoBtn" value="上传头像"/>
        <div id="infoUser">
            <p id="infoName"></p>
            <p id="infoLeft"></p>
            <p id="infoRight"></p>
            <div id="infoPwd">
                <a href="#" id="infoOpen" class="pwdBtn">修改密码</a><br/>
                <input class="nameText" type="password" id="oldPwd" placeholder="原密码"/><br/>
                <input class="nameText" type="password" id="newPwd" placeholder="新密码"/><br/>
                <input class="nameText" type="password" id="newPwd2" placeholder="确认新密码"/><br/>
                <a href="#" id="infoShut" class="pwdBtn">放弃修改</a>
				<div id="look">
              		<input type="button" id="lookPosts" class="lookBtn" value="T的贴子" />
             		<input type="button" id="lookCollect" class="lookBtn" value="T的收藏" />
            	</div>
            </div>
        </div>
        <input type="button" id="infoSave" class="infoBtn" value="保存修改"/>
    </div>
</div>

<!--提示框-->
<div id="myPoint">
    <p id="pointText">
        <input id="pointTrue" class="userBtn" type="button" value=""/>
        <a id="pointFalse" href="#"></a>
    </p>
</div>
</body>
</html>
