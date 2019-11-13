package com.zhuang.limitless.service;

import com.zhuang.limitless.dao.impl.BaseDaoImpl;
import com.zhuang.limitless.entity.Admin;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Service;

@Service("adminService")
public class AdminService extends BaseDaoImpl<Admin> {

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
        return getEntitySingle(detachedCriteria);
    }
}
