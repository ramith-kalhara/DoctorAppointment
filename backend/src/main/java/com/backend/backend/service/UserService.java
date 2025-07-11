package com.backend.backend.service;

import com.backend.backend.dto.LoginRequestDto;
import com.backend.backend.dto.LoginResponseDto;
import com.backend.backend.dto.UserDto;

import java.util.List;

public interface UserService {
    public UserDto postUser(UserDto userDto);
    public  UserDto getUserById(long id);
    LoginResponseDto authenticateUser(LoginRequestDto loginRequestDto);
    public List<UserDto> getAllUsers();
    public UserDto updateUser(Long id,  UserDto userDto);
    public Boolean deleteUser(Long id);
}
