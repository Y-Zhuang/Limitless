package com.zhuang.limitless.dao;

import org.hibernate.criterion.DetachedCriteria;

import java.util.List;


public interface BaseDao<T> {

    boolean insertEntity(T t);

    boolean deleteEntity(Class clazz, Integer id);

    boolean updateEntity(T t);

    List<T> getALL(Class clazz);

    T getEntityById(Class clazz,Integer id);

    T getEntitySingle(DetachedCriteria detachedCriteria);

    List<T> queryEntityMany(DetachedCriteria detachedCriteria);

    List queryEntityField(DetachedCriteria detachedCriteria);
}
