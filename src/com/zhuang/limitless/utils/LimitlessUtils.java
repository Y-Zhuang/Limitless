package com.zhuang.limitless.utils;

import com.zhuang.limitless.entity.Admin;
import com.zhuang.limitless.entity.User;
import org.apache.struts2.ServletActionContext;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

public class LimitlessUtils {

    public static String getDate() {
        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm");
        return dateFormat.format(new Date());
    }

    public static void setLoginUser(User user){
        ServletActionContext.getRequest().getSession().setAttribute("User", user);
    }

    public static User getLoginUser(){
        return (User) ServletActionContext.getRequest().getSession().getAttribute("User");
    }

    public static void removeLoginUser(){
        ServletActionContext.getRequest().getSession().removeAttribute("User");
    }

    public static void setLoginAdmin(Admin admin){
        ServletActionContext.getRequest().getSession().setAttribute("Admin", admin);
    }

    public static Admin getLoginAdmin(){
        return (Admin) ServletActionContext.getRequest().getSession().getAttribute("Admin");
    }

    public static void removeLoginAdmin(){
        ServletActionContext.getRequest().getSession().removeAttribute("Admin");
    }
}
