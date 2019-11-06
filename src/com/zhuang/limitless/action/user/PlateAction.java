package com.zhuang.limitless.action.user;

import com.opensymphony.xwork2.ActionSupport;
import com.zhuang.limitless.entity.Plate;
import com.zhuang.limitless.service.PlateService;
import org.apache.struts2.convention.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
@ParentPackage(value = "json-default")
@Results({
        @Result(name = "RESPONSE", type = "json", params = {"root", "Root"}),
        @Result(name = "DATA", type = "json", params = {"root", "list"})
})
public class PlateAction extends ActionSupport {

    @Autowired
    private PlateService plateService;
    private Integer id;
    private List<Plate> list;
    private String Root;

    public List<Plate> getList() {
        return list;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getRoot() {
        return Root;
    }

    @Action(value = "getPlateAll")
    public String getPlateAll() {
        list = plateService.getPlateAll();
        return "DATA";
    }

    @Action(value = "getPlateById")
    public String getPlateById() {
        Root = plateService.getPlateById(id).getPlateName();
        return "RESPONSE";
    }
}
