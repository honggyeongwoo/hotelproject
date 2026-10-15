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

    public Optional<String> login(LoginRequestDto data) {
        return memberRepository.findByUserId(data.getId())
                .filter(member -> encoder.matches(data.getPw(), member.getPw()))
                .map(Member::getUserId);
    }
}
