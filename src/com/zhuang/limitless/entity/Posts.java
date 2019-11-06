package com.zhuang.limitless.entity;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Entity
public class Posts {

    public Posts() {
    }

    public Posts(Integer userId, Integer plateId, String postsTitle, String postsContent, String postsTime) {
        this.userId = userId;
        this.plateId = plateId;
        this.postsTitle = postsTitle;
        this.postsContent = postsContent;
        this.postsTime = postsTime;
    }

    @Id
    @GeneratedValue(generator = "increaseTableGenerator")
    @GenericGenerator(name = "increaseTableGenerator", strategy = "native")
    private Integer id;
    private Integer userId;
    private Integer plateId;
    @Column(columnDefinition = "TEXT")
    private String postsTitle;
    @Column(columnDefinition = "LONGTEXT")
    private String postsContent;
    private String postsTime;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getPlateId() {
        return plateId;
    }

    public void setPlateId(Integer plateId) {
        this.plateId = plateId;
    }

    public String getPostsTitle() {
        return postsTitle;
    }

    public void setPostsTitle(String postsTitle) {
        this.postsTitle = postsTitle;
    }

    public String getPostsContent() {
        return postsContent;
    }

    public void setPostsContent(String postsContent) {
        this.postsContent = postsContent;
    }

    public String getPostsTime() {
        return postsTime;
    }

    public void setPostsTime(String postsTime) {
        this.postsTime = postsTime;
    }

    @Override
    public String toString() {
        return "Posts{" +
                "id=" + id +
                ", userId=" + userId +
                ", plateId=" + plateId +
                ", postsTitle='" + postsTitle + '\'' +
                ", postsContent='" + postsContent + '\'' +
                ", postsTime='" + postsTime + '\'' +
                '}';
    }
}
