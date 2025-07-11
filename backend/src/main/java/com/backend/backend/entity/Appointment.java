package com.backend.backend.entity;

import com.backend.backend.dto.AppointmentDto;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.modelmapper.ModelMapper;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String tp_num;
    private String doctor_name;
    private String date;
    private String time;
    private String description;
    private Long userId;




    public AppointmentDto toDto(ModelMapper mapper) {
        AppointmentDto appointmentDto = mapper.map(this, AppointmentDto.class);
        return appointmentDto;
    }
}
