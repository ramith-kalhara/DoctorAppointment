package com.backend.backend.service;


import com.backend.backend.dto.AppointmentDto;

import java.util.List;

public interface AppointmentService {
    public AppointmentDto postAppointment(AppointmentDto appointmentDto);
    public List<AppointmentDto> getAllAppointments();
    public AppointmentDto getAppointmentById(long id);
    public AppointmentDto updateAppointment(Long id,AppointmentDto appointmentDto);
    public Boolean deleteAppointment(Long id);
    public List<AppointmentDto> getAppointmentByUserId(long userId);
}
