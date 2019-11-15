package com.zhuang.limitless.action.admin;

import com.zhuang.limitless.entity.Plate;
import com.zhuang.limitless.service.PlateService;
import org.apache.struts2.convention.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
@ParentPackage(value = "admin-default")
@Results({
        @Result(name = "RESPONSE", type = "json", params = {"root", "Root"}),
        @Result(name = "DATA", type = "json", params = {"root", "list"})
})
public class PlateContentAction {
    @Autowired
    private PlateService plateService;
    private Integer id;
    private String plateName;
    private List<Plate> list;
    private String Root;

    public void setId(Integer id) {
        this.id = id;
    }

    public void setPlateName(String plateName) {
        this.plateName = plateName;
    }

    public List<Plate> getList() {
        return list;
    }

    public String getRoot() {
        return Root;
    }

    @Action(value = "addPlate")
    public String addPlate(){
        Root = "ERROR";
        if (plateService.addPlate(plateName)) {
            Root = "SUCCESS";
        }
        return "RESPONSE";
    }

    @Action(value = "getPlateAll")
    public String getPlateAll(){
        list = plateService.getPlateAll();
        return "DATA";
    }

    @Action(value = "updatePlate")
    public String updatePlate(){
        Root = "ERROR";
        Plate plate = plateService.getPlateById(id);
        if(plate != null){
            if (plateService.updatePlate(plate.getId(),plateName)) {
                Root = "SUCCESS";
            }
        }
        return "RESPONSE";
    }
}
