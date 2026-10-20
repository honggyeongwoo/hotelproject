package com.yosai.backend.dto;

import java.util.List;

import com.yosai.backend.entity.Accommodation;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor // 기본생성자 자동으로 코드작성
@AllArgsConstructor // 매개변수 받는 생성자 자동으로 코드작성
public class AccommodationDetailDto {

  private Accommodation 숙소정보;
  private List<String> 이미지들;
}
