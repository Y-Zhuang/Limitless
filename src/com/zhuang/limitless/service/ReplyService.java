package com.zhuang.limitless.service;

import com.zhuang.limitless.dao.BaseDao;
import com.zhuang.limitless.entity.Reply;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReplyService {

    @Autowired
    private BaseDao<Reply> baseDao;

    private DetachedCriteria detachedCriteria;

    public List<Reply> getReplyAll(){
        return baseDao.getALL(Reply.class);
    }

    public Reply getReplyById(int id){
        return baseDao.getEntityById(Reply.class, id);
    }

    public Boolean addReply(Integer postsId, Integer userId, String replyContent, String replyTime) {
        return baseDao.insertEntity(new Reply(postsId, userId, replyContent, replyTime));
    }

    public List<Reply> getReplyByPostsId(int postsId) {
        detachedCriteria = DetachedCriteria.forClass(Reply.class);
        detachedCriteria.add(Restrictions.eq("postsId", postsId));
        return baseDao.queryEntityMany(detachedCriteria);
    }

    public boolean deleteReply(int id) {
        return baseDao.deleteEntity(Reply.class, id);
    }

    public List<Reply> getReplyByUserId(int userId) {
        detachedCriteria = DetachedCriteria.forClass(Reply.class);
        detachedCriteria.add(Restrictions.eq("userId", userId));
        return baseDao.queryEntityMany(detachedCriteria);
    }

    public List<Reply> searchReply(String searchText){
        detachedCriteria = DetachedCriteria.forClass(Reply.class);
        detachedCriteria.add(Restrictions.like("replyContent","%" + searchText + "%"));
        return baseDao.queryEntityMany(detachedCriteria);
    }
}
