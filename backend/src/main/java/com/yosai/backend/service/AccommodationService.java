package com.yosai.backend.service;

import com.yosai.backend.dto.AccommodationDetailDto;
import com.yosai.backend.entity.Accommodation;
import com.yosai.backend.entity.AccommodationImage;
import com.yosai.backend.repository.AccommodationImageRepository;
import com.yosai.backend.repository.AccommodationRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AccommodationService {

    private final AccommodationRepository accommodationRepository;

    @Autowired
    private AccommodationImageRepository 숙소이미지담당자;

    public AccommodationService(AccommodationRepository accommodationRepository) {
        this.accommodationRepository = accommodationRepository;
    }

    public List<Accommodation> getPopular() {

        try {

            List<Accommodation> 결과 = accommodationRepository.findTop4ByOrderByReviewCountDesc();

            System.out.println("DB 조회 성공:" + 결과.size() + "개");

            return 결과;
        } catch (Exception e) {
            System.out.println("DB조회 실패!");

            // 1. 오류 메시지 확인
            // 오류를 설명하는 것!
            System.out.println(e.getMessage());

            // 2. 오류 위치,상세 원인 확인 caused by
            e.printStackTrace();

            // 3. 한곳에서 처리할 수있도록 설정 throw
            throw e;
        }
    }

    public AccommodationDetailDto detail(Long id) {

        // 1. 숙소 정보 조회
        Accommodation 하나숙소 = accommodationRepository.findById(id)
                .orElse(null);
        if (하나숙소 == null) {
            return null;
        }
        // 2. 숙소 이미지 조회
        List<AccommodationImage> 이미지들 = 숙소이미지담당자
                .findNByAccommodation_Id(id);
        System.out.println("이미지 개수: " + 이미지들.size());

        // 3. 숙소이미지 전체 정보중에 imageUrl만 뽑아서 저장하기
        List<String> 이미지URL들 = new ArrayList<>();

        for (AccommodationImage 이미지한개 : 이미지들) {
            이미지URL들.add(이미지한개.getImageUrl());
        }
        // 4. 이미지와 숙소정보를 한 곳에 묶어서 보낸다.

        return new AccommodationDetailDto(하나숙소, 이미지URL들);
    }

    public List<AccommodationDetailDto> compare(List<Long> ids) {
        // 한꺼번에 디비에서 찾아서 결과를 반환해준다.
        // 단점 : 순서보장이 없다!
        accommodationRepository.findAllById(ids);

        // 순서를 중요시해야되는 페이지
        List<AccommodationDetailDto> 결과 = new ArrayList();

        for (Long id : ids) {
            Accommodation 숙소정보한건 = accommodationRepository.findById(id)
                    .orElse(null);

            // 이미지 데이터
            AccommodationImage 숙소이미지한건 = 숙소이미지담당자
                    .findById(id)
                    .orElse(null);

            System.out.println();
            System.out.println("숙소정보: " + 숙소정보한건);
            System.out.println("숙소이미지: " + 숙소이미지한건);
            System.out.println();

            AccommodationDetailDto 보낼결과 = new AccommodationDetailDto();
            보낼결과.set숙소정보(숙소정보한건);
            보낼결과.get이미지들()
                    .add(숙소이미지한건.getImageUrl());

            결과.add(보낼결과);
        }
        // 1. 이미지도 같이 가져와야된다.
        // 2. 어떤 dto 넣어서 보낼지.
        // 3. 반환 타입 -> 컨트롤러한테 보낸다.
        // 4. 예외처리를 어떻게 할까? 어떤 예외가 있을까? 고민!
        return 결과;
    }
}
/*
 * 1. Mysql 외부프로그램이랑 연결?
 * Mysql이 꺼져있거나 주소.포트가 틀릴 경우 - 연결실패
 * DB나 네트워크가 느려 제한시간 안에 응답을 못할 수도 있다.
 * 
 * 2. 데이터베이스 안에 값이 저장이 안된 경우도 있음!
 * - 비어있는 값을 처리하는 코드를 추가 작성!
 * 3. DB이름 오류
 * 4. 테이블 컬럼오류 코드가 찾는 이름이랑 DB이름이랑 다르다!
 * 
 * 예외처리
 * - 비정상적인 종료 막자!
 * - 어느정도 코드로 해결이 가능한 문제들
 * 
 * 자바 파일 마다 직접 처리해라!
 * try{
 * 예외가 발생할 부분
 * }catch(){
 * 처리하는 부분
 * }
 * 
 * try~catch 기하급수적으로 많아진다.
 * 유지보수가 힘드니깐! 한곳에서 처리하자!
 * 
 * throw 예외를 다른 곳으로 전달한다.
 * throw 어떤예외객체
 * 나를 호출한 메서드한테 전달한다.
 * service -> controller
 * 
 * public Accommodation findById(Long id) {
 * 
 * return accommodationRepository
 * .findById(id)
 * .orElse(null); // 없으면 null 반환
 * 
 * }
 * 
 * 
 */