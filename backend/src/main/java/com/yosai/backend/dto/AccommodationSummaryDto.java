package com.yosai.backend.dto;

import com.yosai.backend.entity.Accommodation;

public record AccommodationSummaryDto(
    Long id,
    String name,
    String city,
    String district,
    // String imageUrl,
    int originalPrice,
    int discountRate,
    int discountedPrice,
    double rating,
    int reviewCount) {
  // Entity -> DTO 변환
  public static AccommodationSummaryDto from(Accommodation a) {
    int price = (int) Math.round(a.getOriginalPrice() * (100 - a.getDiscountRate()) / 100.0);
    return new AccommodationSummaryDto(
        a.getId(),
        a.getName(),
        a.getCity(),
        a.getDistrict(),
        // a.getImageUrl(),
        a.getOriginalPrice(),
        a.getDiscountRate(),
        price,
        a.getRating(),
        a.getReviewCount());
  }

}
