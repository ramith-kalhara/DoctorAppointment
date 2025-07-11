package com.backend.backend.service.impl;


import com.backend.backend.dto.LoginRequestDto;
import com.backend.backend.dto.LoginResponseDto;
import com.backend.backend.dto.UserDto;
import com.backend.backend.entity.Appointment;
import com.backend.backend.entity.User;
import com.backend.backend.exception.NotFoundException;
import com.backend.backend.repository.UserRepository;
import com.backend.backend.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    // Constructor Injection
    @Autowired
    public UserServiceImpl(UserRepository userRepository, ModelMapper modelMapper) {
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
    }

    //create user
    @Override
    public UserDto postUser(UserDto userDto) {
        User user = userDto.toEntity(modelMapper);
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
    public LoginResponseDto authenticateUser(LoginRequestDto loginRequestDto) {

        //find user by email
        User user = userRepository.findByEmail(loginRequestDto.getEmail())
                .orElseThrow(() -> new NotFoundException("User not found"));

        //check password is wrong
        if(!user.getPassword().equals(loginRequestDto.getPassword())) {
            throw new RuntimeException("Wrong password");
        }

        //check role is empty( user) or ADMIN
        String role = loginRequestDto.getRole();
        if (role == null || role.isEmpty()) {
            role = "USER";
        }

        if ("ADMIN".equalsIgnoreCase(role)) {

        }else if ("USER".equalsIgnoreCase(role)) {

        }else {
            throw new RuntimeException("Wrong role");
        }

        LoginResponseDto response = new LoginResponseDto();
        response.setMassage("Login successful");
        response.setUserId(user.getId());
        response.setEmail(user.getEmail());
        response.setRole(role);

        return response;
    }


}
