package com.yosai.backend.repository;

import com.yosai.backend.entity.Member;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByUserId(String userId);
}
