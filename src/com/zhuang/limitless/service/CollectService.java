package com.zhuang.limitless.service;

import com.zhuang.limitless.dao.impl.BaseDaoImpl;
import com.zhuang.limitless.entity.Collect;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("collectService")
public class CollectService extends BaseDaoImpl<Collect> {

    private DetachedCriteria detachedCriteria;

    public Collect getCollectByUserIdAndPostsId(Integer userId, Integer postsId) {
        detachedCriteria = DetachedCriteria.forClass(Collect.class);
        detachedCriteria.add(Restrictions.and(Restrictions.eq("userId", userId),Restrictions.eq("postsId", postsId)));
        return getEntitySingle(detachedCriteria);
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
        return queryEntityMany(detachedCriteria);
    }

    public List<Collect> getCollectByPostsId(int postsId){
        detachedCriteria = DetachedCriteria.forClass(Collect.class);
        detachedCriteria.add(Restrictions.eq("postsId", postsId));
        return queryEntityMany(detachedCriteria);
    }

    public boolean addCollect(Integer userId, Integer postsId) {
        return insertEntity(new Collect(userId, postsId));
    }

    public boolean deleteCollect(int id) {
        return deleteEntity(id);
    }
}
