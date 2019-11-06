package com.zhuang.limitless.service;

import com.zhuang.limitless.dao.impl.BaseDaoImpl;
import com.zhuang.limitless.entity.User;
import com.zhuang.limitless.utils.MD5Utils;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Service;

@Service("userService")
public class UserService extends BaseDaoImpl<User> {

    private DetachedCriteria detachedCriteria;

    public User getUserById(int id) {
        return getEntityById(id);
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
        return getEntitySingle(detachedCriteria);
    }

    public boolean loginUser(String userName, String userPassword) {
        User user = getUserByName(userName);
        if (user != null) {
            if (user.getUserPassword().equals(MD5Utils.MD5(userPassword))) {
                return true;
            }
        }
        return false;
    }

    public boolean regUser(String userName, String userPassword, byte[] userPicture) {
        User user = new User(userName, MD5Utils.MD5(userPassword), userPicture);
        return insertEntity(user);
    }

    public Boolean updateUser(Integer id, String userName, String userPassword, byte[] userPicture) {
        User user = new User(userName, userPassword, userPicture);
        user.setId(id);
        return updateEntity(user);
    }
}
