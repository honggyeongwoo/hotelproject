package com.yosai.backend.exception;

import lombok.Getter;

//  사용자에게 보낼 에러 데이터 저장하는 클래스!
@Getter
public class ErrorResponse {
  private final int status; // 상태코드
  private final String message; // 에러메시지

  // 객체를 만들 때 상태코드와 메시지를 저장해줘!
  public ErrorResponse(int status, String message) {
    this.status = status;
    this.message = message;
  }
}
