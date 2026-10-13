package com.yosai.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;

// 숙소에 관련된 이미지들만 모아놓는 클래스!

@Getter
@Entity
public class AccommodationImage {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  // 숙소 한곳에 사진이 여러개 - 외래키
  @ManyToOne
  @JoinColumn(name = "accommodation_id")
  private Accommodation accommodation;

  // url 저장시 url길이가 기본 255 제한을 두면 중간에
  // 짤릴 위험이있다. 제대로 이미지 주소를 불러올수 없다!
  @Column(nullable = false, length = 500)
  private String imageUrl;

  private int sortOrder;
}
