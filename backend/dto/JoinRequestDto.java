package com.yosai.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class JoinRequestDto {

    private String userId;
    private String pw;
    private String phone;
    private String email;
}
