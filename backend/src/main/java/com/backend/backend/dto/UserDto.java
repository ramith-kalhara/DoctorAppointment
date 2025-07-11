package com.backend.backend.dto;

import com.backend.backend.entity.User;
import lombok.Data;
import org.modelmapper.ModelMapper;

import java.util.ArrayList;
import java.util.List;

@Data
public class UserDto {
    private Long id;

    private String name;
    private String email;
    private String password;

    // Add this
    private List<AppointmentDto> appointments = new ArrayList<>();

    public User toEntity(ModelMapper modelMapper) {
        return modelMapper.map(this, User.class);
    }

}