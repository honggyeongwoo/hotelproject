package com.yosai.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;

@Getter // 데이터를 꺼낼갈수있도록 Getter를 생성해준다.
@Entity
@Table(name = "accommodation")
public class Accommodation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String type;
    private String city;
    private String district;
    private String address;

    @Column(columnDefinition = "TEXT")
    private String description;
    private int originalPrice;
    private int discountRate;
    private double rating;
    private int reviewCount;
    private boolean parking;
    private boolean breakfast;
    private boolean refundable;
    private String cancelPolicy;
}
