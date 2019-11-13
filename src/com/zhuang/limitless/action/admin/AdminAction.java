package com.zhuang.limitless.action.admin;

import com.opensymphony.xwork2.ActionSupport;
import com.zhuang.limitless.service.AdminService;
import com.zhuang.limitless.utils.LimitlessUtils;
import org.apache.struts2.convention.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

@Controller
@ParentPackage(value = "admin-default")
@Results({
        @Result(name = "RESPONSE", type = "json", params = {"root", "Root"})
})
public class AdminAction extends ActionSupport {
    @Autowired
    private AdminService adminService;
    private String adminName;
    private String adminPassword;
    private String Root;

    public void setAdminName(String adminName) {
        this.adminName = adminName;
    }

    public void setAdminPassword(String adminPassword) {
        this.adminPassword = adminPassword;
    }

    public String getRoot() {
        return Root;
    }

    @Action(value = "loginAdmin")
    public String loginAdmin(){
        Root = "ERROR";
        if(adminService.loginAdmin(adminName,adminPassword)){
            LimitlessUtils.setLoginAdmin(adminService.getAdminByName(adminName));
            Root = "SUCCESS";
        }
        return "RESPONSE";
    }

    @Action(value = "isLoginAdmin")
    public String isLoginAdmin() {
        Root = "FALSE";
        if (LimitlessUtils.getLoginAdmin() != null) {
            Root = "TRUE";
        }
        return "RESPONSE";
    }

    @Action(value = "quitLoginAdmin")
    public String quitLoginAdmin() {
        LimitlessUtils.removeLoginAdmin();
        return "RESPONSE";
    }
}
