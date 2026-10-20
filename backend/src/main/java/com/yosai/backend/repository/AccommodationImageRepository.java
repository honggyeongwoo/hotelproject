package com.yosai.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.yosai.backend.entity.AccommodationImage;

public interface AccommodationImageRepository
    extends JpaRepository<AccommodationImage, Long> {
  // 특정 숙소의 사진 전체 조회
  List<AccommodationImage> findNByAccommodation_Id(Long accommodationId);

  Optional<AccommodationImage> findFirstByAccommodation_IdOrderBySortOrderAsc(Long accommodationId);
}
