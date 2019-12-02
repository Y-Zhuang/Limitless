package com.zhuang.limitless.action.user;

import com.opensymphony.xwork2.ActionSupport;
import com.zhuang.limitless.entity.Reply;
import com.zhuang.limitless.entity.User;
import com.zhuang.limitless.service.ReplyService;
import com.zhuang.limitless.util.LimitlessUtil;
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
public class ReplyAction extends ActionSupport {

    @Autowired
    private ReplyService replyService;
    private Integer id;
    private Integer postsId;
    private String replyContent;
    private List<Reply> list;
    private String Root;

    public void setId(Integer id) {
        this.id = id;
    }

    public void setPostsId(Integer postsId) {
        this.postsId = postsId;
    }

    public void setReplyContent(String replyContent) {
        this.replyContent = replyContent;
    }

    public List<Reply> getList() {
        return list;
    }

    public String getRoot() {
        return Root;
    }

    @Action(value = "getReplyByPostsId")
    public String getReplyByPostsId() {
        list = replyService.getReplyByPostsId(postsId);
        return "DATA";
    }

    @Action(value = "addReply")
    public String addReply() {
        Root = "ERROR";
        User user = LimitlessUtil.getLoginUser();
        if (user != null) {
            if (replyService.addReply(postsId, user.getId(), replyContent, LimitlessUtil.getDate())) {
                Root = "SUCCESS";
            }
        }
        return "RESPONSE";
    }

    @Action(value = "deleteReplyAll")
    public String deleteReplyAll() {
        Root = "ERROR";
        int i = 0;
        User user = LimitlessUtil.getLoginUser();
        List<Reply> list = replyService.getReplyByPostsId(postsId);
        if (user != null) {
            for (Reply reply : list) {
                if (reply.getUserId().equals(user.getId())){
                    if (replyService.deleteReply(reply.getId())) {
                        i++;
                    }
                }
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
        User user = LimitlessUtil.getLoginUser();
        if (user != null){
            if (replyService.getReplyById(id).getUserId().equals(user.getId())){
                if (replyService.deleteReply(id)) {
                    Root = "SUCCESS";
                }
            }
        }
        return "RESPONSE";
    }
}
