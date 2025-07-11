import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserLayout from './layouts/UserLayout';
import Home from './pages/user/Home';
import About_Page from './pages/user/About_Page';
import Doctors_Page from './pages/user/Doctors_Page';
import Contact_Page from './pages/user/Contact_Page';
import Appointment_Page from './pages/user/Appointment_Page';
import AppointmentDetails_Page from './pages/user/AppointmentDetails_Page';
function App() {
  

  return (
    <>

      <Router>
        <UserLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About_Page />} />
            <Route path="/team" element={<Doctors_Page />} />
            <Route path="/contact" element={<Contact_Page />} />
            <Route path="/appointment" element={<Appointment_Page />} />
             <Route path="/appointmentDetails" element={<AppointmentDetails_Page />} />
          </Routes>
        </UserLayout>
      </Router>
    </>
  )
}

export default App
