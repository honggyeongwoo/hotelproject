package com.yosai.backend.config;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

// 스프링아 이 클래스는 공통기능 담당자야 
@Aspect
@Component // 스프링아 객체 생성해서 Ioc컨테이너에 넣어놔!
public class AopConfig {

  @Around("execution(* com.yosai.backend..*(..))")
  public Object 전후로그(ProceedingJoinPoint pJoinPoint) throws Throwable {
    System.out.println("실행전: " + pJoinPoint
        .getSignature()
        .toShortString());
    // 진짜 메서드 동작을 해야된다.
    Object result = pJoinPoint.proceed();

    // 실행후 로그
    System.out.println("** 실행후 : " + pJoinPoint
        .getSignature()
        .toShortString() + "**");

    return result;

  }

}
/*
 * AOP(Aspect-Oriented Programming)
 * - 여러 기능에 공통으로 필요한 코드를 따로 모아서 적용하는 방식
 * - 관점 지향 프로그래밍
 * 개발을 할때 핵심코드들, 개발할때 디버깅 (코드가 실행하는 시간,걸린시간,
 * 개발자 입장에 로그 확인) 부가적인 코드
 * 
 * AOP를 사용하기 위해서 라이브러리
 * - build.gradle 안 참조!
 * 
 * AOP에 필요한 도구
 * 
 * @Before - 패키지(폴더)안에 있는 모든 메서드가 실행되기 전에!
 * JoinPoint - 지금 실행되는 메서드의 정보를 담고 있는 객체
 * - 어떤 클래스 인지?
 * - 어떤 메서드 인지?
 * - 어떤 매개변수가 들어있는지?
 * 
 * @After - 메서드가 끝난 후 로그를 찍어라!
 * 에러가 나든 성공하든 무조건 실행!
 * 
 * @AfterReturning
 * - 성공했을 때만 반환 타입을 보여라!
 * 
 * @AfterThrowing
 * - 예외가 난 후 이때만 반환타입,로그를 찍어라!
 * 
 * @Around
 * - 실행 전후에 로그를 찍고 나서 결과값을 반환을 받아야된다.
 * 
 * 특정 폴더만 출력
 * - Pointcut(within())
 * 
 * execution(반환타입 패키지명.클래스명.메서드명(매개변수)) - 메서드 실행
 * execution(* com.yosai.backend.controller.*.*(..))
 * 첫번째 * -> 아무거나
 * 두번째 com.yosai.backend.controller -> 패키지명
 * 세번째 * -> 폴더안에 있는 모든 자바파일들
 * 네번째 * -> 그 자바 파일안에 모든 메서드들!
 * 다섯번째 (..)-> 매개변수 아무거나
 * 
 * 
 * 
 * @Before("execution(* com.yosai.backend.controller.*.*(..))")
 * public void 시작로그() {
 * System.out.println("컨트롤러 실행 전!");
 * }
 * 
 * // 서비스 폴더 안에 있는 파일들이 시작하기 전에 로그 찍기
 * 
 * @Before("execution(* com.yosai.backend.service.*.*(..))")
 * public void 서비스시작로그() {
 * System.out.println("서비스 실행 전!");
 * }
 * 위에 처럼 작성하면 자동으로 로그가 찍혀좋은데 어떤 클래스파일이
 * 어떤 메서드를 실행하는지 모른다.
 * 파일명,메서드명을 같이 찍고 싶다.
 * 
 * @Before("execution(* com.yosai.backend.controller.*.*(..))")
 * public void 시작로그(JoinPoint joinPoint) {
 * String name = joinPoint
 * .getSignature() // 정보가져와
 * .toShortString(); // 클래스명 + 메서드 가져와!
 * 
 * System.out.println("[전달값] : " + Arrays.toString(joinPoint.getArgs()));
 * 
 * System.out.println(name + "컨트롤러 실행 전!");
 * }
 * 
 * // 서비스 폴더 안에 있는 파일들이 시작하기 전에 로그 찍기
 * 
 * @Before("execution(* com.yosai.backend.service.*.*(..))")
 * public void 서비스시작로그(JoinPoint joinPoint) {
 * String name = joinPoint
 * .getSignature() // 정보가져와
 * .toShortString(); // 클래스명 + 메서드 가져와!
 * System.out.println(name + " 서비스 실행 전!");
 * }
 * 
 * @After("execution(* com.yosai.backend.controller.*.*(..))")
 * public void 시작로그(JoinPoint joinPoint) {
 * 
 * System.out.println("컨트롤러 실행 후!");
 * }
 * 
 * // 서비스 폴더 안에 있는 파일들이 메서드가 끝난 후에 로그 찍기
 * 
 * @After("execution(* com.yosai.backend.service.*.*(..))")
 * public void 서비스시작로그(JoinPoint joinPoint) {
 * 
 * System.out.println(" 서비스 실행 후!");
 * }
 */
