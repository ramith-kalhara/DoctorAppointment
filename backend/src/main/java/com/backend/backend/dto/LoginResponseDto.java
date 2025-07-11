package com.backend.backend.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Data
public class LoginResponseDto {
    private String massage;
    private Long userId;
    private String email;
    private String password;
    private String role;
}
