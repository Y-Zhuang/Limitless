package com.zhuang.limitless.action.admin;

import com.zhuang.limitless.entity.Posts;
import com.zhuang.limitless.service.PostsService;
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
public class PostsContentAction {
    @Autowired
    private PostsService postsService;
    private Integer id;
    private Integer userId;
    private Integer plateId;
    private String Root;
    private List<Posts> list;

    public void setId(Integer id) {
        this.id = id;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public void setPlateId(Integer plateId) {
        this.plateId = plateId;
    }

    public String getRoot() {
        return Root;
    }

    public List<Posts> getList() {
        return list;
    }

    @Action(value = "deleteAdminPosts")
    public String deleteAdminPosts() {
        Root = "ERROR";
        int i = 0;
        List<Posts> list = null;
        if(userId != null){
            list = postsService.getPostsByUserId(userId);
        }else if(plateId != null){
            list = postsService.getPostsByPlateId(plateId);
        }
        for (Posts posts : list) {
            if (postsService.deletePosts(posts.getId())) {
                i++;
            }
        }
        if(list.size() == i){
            Root = "SUCCESS";
        }
        return "RESPONSE";
    }
}
