package com.backend.backend.service.impl;


import com.backend.backend.dto.AppointmentDto;
import com.backend.backend.entity.Appointment;
import com.backend.backend.exception.NotFoundException;
import com.backend.backend.repository.AppointmentRepository;
import com.backend.backend.repository.UserRepository;
import com.backend.backend.service.AppointmentService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AppointmentServiceImpl implements AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public AppointmentServiceImpl(AppointmentRepository appointmentRepository, UserRepository userRepository, ModelMapper modelMapper) {
        this.appointmentRepository = appointmentRepository;
        this.modelMapper = modelMapper;
    }

    //create appointment
    @Override
    public AppointmentDto postAppointment(AppointmentDto appointmentDto) {
        Appointment appointment = appointmentDto.toEntity(modelMapper);
        Appointment savedAppointment=  appointmentRepository.save(appointment);
        return savedAppointment.toDto(modelMapper);
    }

    //get all appointment
    @Override
    public List<AppointmentDto> getAllAppointments() {
        List<Appointment> itemsRepositoryAll = appointmentRepository.findAll();
        if(itemsRepositoryAll.isEmpty()){
            return new ArrayList<>();
        }else{
            return itemsRepositoryAll.stream().map(appointment -> appointment.toDto(modelMapper)).toList();

        }
    }

    //update appointment
    @Override
    public AppointmentDto updateAppointment(Long id, AppointmentDto appointmentDto) {
        Appointment appointment = appointmentDto.toEntity(modelMapper);
        appointment.setId(id);
        Appointment savedAppointment = appointmentRepository.save(appointment);
        return savedAppointment.toDto(modelMapper);
    }

    //delete appointment
    @Override
    public Boolean deleteAppointment(Long id) {
        appointmentRepository.deleteById(id);
        return true;
    }

    @Override
    public List<AppointmentDto> getAppointmentByUserId(long userId) {
        List<Appointment> appointments = appointmentRepository.findByUserId(userId);
        return appointments.stream()
                .map(appointment -> modelMapper.map(appointment, AppointmentDto.class))
                .collect(Collectors.toList());
    }

    //get appointment by id
    @Override
    public AppointmentDto getAppointmentById(long id) {
        Optional<Appointment> appointment = appointmentRepository.findById(id);
        if(appointment.isPresent()){
            return  appointment.get().toDto(modelMapper);
        }else {
            throw new NotFoundException("Appointment not found by this ID");
        }

    }




}
