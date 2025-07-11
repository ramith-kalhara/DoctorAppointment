package com.backend.backend.controller;


import com.backend.backend.dto.AppointmentDto;
import com.backend.backend.service.impl.AppointmentServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/appointment")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class AppointmentController {
    private final AppointmentServiceImpl appointmentService;

    //crete appointment
    @PostMapping("/create")
    public ResponseEntity<AppointmentDto> postAppointment(@RequestBody AppointmentDto appointmentDto) {
        return ResponseEntity.status(HttpStatus.OK).body(appointmentService.postAppointment(appointmentDto));
    }

    //get all appointment
    @GetMapping("/")
    private ResponseEntity<List<AppointmentDto>> getAllAppointment() {
        return  ResponseEntity.status(HttpStatus.OK).body(appointmentService.getAllAppointments());
    }

    //update appointment
    @PutMapping("/{id}")
    public ResponseEntity<AppointmentDto> updateAppointment(@PathVariable long id, @RequestBody AppointmentDto appointmentDto) {
        return ResponseEntity.status(HttpStatus.OK).body(appointmentService.updateAppointment(id, appointmentDto));
    }

    //delete appointment
    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> deleteAppointment(@PathVariable long id) {
        return  ResponseEntity.status(HttpStatus.OK).body(appointmentService.deleteAppointment(id));
    }

    //get appointment by id
    @GetMapping("/{id}")
    public ResponseEntity<AppointmentDto> getAppointmentById(@PathVariable long id) {
        return  ResponseEntity.status(HttpStatus.OK).body(appointmentService.getAppointmentById(id));
    }

    // Get appointments by userId
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<AppointmentDto>> getAppointmentsByUserId(@PathVariable long userId) {
        return ResponseEntity.status(HttpStatus.OK).body(appointmentService.getAppointmentByUserId(userId));
    }

}
