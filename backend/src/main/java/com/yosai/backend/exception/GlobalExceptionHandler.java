package com.yosai.backend.exception;

import java.sql.SQLException;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.servlet.resource.NoResourceFoundException;

// 스프링아 여러 컨트롤러의 예외를 처리하는 담당자야!
// 예외 상황
//  - service 에서 DB조회 조회 실패!
//  1. catch 에서 예외 확인 
//  2. throw e 컨트롤러로 예외를 전달!
//  3. GlobalExceptionHandler가 받음!
//  4. 사용자에게 500 상태 코드와 안내 문구 반환
@RestControllerAdvice
public class GlobalExceptionHandler {
  // 발생할 수있는 모든 예외들을 작성!

  // 1. 이 메서드에서 예외처리할꺼야!
  @ExceptionHandler(Exception.class)
  public ResponseEntity<ErrorResponse> 응답코드예외처리(Exception e) {

    // 2. 개발자가 확인 할 오류와 위치 와 원인 출력
    e.printStackTrace();

    // 3. 사용자한테 보낼 메시지 객체 생성
    ErrorResponse error = new ErrorResponse(500,
        "숙소 조회 중 문제가 발생했습니다.");
    // 4. HTTP 상태 코드와 에러 데이터를 함께 반환한다.
    // ResponseEntity 응답 객체 만들기
    return ResponseEntity
        .status(500)
        .body(error);
  }

  // DB조회 에러
  @ExceptionHandler(SQLException.class)
  public void db예외처리(Exception e) {
    // 1. 개발자가 확인 할 오류와 위치 와 원인 출력
    e.printStackTrace();

    // 2. 사용자에게도 알려주기!
    ErrorResponse error = new ErrorResponse(500,
        "숙조 정보를 불러오지 못했습니다.잠시후 다시 시도해주세요");

  }

  // NULL 에러
  @ExceptionHandler(NullPointerException.class)
  public void 비어있는데이터처리() {
  }

  // 주소가 우리는 /detail/1
  // url 꼬여서 주소가 문자로 오는 경우 /detail/abc
  @ExceptionHandler(MethodArgumentTypeMismatchException.class)
  public void mismatch() {
  }

  // 완전 잘못된 url을 보내는 경우!
  @ExceptionHandler(NoResourceFoundException.class)
  public void notFound() {
  }
}

/*
 * 상태코드 (HTTP status code)
 * - 서버가 브라우저에 보내는 요청 처리 결과 번호 반환
 * 
 * 1. 첫번째 숫자로 큰 의미를 구분한다.
 * 1XX 진행 안내 요청을 처리중입니다
 * 2XX 성공 요청을 처리했습니다
 * 3XX 이동.캐시관련 다른 주소로 가거나 저장된 결과를 사용하세요
 * 4XX 요청 관련 주소,입력,인증 잘못 된 경우 확인하세요
 * 5XX 서버측 문제 서버가 요청을 처리하지 못했다!
 * 
 * 2. 성공했을 때 종류
 * 200 OK 정상 처리 숙소조회성공
 * 201 created 새 데이터 생성 성공 새숙소를 등록성공
 * 204 No Content 성공했지만 응답이없음 숙소삭제 반환데이터없음
 * 
 * 3. 이동하거나 캐시를 사용할 때
 * 301
 * 302
 * 304 Not Modified 변경되지 않았으니 기존 캐시 사용!
 * 
 */