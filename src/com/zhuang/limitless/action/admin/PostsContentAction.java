package com.zhuang.limitless.action.admin;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.zhuang.limitless.entity.Posts;
import com.zhuang.limitless.service.PostsService;
import org.apache.struts2.convention.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import java.util.List;
import java.util.Map;

@Controller
@ParentPackage(value = "admin-default")
@Results({
        @Result(name = "RESPONSE", type = "json", params = {"root", "Root"}),
        @Result(name = "DATA", type = "json", params = {"root", "list"}),
        @Result(name = "POSTSID", type = "json", params = {"root", "postsIdList"})
})
public class PostsContentAction {
    @Autowired
    private PostsService postsService;
    private Integer id;
    private Integer userId;
    private Integer plateId;
    private String Root;
    private String searchText;
    private List<Posts> list;
    private List<Integer> postsIdList;
    private List<Map> postsMapList;

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

    public void setSearchText(String searchText) {
        this.searchText = searchText;
    }

    public List<Posts> getList() {
        return list;
    }

    public List<Integer> getPostsIdList() {
        return postsIdList;
    }

    public void setPostsList(String userList) {
        Gson gson = new Gson();
        postsMapList = gson.fromJson(userList, new TypeToken<List<Map<String, String>>>() {
        }.getType());
    }

    @Action(value = "gatPostsAll")
    public String gatPostsAll() {
        list = postsService.getPostsAll();
        return "DATA";
    }

    @Action(value = "deleteAdminPosts")
    public String deleteAdminPosts() {
        Root = "ERROR";
        int i = 0;
        List<Posts> list = null;
        if (userId != null) {
            list = postsService.getPostsByUserId(userId);
        } else if (plateId != null) {
            list = postsService.getPostsByPlateId(plateId);
        }
        for (Posts posts : list) {
            if (postsService.deletePosts(posts.getId())) {
                i++;
            }
        }
        if (list.size() == i) {
            Root = "SUCCESS";
        }
        return "RESPONSE";
    }

    @Action(value = "getPostsByPlateId")
    public String getPostsByPlateId() {
        postsIdList = postsService.getPostsIdByPlateId(plateId);
        return "POSTSID";
    }

    @Action(value = "updatePosts")
    public String updatePosts() {
        Root = "ERROR";
        Posts posts = postsService.getPostsById(id);
        if (posts != null) {
            if (postsService.updatePosts(posts.getId(), posts.getUserId(), plateId, posts.getPostsTitle(), posts.getPostsContent(), posts.getPostsTime())) {
                Root = "SUCCESS";
            }
        }
        return "RESPONSE";
    }

    @Action(value = "deletePosts")
    public String deletePosts() {
        Root = "ERROR";
        if (postsService.deletePosts(id)) {
            Root = "SUCCESS";
        }
        return "RESPONSE";
    }

    @Action(value = "updatePostsList")
    public String updatePostsList() {
        Root = "ERROR";
        int i = 0;
        for (Map map :postsMapList){
            Posts posts = postsService.getPostsById(Integer.parseInt(map.get("id").toString()));
            if (posts != null) {
                if (postsService.updatePosts(posts.getId(),posts.getUserId(),Integer.parseInt(map.get("plateId").toString()),posts.getPostsTitle(),posts.getPostsContent(),posts.getPostsTime())) {
                    Root = "SUCCESS";
                    i++;
                }
            }
        }
        if(postsMapList.size() == i){
            Root = "SUCCESS";
        }
        return "RESPONSE";
    }

    @Action(value = "searchPosts")
    public String searchPosts(){
        list = postsService.searchPosts(searchText);
        return "DATA";
    }

    @Action(value = "getPostsTitleById")
    public String getPostsTitleById(){
        Root = postsService.getPostsTitleById(id);
        return "RESPONSE";
    }
}
