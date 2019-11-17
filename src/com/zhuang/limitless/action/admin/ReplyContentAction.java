package com.zhuang.limitless.action.admin;

import com.zhuang.limitless.entity.Reply;
import com.zhuang.limitless.service.ReplyService;
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
public class ReplyContentAction {
    @Autowired
    private ReplyService replyService;
    private Integer id;
    private Integer userId;
    private Integer postsId;
    private List<Reply> list;
    private String Root;
    private String searchText;

    public void setId(Integer id) {
        this.id = id;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public void setPostsId(Integer postsId) {
        this.postsId = postsId;
    }

    public List<Reply> getList() {
        return list;
    }

    public String getRoot() {
        return Root;
    }

    public void setSearchText(String searchText) {
        this.searchText = searchText;
    }

    @Action(value = "getReplyAll")
    public String getReplyAll(){
        list = replyService.getReplyAll();
        return "DATA";
    }

    @Action(value = "deleteAdminReply")
    public String deleteAdminReply() {
        Root = "ERROR";
        int i = 0;
        List<Reply> list = null;
        if(userId != null){
            list = replyService.getReplyByUserId(userId);
        }else if(postsId != null){
            list = replyService.getReplyByPostsId(postsId);
        }
        for (Reply reply : list) {
            if (replyService.deleteReply(reply.getId())) {
                i++;
            }
        }
        if(list.size() == i){
            Root = "SUCCESS";
        }
        return "RESPONSE";
    }

    @Action(value = "deleteReply")
    public String deleteReply(){
        Root = "ERROR";
        if (replyService.deleteReply(id)) {
            Root = "SUCCESS";
        }
        return "RESPONSE";
    }

    @Action(value = "searchReply")
    public String searchReply(){
        list = replyService.searchReply(searchText);
        return "DATA";
    }
}
