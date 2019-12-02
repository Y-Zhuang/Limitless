package com.zhuang.limitless.action.admin;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.opensymphony.xwork2.ActionSupport;
import com.zhuang.limitless.entity.User;
import com.zhuang.limitless.service.UserService;
import com.zhuang.limitless.util.MD5Util;
import org.apache.struts2.ServletActionContext;
import org.apache.struts2.convention.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import sun.misc.BASE64Decoder;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.Map;


@Controller
@ParentPackage(value = "admin-default")
@Results({
        @Result(name = "RESPONSE", type = "json", params = {"root", "Root"}),
        @Result(name = "DATA", type = "json", params = {"root", "list"}),
        @Result(name = "PICTURE", type = "stream", params = {"contentType", "image/ jpeg,image/bmp ,image/png,image/ gif,image/jpeg ,image/pjpeg"})
})
public class UserContentAction extends ActionSupport {

    @Autowired
    private UserService userService;
    private Integer id;
    private String userName;
    private String userPassword;
    private String userPicture;
    private String searchText;
    private String Root;
    private List<User> list;
    private List<Map> userMapList;
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

    public void setUserPicture(String userPicture) {
        this.userPicture = userPicture;
    }

    public void setSearchText(String searchText) {
        this.searchText = searchText;
    }

    public String getRoot() {
        return Root;
    }

    public List<User> getList() {
        return list;
    }

    public void setUserList(String userList) {
        Gson gson = new Gson();
        userMapList = gson.fromJson(userList, new TypeToken<List<Map<String, String>>>() {
        }.getType());
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

    @Action(value = "getUserAll")
    public String getUserAll() {
        list = userService.getUserAll();
        return "DATA";
    }

    @Action(value = "addUser")
    public String addUser() {
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
        User user = userService.getUserById(id);
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


    @Action(value = "isNameBeing")
    public String isNameBeing() {
        Root = "FALSE";
        if (userService.judgeNameBeing(userName)) {
            Root = "TRUE";
        }
        return "RESPONSE";
    }

    @Action(value = "updateUser")
    public String updateUser() {
        Root = "ERROR";
        User user = userService.getUserById(id);
        if (user != null) {
            if (userService.updateUser(user.getId(), user.getUserName(), MD5Util.MD5(userPassword), user.getUserPicture())) {
                Root = "SUCCESS";
            }
        }
        return "RESPONSE";
    }

    @Action(value = "updateUserList")
    public String updateUserList() {
        Root = "ERROR";
        int i = 0;
        for (Map map :userMapList){
            User user = userService.getUserById(Integer.parseInt(map.get("id").toString()));
            if (user != null) {
                if (userService.updateUser(user.getId(), user.getUserName(), MD5Util.MD5(map.get("userPassword").toString()), user.getUserPicture())) {
                    Root = "SUCCESS";
                    i++;
                }
            }
        }
        if(userMapList.size() == i){
            Root = "SUCCESS";
        }
        return "RESPONSE";
    }

    @Action(value = "deleteUser")
    public String deleteUser(){
        Root = "ERROR";
        if(userService.deleteUser(id)){
            Root = "SUCCESS";
        }
        return "RESPONSE";
    }

    @Action(value = "searchUser")
    public String searchUser(){
        list = userService.searchUser(searchText);
        return "DATA";
    }

    @Action(value = "getUserNameById")
    public String getUserNameById(){
        Root = userService.getUserNameById(id);
        return "RESPONSE";
    }
}
