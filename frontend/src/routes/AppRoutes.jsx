import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import UserLayout from '../layouts/UserLayout';
import Home from '../pages/user/Home';
import About_Page from '../pages/user/About_Page';
import Doctors_Page from '../pages/user/Doctors_Page';
import Contact_Page from '../pages/user/Contact_Page';
import Appointment_Page from '../pages/user/Appointment_Page';
import AppointmentDetails_Page from '../pages/user/AppointmentDetails_Page';
import LoginSignup_Page from '../pages/user/LoginSignup_Page';
import ProtectedRoute from './ProtectedRoute';
import UpdateAppointment_Page from '../pages/user/UpdateAppointment_Page';




const AppRoutes = () => {
  return (
    <Routes>
      {/* public path  */}
      <Route path="/" element={<LoginSignup_Page />} />

      {/* peotected path  */}
      <Route element={<ProtectedRoute><UserLayout /></ProtectedRoute>}>
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About_Page />} />
        <Route path="/team" element={<Doctors_Page />} />
        <Route path="/contact" element={<Contact_Page />} />
        <Route path="/appointment" element={<Appointment_Page />} />
        <Route path="/appointmentDetails" element={<AppointmentDetails_Page />} />
          <Route path="/updateAppointment/:appointmentId" element={<UpdateAppointment_Page />} />
      </Route>

  
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;