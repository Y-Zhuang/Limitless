package com.zhuang.limitless.service;

import com.zhuang.limitless.dao.impl.BaseDaoImpl;
import com.zhuang.limitless.entity.Plate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("plateService")
public class PlateService extends BaseDaoImpl<Plate> {

    public List<Plate> getPlateAll() {
        return getALL();
    }

    public Plate getPlateById(int id) {
        return getEntityById(id);
    }
}
