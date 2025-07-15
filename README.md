# 🩺 Appointment Booking Web Application

This is a full-stack web application built using **Spring Boot** (Java 17) for the backend and **React** for the frontend. It allows users to sign up, log in using email and password, and use **2-Factor Authentication (2FA)** via email OTP. Once logged in, users can create, view, update, and delete their appointments through an intuitive web interface.

---

## 🔍 Project Overview

### ✨ Features

- ✅ User Registration with valid email
- 🔐 Secure Login with Email + Password
- 🔁 **Two-Factor Authentication (2FA)** via Email OTP
- 📅 Appointment Management:
  - Create appointment ( defferent doctor have defferent time slot ) 
  - View appointments
  - Update and delete appointments
- 🧭 Navigation via a responsive navbar
- 📄 Additional pages for more information

---

## ⚙️ Tech Stack

| Layer        | Technology              |
|--------------|--------------------------|
| Backend      | Java 17, Spring Boot, Maven |
| Frontend     | React, Vite, JavaScript |
| Database     | MySQL                   |
| Auth & OTP   | JWT & Email OTP         |

---

## 🚀 Getting Started

### 📦 Prerequisites

Make sure you have the following installed on your system:

- Java 17+
- Maven
- Node.js & npm
- MySQL Server

---

## 🖥️ Backend Setup (Spring Boot)

1. **Clone the repository**

   ```bash
   git clone https://github.com/ramith-kalhara/DoctorAppointment.git


2. **Configure MySQL Database**
    ```bash
    spring.datasource.username=your_mysql_username
    spring.datasource.password=your_mysql_password

4. **Run the Backend**
   Open the project in IntelliJ IDEA, let it load Maven dependencies, and simply click Run to start the backend server.


## 🖥️ Frontend Setup (React)
1. **Navigate to the frontend folder**
   ```bash
   cd DoctorAppointment\frontend
   
3. **Install dependencies**
     ```bash
     npm install
4. **Start the React app**
   ```bash
   npm run dev
  
**The app should open at:** [`http://localhost:5173`](http://localhost:5173)




