package com.zhuang.limitless.service;

import com.zhuang.limitless.dao.BaseDao;
import com.zhuang.limitless.entity.Posts;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostsService {

    @Autowired
    private BaseDao<Posts> baseDao;

    private DetachedCriteria detachedCriteria;

    public List<Posts> getPostsAll(){
        return baseDao.getALL(Posts.class);
    }

    public boolean addPosts(Integer userId, Integer plateId, String postsTitle, String postsContent, String postsTime) {
        return baseDao.insertEntity(new Posts(userId, plateId, postsTitle, postsContent, postsTime));
    }

    public List<Posts> getPostsByPlateId(int plateId) {
        detachedCriteria = DetachedCriteria.forClass(Posts.class);
        detachedCriteria.add(Restrictions.eq("plateId", plateId));
        return baseDao.queryEntityMany(detachedCriteria);
    }

    public List<Posts> getPostsByUserId(int userId) {
        detachedCriteria = DetachedCriteria.forClass(Posts.class);
        detachedCriteria.add(Restrictions.eq("userId", userId));
        return baseDao.queryEntityMany(detachedCriteria);
    }

    public boolean deletePosts(int id) {
        return baseDao.deleteEntity(Posts.class, id);
    }

    public Posts getPostsById(int id) {
        return baseDao.getEntityById(Posts.class, id);
    }

    public boolean updatePosts(Integer id, Integer userId, Integer plateId, String postsTitle, String postsContent, String postsTime) {
        Posts posts = new Posts(userId, plateId, postsTitle, postsContent, postsTime);
        posts.setId(id);
        return baseDao.updateEntity(posts);
    }

    public List<Posts> searchPosts(String searchText){
        detachedCriteria = DetachedCriteria.forClass(Posts.class);
        detachedCriteria.add(Restrictions.like("postsTitle","%" + searchText + "%"));
        return baseDao.queryEntityMany(detachedCriteria);
    }

    public List<Integer> getPostsIdByPlateId(int plateId){
        detachedCriteria = DetachedCriteria.forClass(Posts.class);
        detachedCriteria.setProjection(Projections.property("id"));
        detachedCriteria.add(Restrictions.eq("plateId", plateId));
        return baseDao.queryEntityField(detachedCriteria);
    }

    public String getPostsTitleById(int id){
        detachedCriteria = DetachedCriteria.forClass(Posts.class);
        detachedCriteria.setProjection(Projections.property("postsTitle"));
        detachedCriteria.add(Restrictions.eq("id", id));
        return baseDao.queryEntityField(detachedCriteria).get(0).toString();
    }
}
