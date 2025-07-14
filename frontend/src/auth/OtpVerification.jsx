import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const OtpVerification = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  useEffect(() => {
    if (!email) {
      Swal.fire("Error", "Email is missing!", "error");
      navigate("/");
      return;
    }

    Swal.fire({
      title: `Enter OTP sent to ${email}`,
      input: "text",
      inputPlaceholder: "Enter 6-digit OTP",
      showCancelButton: true,
      confirmButtonText: "Verify OTP",
      cancelButtonText: "Cancel",
      preConfirm: async (otp) => {
        if (!otp) {
          Swal.showValidationMessage("Please enter the OTP");
          return false;
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
            Swal.showValidationMessage(data);
            return false;
          }

          // Save to localStorage
          localStorage.setItem("user", JSON.stringify({
            userId: data.userId,
            email: data.email,
            role: data.role,
            token: data.token,
          }));

          return true;

        } catch (err) {
          Swal.showValidationMessage("Server error during OTP verification");
          return false;
        }
      }
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Success", "Login completed", "success");
        navigate("/home");
      } else {
        navigate("/");
      }
    });
  }, [email, navigate]);

  return null; 
};

export default OtpVerification;
