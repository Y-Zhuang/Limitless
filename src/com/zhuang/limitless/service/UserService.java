package com.zhuang.limitless.service;

import com.zhuang.limitless.dao.impl.BaseDaoImpl;
import com.zhuang.limitless.entity.User;
import com.zhuang.limitless.util.MD5Util;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private BaseDaoImpl<User> baseDao;

    private DetachedCriteria detachedCriteria;

    public List<User> getUserAll(){
        return baseDao.getALL(User.class);
    }

    public User getUserById(int id) {
        return baseDao.getEntityById(User.class, id);
    }

    public boolean judgeNameBeing(String userName) {
        if (getUserByName(userName) != null) {
            return true;
        }
        return false;
    }

    public User getUserByName(String userName) {
        detachedCriteria = DetachedCriteria.forClass(User.class);
        detachedCriteria.add(Restrictions.eq("userName", userName));
        return baseDao.getEntitySingle(detachedCriteria);
    }

    public boolean loginUser(String userName, String userPassword) {
        User user = getUserByName(userName);
        if (user != null) {
            if (user.getUserPassword().equals(MD5Util.MD5(userPassword))) {
                return true;
            }
        }
        return false;
    }

    public boolean regUser(String userName, String userPassword, byte[] userPicture) {
        User user = new User(userName, MD5Util.MD5(userPassword), userPicture);
        return baseDao.insertEntity(user);
    }

    public Boolean updateUser(Integer id, String userName, String userPassword, byte[] userPicture) {
        User user = new User(userName, userPassword, userPicture);
        user.setId(id);
        return baseDao.updateEntity(user);
    }

    public Boolean deleteUser(Integer id){
        return baseDao.deleteEntity(User.class ,id);
    }

    public List<User> searchUser(String searchText){
        detachedCriteria = DetachedCriteria.forClass(User.class);
        detachedCriteria.add(Restrictions.like("userName","%" + searchText + "%"));
        return baseDao.queryEntityMany(detachedCriteria);
    }

    public String getUserNameById(int id){
        detachedCriteria = DetachedCriteria.forClass(User.class);
        detachedCriteria.setProjection(Projections.property("userName"));
        detachedCriteria.add(Restrictions.eq("id", id));
        return baseDao.queryEntityField(detachedCriteria).get(0).toString();
    }
}
