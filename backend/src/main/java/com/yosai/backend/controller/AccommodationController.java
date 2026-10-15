package com.yosai.backend.controller;

import com.yosai.backend.dto.AccommodationDetailDto;
import com.yosai.backend.dto.LoginRequestDto;
import com.yosai.backend.entity.Accommodation;
import com.yosai.backend.service.AccommodationService;

import jakarta.servlet.http.HttpSession;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController()
@CrossOrigin(origins = "*")
public class AccommodationController {

    private final AccommodationService accommodationService;

    public AccommodationController(AccommodationService accommodationService) {
        this.accommodationService = accommodationService;
    }

    @GetMapping("/")
    public List<Accommodation> popular() {
        // 1. 로그 확인
        System.out.println("AccommodationController - 메인페이지 실행()");

        // 2. 데이터 확인
        List<Accommodation> 결과 = accommodationService.getPopular();
        System.out.println(결과.toString());
        return 결과;
    }

    // 상세페이지 관련된 처리하는 메서드
    // @PathVariable URL 안의 값을 꺼내서 자바변수에
    // 자동으로 넣어주는 어노테이션
    @GetMapping("/detail/{id}")
    public AccommodationDetailDto detail(@PathVariable("id") Long id) {
        // 1. 로그 확인
        System.out.println("AccommodationController - detail()");
        System.out.println("숙소 번호: " + id);

        // 2. 서비스한테 디비정보 달라!
        AccommodationDetailDto 하나의정보결과 = accommodationService
                .detail(id);

        // 3. 확인
        System.out.println(하나의정보결과.get숙소정보().getName());

        return 하나의정보결과;
    }

    // 비교하는 표를 보여주는 페이지
    // 매겨변수는 3개의 문자열 값을 가지고 온다.
    // List URL에 여러개의 숫자가 들어오면 자바에서는 List로 받을 수있다.
    // 스프링부트 자체가 자동으로 여러개는 List으로 받게 되어있다.
    @GetMapping("/compare")
    public List<AccommodationDetailDto> comparePage(@RequestParam("ids") List<Long> ids) {

        System.out.println(ids.toString());

        // 1. 서비스 한테 보내기
        List<AccommodationDetailDto> 결과 = accommodationService.compare(ids);

        return 결과;
    }

    @PostMapping("/login")
    public String login(@RequestBody LoginRequestDto data,
            HttpSession 세션) {
        System.out.println("객체타입으로 한꺼번에 전달된다.: " + data);
        // 자바스크립트에서 객체 형식으로 서버에 보내준다.
        // url에 붙는게 아니라 body공간에 담겨서 숨겨져 오기 때문에
        // RequestBody 이용해서 꺼내야된다.
        // 꺼낼때 가장 비슷한 Map형식으로 변환해서 받는다.

        세션.setAttribute(data.getId(), data);

        return "로그인";
    }

}
