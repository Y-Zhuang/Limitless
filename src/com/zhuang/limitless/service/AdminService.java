package com.zhuang.limitless.service;

import com.zhuang.limitless.dao.BaseDao;
import com.zhuang.limitless.entity.Admin;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminService {

    @Autowired
    private BaseDao<Admin> baseDao;

    private DetachedCriteria detachedCriteria;

    public boolean loginAdmin(String adminName, String adminPassword) {
        Admin admin = getAdminByName(adminName);
        if (admin != null) {
            if (admin.getAdminPassword().equals(adminPassword)) {
                return true;
            }
        }
        return false;
    }

    public Admin getAdminByName(String adminName) {
        detachedCriteria = DetachedCriteria.forClass(Admin.class);
        detachedCriteria.add(Restrictions.eq("adminName", adminName));
        return baseDao.getEntitySingle(detachedCriteria);
    }
}
