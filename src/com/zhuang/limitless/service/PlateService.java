package com.zhuang.limitless.service;

import com.zhuang.limitless.dao.impl.BaseDaoImpl;
import com.zhuang.limitless.entity.Plate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("plateService")
public class PlateService extends BaseDaoImpl<Plate> {

    public boolean addPlate(String plateName) {
        return insertEntity(new Plate(plateName));
    }

    public List<Plate> getPlateAll() {
        return getALL();
    }

    public Plate getPlateById(int id) {
        return getEntityById(id);
    }

    public boolean updatePlate(Integer id, String plateName) {
        Plate plate = new Plate(plateName);
        plate.setId(id);
        return updateEntity(plate);
    }
}
