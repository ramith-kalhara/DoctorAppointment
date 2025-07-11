package com.backend.backend.repository;

import com.backend.backend.entity.Appointment;
import com.backend.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AppointmentRepository  extends JpaRepository<Appointment, Long > {

    List<Appointment> findByUserId(Long userId);

    List<Appointment> findByUser(User user);


}
