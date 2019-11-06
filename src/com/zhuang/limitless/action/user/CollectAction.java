package com.zhuang.limitless.action.user;

import com.opensymphony.xwork2.ActionSupport;
import com.zhuang.limitless.entity.Collect;
import com.zhuang.limitless.entity.User;
import com.zhuang.limitless.service.CollectService;
import com.zhuang.limitless.utils.LimitlessUtils;
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
public class CollectAction extends ActionSupport {
    @Autowired
    private CollectService collectService;
    private Integer id;
    private Integer userId;
    private Integer postsId;
    private List<Collect> list;
    private String Root;

    public void setId(Integer id) {
        this.id = id;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public void setPostsId(Integer postsId) {
        this.postsId = postsId;
    }

    public List<Collect> getList() {
        return list;
    }

    public String getRoot() {
        return Root;
    }

    @Action(value = "judgeCollectBeing")
    public String judgeCollectBeing() {
        Root = "FALSE";
        User user = LimitlessUtils.getLoginUser();
        if (user != null) {
            if (collectService.judgeCollectBeing(user.getId(), postsId)) {
                Root = "TRUE";
            }
        }
        return "RESPONSE";
    }

    @Action(value = "getCollectByUserId")
    public String getCollectByUserId() {
        if (userId == -1) {
            userId = LimitlessUtils.getLoginUser().getId();
        }
        list = collectService.getCollectByUserId(userId);
        list.size();
        return "DATA";
    }

    @Action(value = "addCollect")
    public String addCollect() {
        Root = "ERROR";
        User user = LimitlessUtils.getLoginUser();
        if (user != null) {
            Collect collect = collectService.getCollectByUserIdAndPostsId(user.getId(), postsId);
            if (collect != null) {
                if (collectService.deleteCollect(collect.getId())) {
                    Root = "BLACK";
                }
            } else {
                if (collectService.addCollect(user.getId(), postsId)) {
                    Root = "RED";
                }
            }
        }
        return "RESPONSE";
    }

    @Action(value = "deleteCollect")
    public String deleteCollect() {
        Root = "ERROR";
        int i = 0;
        User user = LimitlessUtils.getLoginUser();
        List<Collect> list = collectService.getCollectByPostsId(postsId);
        if (user != null) {
            for (Collect collect : list) {
                if (collectService.deleteCollect(collect.getId())) {
                    i++;
                }
            }
        }
        if(list.size() == i){
            Root = "SUCCESS";
        }
        return "RESPONSE";
    }
}
