package com.yosai.backend.service;

import com.yosai.backend.dto.JoinRequestDto;
import com.yosai.backend.dto.LoginRequestDto;
import com.yosai.backend.entity.Member;
import com.yosai.backend.repository.MemberRepository;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class MemberService {

  private final MemberRepository memberRepository;

  @Autowired
  private PasswordEncoder encoder;

  public MemberService(MemberRepository memberRepository) {
    this.memberRepository = memberRepository;
  }

  public void join(JoinRequestDto data) {

    String 암호화된비밀번호 = encoder.encode(data.getPw());

    Member member = new Member(null, data.getUserId(), 암호화된비밀번호,
        data.getPhone(), data.getEmail());
    memberRepository.save(member);
  }

  public boolean login(LoginRequestDto data) {

    // 1. 데이터베이서 찾는다.
    Member 찾은회원 = memberRepository
        .findByUserId(data.getId());

    System.out.println("찾은회원 아이디:" + 찾은회원.getUserId());

    // 2.만약 회원이 없다면
    if (찾은회원 == null) {
      return false;
    }
    // 3. 회원이 있다면 비교하기
    return encoder.matches(data.getPw(), 찾은회원.getPw());

  }
}
