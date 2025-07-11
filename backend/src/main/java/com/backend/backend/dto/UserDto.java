package com.backend.backend.dto;

import com.backend.backend.entity.User;
import lombok.Data;
import org.modelmapper.ModelMapper;

@Data
public class UserDto {
    private Long id;

    private String name;
    private String email;
    private String password;

    public User toEntity(ModelMapper modelMapper) {
        return modelMapper.map(this, User.class);
    }

}