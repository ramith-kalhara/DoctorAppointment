import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const OtpVerification = () => {
  const [otp, setOtp] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;

  const handleOtpVerify = async (e) => {
    e.preventDefault();

    if (!otp) {
      Swal.fire("Error", "Please enter OTP", "error");
      return;
    }

    try {
      const response = await fetch("http://localhost:8086/api/user/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();

      if (!response.ok) {
        Swal.fire("Error", data, "error");
        return;
      }

      // Save token and user details
      localStorage.setItem("user", JSON.stringify({
        userId: data.userId,
        email: data.email,
        role: data.role,
        token: data.token,
      }));

      Swal.fire("Success", "Login completed", "success");
      navigate("/home");

    } catch (err) {
      Swal.fire("Error", "OTP verification failed", "error");
    }
  };

  return (
    <div>
      <h2>Enter OTP sent to {email}</h2>
      <form onSubmit={handleOtpVerify}>
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <button type="submit">Verify OTP</button>
      </form>
    </div>
  );
};

export default OtpVerification;
