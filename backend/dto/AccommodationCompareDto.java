package com.yosai.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

// 원하는 값만 뽑아서 사용하기 
// 페이지에서 원하는 값들만 DTO를 만들어서 프론트 보내면
// 쉽게 데이터를 뽑을 수 있다 (실무적으로도 많이 사용함)

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class AccommodationCompareDto {
  String name;
  int price;
  double rating;
  String imgUrl;
}
