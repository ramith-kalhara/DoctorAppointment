package com.backend.backend.controller;

import com.backend.backend.config.JwtUtil;
import com.backend.backend.dto.LoginRequestDto;
import com.backend.backend.dto.LoginResponseDto;
import com.backend.backend.dto.OtpVerificationDto;
import com.backend.backend.dto.UserDto;
import com.backend.backend.entity.Otp;
import com.backend.backend.entity.User;
import com.backend.backend.exception.NotFoundException;
import com.backend.backend.repository.OtpRepository;
import com.backend.backend.repository.UserRepository;
import com.backend.backend.service.impl.UserServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/user")
@RequiredArgsConstructor
public class UserController {
    private final UserServiceImpl userService;
    private final OtpRepository otpRepository;
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    //create user
    @PostMapping("/create")
    public ResponseEntity<UserDto> postUser(@RequestBody UserDto userDto){
        return ResponseEntity.status(HttpStatus.OK).body(userService.postUser(userDto));
    }

    //get user by id
    @GetMapping("/{id}")
    public ResponseEntity<UserDto> getUserById(@PathVariable long id){
        return ResponseEntity.status(HttpStatus.OK).body(userService.getUserById(id));
    }

    //Check email and password
    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> authenticateUser(@RequestBody LoginRequestDto loginRequestDto) {
        LoginResponseDto reponse = userService.authenticateUser(loginRequestDto);
        return ResponseEntity.status(HttpStatus.OK).body(reponse);

    }

    //get all Users
    @GetMapping("/")
    private ResponseEntity<List<UserDto>> getAllUsers() {
        return ResponseEntity.status(HttpStatus.OK).body(userService.getAllUsers());
    }

    //update user
    @PutMapping("/{id}")
    public ResponseEntity<UserDto> updateUser(@PathVariable long id, @RequestBody UserDto userDto) {
        return ResponseEntity.status(HttpStatus.OK).body(userService.updateUser(id, userDto));
    }

    //delete user
    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> deleteUser(@PathVariable long id) {
        return ResponseEntity.status(HttpStatus.OK).body(userService.deleteUser(id));
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtp(@RequestBody OtpVerificationDto request) {
        Optional<Otp> otpOptional = otpRepository.findByEmail(request.getEmail());

        if (otpOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("OTP not found");
        }

        Otp otp = otpOptional.get();
        if (otp.getExpiryTime().isBefore(LocalDateTime.now())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("OTP expired");
        }

        if (!otp.getOtpCode().equals(request.getOtp())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid OTP");
        }

        // OTP is valid → generate token
        User user = userRepository.findByEmail(request.getEmail()).orElseThrow();
        String token = jwtUtil.generateToken(user.getEmail());

        // delete OTP after use
        otpRepository.delete(otp);

        LoginResponseDto response = new LoginResponseDto();
        response.setMassage("Login successful");
        response.setEmail(user.getEmail());
        response.setUserId(user.getId());
        response.setRole(user.getRole());
        response.setToken(token);

        return ResponseEntity.ok(response);
    }





}