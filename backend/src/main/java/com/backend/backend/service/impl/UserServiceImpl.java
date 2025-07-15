package com.backend.backend.service.impl;


import com.backend.backend.config.JwtUtil;
import com.backend.backend.dto.LoginRequestDto;
import com.backend.backend.dto.LoginResponseDto;
import com.backend.backend.dto.UserDto;
import com.backend.backend.entity.Appointment;
import com.backend.backend.entity.Otp;
import com.backend.backend.entity.User;
import com.backend.backend.exception.NotFoundException;
import com.backend.backend.repository.OtpRepository;
import com.backend.backend.repository.UserRepository;
import com.backend.backend.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    private final OtpRepository otpRepository;
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder;
    @Autowired
    private JwtUtil jwtUtil;

    // Constructor Injection
    @Autowired
    public UserServiceImpl(UserRepository userRepository, ModelMapper modelMapper, OtpRepository otpRepository, EmailService emailService, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
        this.otpRepository = otpRepository;
        this.emailService = emailService;
        this.passwordEncoder = passwordEncoder;
    }

    //create user
    @Override
    public UserDto postUser(UserDto userDto) {
        User user = userDto.toEntity(modelMapper);

        String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);

        // Set user reference for each appointment
        if (user.getAppointments() != null) {
            for (Appointment appointment : user.getAppointments()) {
                appointment.setUser(user); // important to set the owner
            }
        }

        Optional<User> existingUser = userRepository.findByEmail(userDto.getEmail());
        if (existingUser.isPresent()) {
            throw new RuntimeException("Email is already in use");
        }


        User saveduser =  userRepository.save(user);
        return saveduser.toDto(modelMapper);
    }

    //get user by id
    @Transactional(readOnly = true)
    @Override
    public UserDto getUserById(long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("User not found"));
        user.getAppointments().size(); // force loading if lazy
        return user.toDto(modelMapper);
    }



    @Override
    public List<UserDto> getAllUsers() {
        List<User> usersRepository = userRepository.findAll();
        if (usersRepository.isEmpty()) {
            return new ArrayList<>();
        } else {
            return usersRepository.stream().map(user -> user.toDto(modelMapper)).toList();
        }
    }

    @Override
    public UserDto updateUser(Long id, UserDto userDto) {
        User user = userDto.toEntity(modelMapper);
        user.setId(id);
        User saveduser = userRepository.save(user);
        return saveduser.toDto(modelMapper);
    }

    @Override
    public Boolean deleteUser(Long id) {
        userRepository.deleteById(id);
        return true;
    }

    //check login
    // Authenticate user by email and password
    @Override
    @Transactional
    public LoginResponseDto authenticateUser(LoginRequestDto loginRequestDto) {
        User user = userRepository.findByEmail(loginRequestDto.getEmail())
                .orElseThrow(() -> new NotFoundException("User not found"));

        // Check hashed password
        if (!passwordEncoder.matches(loginRequestDto.getPassword(), user.getPassword())) {
            throw new RuntimeException("Wrong password");
        }


        // Generate OTP
        String otp = String.valueOf(new Random().nextInt(999999 - 100000) + 100000);

        // Save or update OTP
        otpRepository.deleteByEmail(user.getEmail());
        Otp otpEntity = new Otp();
        otpEntity.setEmail(user.getEmail());
        otpEntity.setOtpCode(otp);
        otpEntity.setExpiryTime(LocalDateTime.now().plusMinutes(5));
        otpRepository.save(otpEntity);

        // Send Email
        emailService.sendOtpEmail(user.getEmail(), otp);

        LoginResponseDto response = new LoginResponseDto();
        response.setMassage("OTP sent to email");
        response.setEmail(user.getEmail());

        return response;
    }


}
