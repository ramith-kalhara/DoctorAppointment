package com.backend.backend.dto;

import lombok.Data;

@Data
public class OtpVerificationDto {
    private String email;
    private String otp;
}
