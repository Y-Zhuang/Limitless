package com.zhuang.limitless.dao.impl;

import java.lang.reflect.ParameterizedType;
import java.util.List;


import com.zhuang.limitless.dao.BaseDao;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.DetachedCriteria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

public class BaseDaoImpl<T> implements BaseDao<T> {

    @Autowired
    private SessionFactory sessionFactory;
    private Class clazz;

    public BaseDaoImpl() {
        //得到T的最终类型
        ParameterizedType type = (ParameterizedType) this.getClass().getGenericSuperclass();
        this.clazz = (Class) type.getActualTypeArguments()[0];
    }

    //插入数据
    @Override
    @Transactional
    public boolean insertEntity(T t) {
        try {
            sessionFactory.getCurrentSession().save(t);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }

    //删除数据
    @Override
    @Transactional
    public boolean deleteEntity(Integer id) {
        try {
            sessionFactory.getCurrentSession().delete(getEntityById(id));
            return true;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }

    //更新数据
    @Override
    @Transactional
    public boolean updateEntity(T t) {
        try {
            sessionFactory.getCurrentSession().merge(t);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }

    //获取全部数据
    @Override
    @Transactional
    public List<T> getALL() {
        try {
            return runCriteria(DetachedCriteria.forClass(clazz));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    //根据id获取数据
    @Override
    @Transactional
    public T getEntityById(Integer id) {
        try {
            return (T) sessionFactory.getCurrentSession().get(clazz, id);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    //查询单条记录
    @Override
    @Transactional
    public T getEntitySingle(DetachedCriteria detachedCriteria) {
        try {
            return runCriteria(detachedCriteria).get(0);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    //查询多条记录
    @Override
    @Transactional
    public List<T> queryEntityMany(DetachedCriteria detachedCriteria) {
        try {
            return runCriteria(detachedCriteria);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    protected List<T> runCriteria(DetachedCriteria detachedCriteria) {
        return detachedCriteria.getExecutableCriteria(sessionFactory.getCurrentSession()).list();
    }
}
