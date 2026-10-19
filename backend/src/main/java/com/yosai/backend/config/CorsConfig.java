package com.yosai.backend.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

// 컨트롤러 위에 origin 세팅을 하면 그 컨트롤러만 적용이 된다!
// 모든 컨트롤러가 공통적으로 적용하려면 config 폴더 안에서 
// 설정을 하고 스프링한테 알려준다!

@Configuration // 스프링아 설정 객체야
public class CorsConfig implements WebMvcConfigurer {

  private final String[] allowedOrigins;

  public CorsConfig(@Value("${app.cors.allowed-origins}") String[] allowedOrigins) {
    this.allowedOrigins = allowedOrigins;
  }

  @Override
  public void addCorsMappings(CorsRegistry registry) {

    registry.addMapping("/**") // 모든 주소에 적용!
        .allowedOrigins(allowedOrigins) // 출처
        .allowedMethods("GET", "POST") // 전송방식
        .allowCredentials(true);
  }
}
