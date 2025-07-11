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


 const handleSubmit = async (e) => {
  e.preventDefault();

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  if (!name) {
    Swal.fire({
      icon: "error",
      title: "Name Required",
      text: "Please enter your name.",
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

  if (password !== repeatPassword) {
    Swal.fire({
      icon: "error",
      title: "Password Mismatch",
      text: "The passwords do not match. Please check and try again.",
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

    if (!response.ok) {
      const errorData = await response.json();
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: errorData.message || "Something went wrong.",
      });
      return;
    }

    Swal.fire({
      icon: "success",
      title: "Registration Successful",
      text: "You have been registered successfully!",
    });

    // Optionally redirect to login
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
        text: data.message || "Invalid credentials.",
      });
      return;
    }

    // Save to localStorage
    localStorage.setItem("user", JSON.stringify({
      userId: data.userId,
      email: data.email,
      role: data.role,
    }));

    Swal.fire({
      icon: "success",
      title: "Login Successful",
      text: `Welcome, ${data.email}!`,
    });

    // Redirect to dashboard or home
    navigate("/home"); // Change to your desired route

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
                          <input type="text" name="name" id="name" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)}/>
                        </div>
                        <div className={styles["form-group"]}>
                          <label htmlFor="email">
                            <i className="zmdi zmdi-email" />
                          </label>
                          <input type="email" name="email" id="email" placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)}  />
                        </div>
                        <div className={styles["form-group"]}>
                          <label htmlFor="pass">
                            <i className="zmdi zmdi-lock" />
                          </label>
                          <input type="password" name="pass" id="pass" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className={styles["form-group"]}>
                          <label htmlFor="re-pass">
                            <i className="zmdi zmdi-lock-outline" />
                          </label>
                          <input type="password" name="re_pass" id="re_pass"value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} placeholder="Repeat your password" />
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
                        <div className={styles["form-group"]}>
                          <label htmlFor="your_pass">
                            <i className="zmdi zmdi-lock" />
                          </label>
                          <input type="password" name="your_pass" id="your_pass" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
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