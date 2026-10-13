package com.yosai.backend.controller;

import com.yosai.backend.dto.AccommodationDetailDto;
import com.yosai.backend.entity.Accommodation;
import com.yosai.backend.service.AccommodationService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

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
    public String comparePage(@RequestParam("ids") List<Long> ids) {

        System.out.println(ids.toString());

        // 1. 서비스 한테 보내기
        accommodationService.compare(ids);

        return "성공";
    }

}