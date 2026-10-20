package com.yosai.backend.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

// 비교표 한건
//  어떤 회원,현재 날짜,순서대로 저장하는 id
@Setter
@NoArgsConstructor
@Getter
@Entity
public class SavedCompare {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;


  // 누가 저장했니?
  @ManyToOne
  @JoinColumn(name = "member_id", nullable = false)
  private Member member;

  // 언제 저장했니?
  @Column(nullable = false)
  private LocalDateTime createAt;

  public SavedCompare(Member member){
    this.member = member;
  }

  // 항상 새로운 시간을 저장할 때는 자동으로 저장될 수있도록 함수
  @PrePersist // insert 할때 자동으로 함수가 실행된다!
  void onCreate(){
    this.createAt = LocalDateTime.now();
  }




}
