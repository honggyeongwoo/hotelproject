package com.yosai.backend.repository;

import com.yosai.backend.entity.Member;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Long> {
    // JPA 메뉴얼은 @Id 컬럼에 대해서만 자동으로 메서드 생성해준다.
    // 아이디를 기준으로 찾을 때는 내가 직접 메서드를 만들어야된다.
    Member findByUserId(String userId);
}
