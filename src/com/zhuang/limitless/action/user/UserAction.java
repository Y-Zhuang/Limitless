package com.zhuang.limitless.action.user;

import com.opensymphony.xwork2.ActionSupport;
import com.zhuang.limitless.entity.User;
import com.zhuang.limitless.service.UserService;
import com.zhuang.limitless.util.LimitlessUtil;
import com.zhuang.limitless.util.MD5Util;
import org.apache.struts2.ServletActionContext;
import org.apache.struts2.convention.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import sun.misc.BASE64Decoder;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.HashMap;
import java.util.Map;


@Controller
@ParentPackage(value = "json-default")
@Results({
        @Result(name = "RESPONSE", type = "json", params = {"root", "Root"}),
        @Result(name = "USERMAP", type = "json", params = {"root", "userInfo"}),
        @Result(name = "PICTURE", type = "stream", params = {"contentType", "image/ jpeg,image/bmp ,image/png,image/ gif,image/jpeg ,image/pjpeg"})
})
public class UserAction extends ActionSupport {

    @Autowired
    private UserService userService;
    private Integer id;
    private String userName;
    private String userPassword;
    private String oldPassword;
    private String userPicture;
    private String Root;
    private Map<String, Object> userInfo = new HashMap<String, Object>();
    private HttpServletResponse response;
    private ServletOutputStream stream;

    public void setId(Integer id) {
        this.id = id;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public void setUserPassword(String userPassword) {
        this.userPassword = userPassword;
    }

    public void setOldPassword(String oldPassword) {
        this.oldPassword = oldPassword;
    }

    public void setUserPicture(String userPicture) {
        this.userPicture = userPicture;
    }

    public String getRoot() {
        return Root;
    }

    public Map<String, Object> getUserInfo() {
        return userInfo;
    }

    public HttpServletResponse getRequest() {
        return response;
    }

    public void setRequest(HttpServletResponse request) {
        this.response = request;
    }

    public ServletOutputStream getStream() {
        return stream;
    }

    public void setStream(ServletOutputStream stream) {
        this.stream = stream;
    }

    @Action(value = "loginUser")
    public String loginUser() {
        Root = "ERROR";
        if (userService.loginUser(userName, userPassword)) {
            LimitlessUtil.setLoginUser(userService.getUserByName(userName));
            Root = "SUCCESS";
        }
        return "RESPONSE";
    }

    @Action(value = "regUser")
    public String regUser() {
        Root = "ERROR";
        try {
            if (userService.regUser(userName, userPassword, new BASE64Decoder().decodeBuffer(userPicture.replace("data:image/png;base64,", "")))) {
                Root = "SUCCESS";
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return "RESPONSE";
    }

    @Action(value = "showUserPicture")
    public String showUserPicture() {
        User user;
        if (id == -1) {
            user = LimitlessUtil.getLoginUser();
        } else {
            user = userService.getUserById(id);
        }
        if (user.getUserPicture() != null) {
            byte[] bytes = user.getUserPicture();
            response = ServletActionContext.getResponse();
            response.setContentType("image/jpeg");
            try {
                stream = this.response.getOutputStream();
                stream.write(bytes, 0, bytes.length);
                stream.flush();
                stream.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return "PICTURE";
    }

    @Action(value = "updateUser")
    public String updateUser() {
        Root = "ERROR";
        User user = LimitlessUtil.getLoginUser();
        try {
            if (user != null && user.getId().equals(id)) {
                if (userPassword != null && oldPassword != null) {
                    if (user.getUserPassword().equals(MD5Util.MD5(oldPassword))) {
                        user.setUserPassword(MD5Util.MD5(userPassword));
                        if (!userPicture.equals("")) {
                            user.setUserPicture(new BASE64Decoder().decodeBuffer(userPicture.replace("data:image/png;base64,", "")));
                        }
                        if (userService.updateUser(user.getId(), user.getUserName(), user.getUserPassword(), user.getUserPicture())) {
                            LimitlessUtil.setLoginUser(userService.getUserById(user.getId()));
                            Root = "SUCCESS";
                        }
                    } else {
                        Root = "FALSE";
                    }
                } else {
                    if (userService.updateUser(user.getId(), user.getUserName(), user.getUserPassword(), new BASE64Decoder().decodeBuffer(userPicture.replace("data:image/png;base64,", "")))) {
                        LimitlessUtil.setLoginUser(userService.getUserById(user.getId()));
                        Root = "SUCCESS";
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "RESPONSE";
    }

    @Action(value = "isLogin")
    public String isLogin() {
        Root = "FALSE";
        if (LimitlessUtil.getLoginUser() != null) {
            Root = "TRUE";
        }
        return "RESPONSE";
    }

    @Action(value = "quitLogin")
    public String quitLogin() {
        LimitlessUtil.removeLoginUser();
        return "RESPONSE";
    }

    @Action(value = "isNameBeing")
    public String isNameBeing() {
        Root = "FALSE";
        if (userService.judgeNameBeing(userName)) {
            Root = "TRUE";
        }
        return "RESPONSE";
    }

    @Action(value = "getUserById")
    public String getUserById() {
        User user;
        if (id == -1) {
            user = LimitlessUtil.getLoginUser();
        } else {
            user = userService.getUserById(id);
        }
        if (user != null) {
            userInfo.put("id", user.getId());
            userInfo.put("name", user.getUserName());
        }
        return "USERMAP";
    }
}
