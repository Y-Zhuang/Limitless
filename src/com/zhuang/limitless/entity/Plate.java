package com.zhuang.limitless.entity;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Entity
public class Plate {

    public Plate() {
    }

    public Plate(String plateName) {
        this.plateName = plateName;
    }

    @Id
    @GeneratedValue(generator = "increaseTableGenerator")
    @GenericGenerator(name = "increaseTableGenerator", strategy = "native")
    private Integer id;
    private String plateName;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getPlateName() {
        return plateName;
    }

    public void setPlateName(String plateName) {
        this.plateName = plateName;
    }

    @Override
    public String toString() {
        return "Plate{" +
                "id=" + id +
                ", plateName='" + plateName + '\'' +
                '}';
    }
}
