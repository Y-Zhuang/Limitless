package com.zhuang.limitless.service;

import com.zhuang.limitless.dao.BaseDao;
import com.zhuang.limitless.entity.Plate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlateService {

    @Autowired
    private BaseDao<Plate> baseDao;

    public boolean addPlate(String plateName) {
        return baseDao.insertEntity(new Plate(plateName));
    }

    public List<Plate> getPlateAll() {
        return baseDao.getALL(Plate.class);
    }

    public Plate getPlateById(int id) {
        return baseDao.getEntityById(Plate.class, id);
    }

    public boolean updatePlate(Integer id, String plateName) {
        Plate plate = new Plate(plateName);
        plate.setId(id);
        return baseDao.updateEntity(plate);
    }

    public boolean deletePlate(int id){
        return baseDao.deleteEntity(Plate.class, id);
    }
}
