package com.yosai.backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data // getter,setter,toString까지 자동으로 생성한다.
@Entity
public class SavedCompareItem {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  // 어느 비교표에 속하니?
  @ManyToOne
  @JoinColumn(name = "saved_compare_id", nullable = false)
  private SavedCompare savedCompare;

  // 어떤 숙소?
  @ManyToOne
  @JoinColumn(name = "accommodation_id", nullable = false)
  private Accommodation accommodation;

  // 몇번째 칸에 있었니? (0,1,2)
  private int sortOrder;

  public SavedCompareItem(SavedCompare savedCompare,
      Accommodation accommodation, int sortOrder) {
    this.savedCompare = savedCompare;
    this.accommodation = accommodation;
    this.sortOrder = sortOrder;
  }

}
