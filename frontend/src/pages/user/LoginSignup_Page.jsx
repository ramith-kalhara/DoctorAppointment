import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from '../../assets/style/css/loginstyle.module.css';
import signin from '../../assets/img/signin-image.jpg';
import signup from '../../assets/img/signup-image.jpg';
import '../../assets/style/fonts/material-icon/css/material-design-iconic-font.css'
import Swal from "sweetalert2";
const LoginSignup_Page = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [repeatPassword, setRepeatPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);




  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const nameRegex = /^[a-zA-Z.\s]+$/;


    if (!name) {
      Swal.fire({
        icon: "error",
        title: "Name Required",
        text: "Please enter your name.",
      });
      return;
    }

    if (!nameRegex.test(name)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Name",
        text: "Name can only contain letters, spaces, and dots.",
      }); 
      return;
    }

    if (!email || !emailRegex.test(email)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Email",
        text: "Please enter a valid email address.",
      });
      return;
    }

    if (!password) {
      Swal.fire({
        icon: "error",
        title: "Password Required",
        text: "Please enter your password.",
      });
      return;
    }

    if (password.length < 5) {
      Swal.fire({
        icon: "error",
        title: "Weak Password",
        text: "Password must be at least 5 characters long.",
      });
      return;
    }

    if (password !== repeatPassword) {
      Swal.fire({
        icon: "error",
        title: "Password Mismatch",
        text: "The passwords do not match. Please try again.",
      });
      return;
    }


    try {
      const response = await fetch("http://localhost:8086/api/user/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          password
        })
      });
      const data = await response.json();


      if (!response.ok) {
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: data.message || "Something went wrong.",
        });
        return;
      }

      Swal.fire({
        icon: "success",
        title: "Registration Successful",
        text: "You have been registered successfully!",
      });

      navigate("/login");

    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "Something went wrong.",
      });
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      Swal.fire({
        icon: "error",
        title: "Missing Fields",
        text: "Please enter both email and password.",
      });
      return;
    }



    try {
      const response = await fetch("http://localhost:8086/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: data.massage || "Invalid credentials.",
        });
        return;
      }

      if (data.massage === "OTP sent to email") {
        Swal.fire("Check Your Email", "OTP has been sent", "info");
        navigate("/otp-verification", { state: { email: email } });
        console.log("Navigation called");
      }

    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "Something went wrong. Try again.",
      });
    }
  };

  return (
    <div>
      <div>
        <div className={styles.main}>
          {/* Sign up form */}
          <section className={styles.signup} id="signup-section">
            <div className={styles.container}>
              <div className={styles["signup-content"]}>
                <div className={styles["signup-form"]}>
                  <h2 className={styles["form-title"]}>Sign up</h2>
                  <form method="POST" className={styles["register-form"]} id="register-form" onSubmit={handleSubmit}>
                    <div className={styles["form-group"]}>
                      <label htmlFor="name">
                        <i className="zmdi zmdi-account material-icons-name" />
                      </label>
                      <input type="text" name="name" id="name" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className={styles["form-group"]}>
                      <label htmlFor="email">
                        <i className="zmdi zmdi-email" />
                      </label>
                      <input type="email" name="email" id="email" placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className={styles["form-group"]} style={{ position: "relative" }}>
                      <label htmlFor="pass">
                        <i className="zmdi zmdi-lock" />
                      </label>
                      <input
                        type={showPassword ? "text" : "password"}
                        name="pass"
                        id="pass"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <i
                        className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                        onClick={() => setShowPassword(!showPassword)}
                        style={{
                          position: "absolute",
                          right: "10px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          cursor: "pointer",
                          color: "#999"
                        }}
                      ></i>
                    </div>

                    <div className={styles["form-group"]} style={{ position: "relative" }}>
                      <label htmlFor="re_pass">
                        <i className="zmdi zmdi-lock-outline" />
                      </label>
                      <input
                        type={showRepeatPassword ? "text" : "password"}
                        name="re_pass"
                        id="re_pass"
                        placeholder="Repeat your password"
                        value={repeatPassword}
                        onChange={(e) => setRepeatPassword(e.target.value)}
                      />
                      <i
                        className={`fas ${showRepeatPassword ? "fa-eye-slash" : "fa-eye"}`}
                        onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                        style={{
                          position: "absolute",
                          right: "10px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          cursor: "pointer",
                          color: "#999"
                        }}
                      ></i>
                    </div>

                    <div className={styles["form-group"]}>
                      <input type="checkbox" name="agree-term" id="agree-term" className={styles.agreeTerm} />
                      <label htmlFor="agree-term" className={styles.labelAgreeTerm}>
                        <span><span /></span>
                        I agree to all statements in
                        <a href="#" className={styles.termService}>Terms of service</a>
                      </label>
                    </div>
                    <div className={`${styles["form-group"]} ${styles["form-button"]}`}>
                      <input type="submit" name="signup" id="signup" className={styles["form-submit"]} defaultValue="Register" />
                    </div>
                  </form>
                </div>
                <div className={styles.signupImage}>
                  <figure>
                    <img src={signup} alt="sign up" />
                  </figure>
                  <a href="#sign-in-section" className={styles.signupImageLink}>I am already a member</a>
                </div>
              </div>
            </div>
          </section>

          {/* Sign in Form */}
          <section className={styles["sign-in"]} id="sign-in-section">
            <div className={styles.container}>
              <div className={styles["signin-content"]}>
                <div className={styles["signin-image"]}>
                  <figure>
                    <img src={signin} alt="sign in" />
                  </figure>
                  <a href="#signup-section" className={styles["signup-image-link"]}>Create an account</a>
                </div>
                <div className={styles["signin-form"]}>
                  <h2 className={styles["form-title"]}>Sign in</h2>
                  <form method="POST" className={styles["register-form"]} id="login-form" onSubmit={handleLogin}>
                    <div className={styles["form-group"]}>
                      <label htmlFor="your_name">
                        <i className="zmdi zmdi-account material-icons-name" />
                      </label>
                      <input type="email" name="your_email" id="your_email" placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                 <div className={styles["form-group"]} style={{ position: "relative" }}>
  <label htmlFor="your_pass">
    <i className="zmdi zmdi-lock" />
  </label>
  <input
    type={showLoginPassword ? "text" : "password"}
    name="your_pass"
    id="your_pass"
    placeholder="Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
  />
  <i
    className={`fas ${showLoginPassword ? "fa-eye-slash" : "fa-eye"}`}
    onClick={() => setShowLoginPassword(!showLoginPassword)}
    style={{
      position: "absolute",
      right: "10px",
      top: "50%",
      transform: "translateY(-50%)",
      cursor: "pointer",
      color: "#999"
    }}
  ></i>
</div>


                    <div className={`${styles["form-group"]} ${styles["form-button"]}`}>
                      <input type="submit" name="signin" id="signin" className={styles["form-submit"]} defaultValue="Log in" />
                    </div>
                  </form>

                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default LoginSignup_Page