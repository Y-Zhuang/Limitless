package com.zhuang.limitless.entity;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Entity
public class Reply {

    public Reply() {
    }

    public Reply(Integer postsId, Integer userId, String replyContent, String replyTime) {
        this.postsId = postsId;
        this.userId = userId;
        this.replyContent = replyContent;
        this.replyTime = replyTime;
    }

    @Id
    @GeneratedValue(generator = "increaseTableGenerator")
    @GenericGenerator(name = "increaseTableGenerator",strategy = "native")
    private Integer id;
    private Integer postsId;
    private Integer userId;
    @Column(columnDefinition = "LONGTEXT")
    private String replyContent;
    private String replyTime;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getPostsId() {
        return postsId;
    }

    public void setPostsId(Integer postsId) {
        this.postsId = postsId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getReplyContent() {
        return replyContent;
    }

    public void setReplyContent(String replyContent) {
        this.replyContent = replyContent;
    }

    public String getReplyTime() {
        return replyTime;
    }

    public void setReplyTime(String replyTime) {
        this.replyTime = replyTime;
    }

    @Override
    public String toString() {
        return "Reply{" +
                "id=" + id +
                ", postsId=" + postsId +
                ", userId=" + userId +
                ", replyContent='" + replyContent + '\'' +
                ", replyTime='" + replyTime + '\'' +
                '}';
    }
}
