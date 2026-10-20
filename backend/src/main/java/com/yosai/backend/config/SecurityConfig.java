package com.yosai.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

  // 검문소 생성했으니 검문할 메뉴얼을 저장해야된다.
  // Customizer.withDefaults() @Configuration으로 등록된
  // CorsConfig 객체를 스프링이 자동으로 집어넣어준다!
  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) {
    http
        .csrf(csrf -> csrf.disable()) // POST 유효한 토큰확인 해제
        .cors(Customizer.withDefaults())
        .logout(logout -> logout.disable()) // 시큐리티가 가지고있는 로그아웃방식 끄겠다!
        .authorizeHttpRequests(auth -> auth
            .requestMatchers("/", "/login", "/me", "/logout", "/compare", "/detail/*").permitAll()
            .anyRequest().authenticated())

        // 시큐리티가 제공하는 로그인 페이지가 아니라 내가 만든 로그인
        // 리액트 페이지를 보고싶다.
        // 외부 주소를 주었을 때 안전,인증되지 않은 사용자
        .exceptionHandling(exception -> exception
            .authenticationEntryPoint(
                (request, response, authException) -> response.sendRedirect("http://localhost:5173/login")));
    return http.build();

  }

}
