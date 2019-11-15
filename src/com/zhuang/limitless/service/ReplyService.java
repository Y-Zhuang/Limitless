package com.zhuang.limitless.service;

import com.zhuang.limitless.dao.impl.BaseDaoImpl;
import com.zhuang.limitless.entity.Reply;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("replyService")
public class ReplyService extends BaseDaoImpl<Reply> {

    private DetachedCriteria detachedCriteria;

    public Reply getReplyById(int id){
        return getEntityById(id);
    }

    public Boolean addReply(Integer postsId, Integer userId, String replyContent, String replyTime) {
        return insertEntity(new Reply(postsId, userId, replyContent, replyTime));
    }

    public List<Reply> getReplyByPostsId(int postsId) {
        detachedCriteria = DetachedCriteria.forClass(Reply.class);
        detachedCriteria.add(Restrictions.eq("postsId", postsId));
        return queryEntityMany(detachedCriteria);
    }

    public boolean deleteReply(int id) {
        return deleteEntity(id);
    }

    public List<Reply> getReplyByUserId(int userId) {
        detachedCriteria = DetachedCriteria.forClass(Reply.class);
        detachedCriteria.add(Restrictions.eq("userId", userId));
        return queryEntityMany(detachedCriteria);
    }
}
