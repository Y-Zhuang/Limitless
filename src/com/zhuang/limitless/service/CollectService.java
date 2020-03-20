package com.zhuang.limitless.service;

import com.zhuang.limitless.dao.BaseDao;
import com.zhuang.limitless.entity.Collect;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CollectService {

    @Autowired
    private BaseDao<Collect> baseDao;

    private DetachedCriteria detachedCriteria;

    public Collect getCollectByUserIdAndPostsId(Integer userId, Integer postsId) {
        detachedCriteria = DetachedCriteria.forClass(Collect.class);
        detachedCriteria.add(Restrictions.and(Restrictions.eq("userId", userId),Restrictions.eq("postsId", postsId)));
        return baseDao.getEntitySingle(detachedCriteria);
    }

    public boolean judgeCollectBeing(Integer userId, Integer postsId) {
        if (getCollectByUserIdAndPostsId(userId, postsId) != null) {
            return true;
        }
        return false;
    }

    public List<Collect> getCollectByUserId(int userId) {
        detachedCriteria = DetachedCriteria.forClass(Collect.class);
        detachedCriteria.add(Restrictions.eq("userId", userId));
        return baseDao.queryEntityMany(detachedCriteria);
    }

    public List<Collect> getCollectByPostsId(int postsId){
        detachedCriteria = DetachedCriteria.forClass(Collect.class);
        detachedCriteria.add(Restrictions.eq("postsId", postsId));
        return baseDao.queryEntityMany(detachedCriteria);
    }

    public boolean addCollect(Integer userId, Integer postsId) {
        return baseDao.insertEntity(new Collect(userId, postsId));
    }

    public boolean deleteCollect(int id) {
        return baseDao.deleteEntity(Collect.class,id);
    }
}
