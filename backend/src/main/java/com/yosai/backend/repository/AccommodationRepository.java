package com.yosai.backend.repository;

import com.yosai.backend.entity.Accommodation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AccommodationRepository extends JpaRepository<Accommodation, Long> {

    // 리뷰가 많은 상위 4개 DB에서 가져오기(메인페이지 인기 숙소 4개)
    // findTop4ByOrderByReviewCountDesc JPA 규칙에 있음!
    List<Accommodation> findTop4ByOrderByReviewCountDesc();

    //
}
