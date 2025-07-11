package com.backend.backend.entity;

import com.backend.backend.dto.AppointmentDto;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name= "user_id")
    @JsonBackReference
    private User user;




    public AppointmentDto toDto(ModelMapper mapper) {
        AppointmentDto appointmentDto = mapper.map(this, AppointmentDto.class);
        if (this.user != null) {
            appointmentDto.setUserId(this.user.getId());
        }

        return appointmentDto;
    }
}
