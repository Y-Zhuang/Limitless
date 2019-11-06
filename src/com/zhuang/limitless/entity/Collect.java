package com.zhuang.limitless.entity;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Entity
public class Collect {

    public Collect() {
    }

    public Collect(Integer userId, Integer postsId) {
        this.userId = userId;
        this.postsId = postsId;
    }

    @Id
    @GeneratedValue(generator = "increaseTableGenerator")
    @GenericGenerator(name = "increaseTableGenerator", strategy = "native")
    private Integer id;
    private Integer userId;
    private Integer postsId;

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

    public Integer getPostsId() {
        return postsId;
    }

    public void setPostsId(Integer postsId) {
        this.postsId = postsId;
    }

    @Override
    public String toString() {
        return "Collect{" +
                "id=" + id +
                ", userId=" + userId +
                ", postsId=" + postsId +
                '}';
    }
}
