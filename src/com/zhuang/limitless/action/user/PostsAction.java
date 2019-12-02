package com.zhuang.limitless.action.user;

import com.zhuang.limitless.entity.Posts;
import com.zhuang.limitless.entity.User;
import com.zhuang.limitless.service.PostsService;
import com.zhuang.limitless.util.LimitlessUtil;
import org.apache.struts2.convention.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import java.util.ArrayList;
import java.util.List;

@Controller
@ParentPackage(value = "json-default")
@Results({
        @Result(name = "RESPONSE", type = "json", params = {"root", "Root"}),
        @Result(name = "POSTS", type = "json", params = {"root", "posts"}),
        @Result(name = "DATA", type = "json", params = {"root", "list"})
})
public class PostsAction {

    @Autowired
    private PostsService postsService;
    private Integer id;
    private Integer userId;
    private Integer plateId;
    private String postsTitle;
    private String postsContent;
    private String Root;
    private List<Posts> list;
    private Posts posts;
    private List<Integer> postsIdList;
    private String searchText;

    public void setId(Integer id) {
        this.id = id;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public void setPlateId(Integer plateId) {
        this.plateId = plateId;
    }

    public void setPostsTitle(String postsTitle) {
        this.postsTitle = postsTitle;
    }

    public void setPostsContent(String postsContent) {
        this.postsContent = postsContent;
    }

    public String getRoot() {
        return Root;
    }

    public List<Posts> getList() {
        return list;
    }

    public Posts getPosts() {
        return posts;
    }

    public void setPostsIdList(List<Integer> postsIdList) {
        this.postsIdList = postsIdList;
    }

    public void setSearchText(String searchText) {
        this.searchText = searchText;
    }

    @Action(value = "addPosts")
    public String addPosts() {
        Root = "ERROR";
        User user = LimitlessUtil.getLoginUser();
        if (user != null) {
            if (postsService.addPosts(user.getId(), plateId, postsTitle, postsContent, LimitlessUtil.getDate())) {
                Root = "SUCCESS";
            }
        }
        return "RESPONSE";
    }

    @Action(value = "showPosts")
    public String showPosts() {
        list = postsService.getPostsByPlateId(plateId);
        return "DATA";
    }

    @Action(value = "getUserPosts")
    public String getUserPosts() {
        list = postsService.getPostsByUserId(userId);
        return "DATA";
    }

    @Action(value = "deletePosts")
    public String deletePosts() {
        Root = "ERROR";
        User user = LimitlessUtil.getLoginUser();
        if (user != null){
            if (postsService.getPostsById(id).getUserId().equals(user.getId())){
                if (postsService.deletePosts(id)) {
                    Root = "SUCCESS";
                }
            }
        }
        return "RESPONSE";
    }

    @Action(value = "getPostsById")
    public String getPostsById() {
        posts = postsService.getPostsById(id);
        return "POSTS";
    }

    @Action(value = "getCollectPosts")
    public String getCollectPosts(){
        list = new ArrayList<>();
        for (int id : postsIdList){
            Posts posts = postsService.getPostsById(id);
            if(posts != null){
                list.add(posts);
            }
        }
        return "DATA";
    }

    @Action(value = "updatePosts")
    public String updatePosts() {
        Root = "ERROR";
        User user = LimitlessUtil.getLoginUser();
        if (user != null) {
            if (postsService.getPostsById(id).getUserId().equals(user.getId())){
                if (postsService.updatePosts(id, user.getId(), plateId, postsTitle, postsContent, LimitlessUtil.getDate())) {
                    Root = "SUCCESS";
                }
            }
        }
        return "RESPONSE";
    }

    @Action(value = "searchPosts")
    public String searchPosts(){
        list = postsService.searchPosts(searchText);
        return "DATA";
    }
}
