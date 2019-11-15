package com.zhuang.limitless.action.admin;

import com.zhuang.limitless.entity.Collect;
import com.zhuang.limitless.service.CollectService;
import org.apache.struts2.convention.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
@ParentPackage(value = "admin-default")
@Results({
        @Result(name = "RESPONSE", type = "json", params = {"root", "Root"}),
})
public class CollectContentAction {
    @Autowired
    private CollectService collectService;
    private Integer userId;
    private Integer postsId;
    private String Root;

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public void setPostsId(Integer postsId) {
        this.postsId = postsId;
    }

    public String getRoot() {
        return Root;
    }

    @Action(value = "deleteAdminCollect")
    public String deleteAdminCollect() {
        Root = "ERROR";
        int i = 0;
        List<Collect> list = null;
        if(userId != null){
            list = collectService.getCollectByUserId(userId);
        }else if(postsId != null){
            list = collectService.getCollectByPostsId(postsId);
        }
        for (Collect collect : list) {
            if (collectService.deleteCollect(collect.getId())) {
                i++;
            }
        }
        if(list.size() == i){
            Root = "SUCCESS";
        }
        return "RESPONSE";
    }
}
