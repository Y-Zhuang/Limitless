package com.zhuang.limitless.dao;

import org.hibernate.criterion.DetachedCriteria;

import java.util.List;


public interface BaseDao<T> {

    boolean insertEntity(T t);

    boolean deleteEntity(Integer id);

    boolean updateEntity(T t);

    List<T> getALL();

    T getEntityById(Integer id);

    T getEntitySingle(DetachedCriteria detachedCriteria);

    List<T> queryEntityMany(DetachedCriteria detachedCriteria);

    List queryEntityField(DetachedCriteria detachedCriteria);
}
