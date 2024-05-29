import React, { useState,useEffect, useContext } from "react";
import { loginContext } from "../../context/loginContext";
import { useNavigate, Link } from "react-router-dom";
import { useForm} from "react-hook-form";
import annyang from "annyang";
import { RecoveryContext } from "../../App";
import "./Login.css";
import axios from "axios";

function Login() {
  const { setEmail, setPage, email, setOTP } = useContext(RecoveryContext);
  let navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, setValue,watch } = useForm();

  const watchedEmail = watch("email", "");
  const watchedPassword = watch("password", "");
  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
      setValue(name, value); // Update the form value using setValue
     
  };
 


  let [currentUser, error, userLoginStatus, loginUser, logoutUser, role] =
    useContext(loginContext);

  let handleUserLogin = (userobj) => {
    loginUser(userobj);
    console.log("successful login ");
  };

  useEffect(() => {
    if (userLoginStatus === true) {
      navigate("/jobs/public");
    }
  }, [userLoginStatus]);

  useEffect(() => {
    const updateEmailField = (variable) => {
      const emailField = document.getElementById("email");
      emailField.focus();
      emailField.value += variable.toLowerCase(); // Convert to lowercase
    };
    if (annyang) {
      const commands = {
        // ... existing voice commands
      };

      annyang.debug();
      annyang.addCommands(commands);
      annyang.setLanguage("en-US");
      annyang.start();

      // Clean up annyang when the component unmounts
      return () => {
        annyang.removeCommands();
        annyang.abort();
      };
    } else {
      console.error("Annyang not available");
    }
  }, []);
 
  const nagigateToOtp = () => {
    // Check if watchedEmail is not provided
    if (!watchedEmail) {
      alert("Please enter your email");
      return;
    }

    // Generate OTP and send recovery email
    const OTP = Math.floor(Math.random() * 9000 + 1000);
    console.log(OTP);
    setOTP(OTP);
    navigate("/otp");
    setEmail(watchedEmail)
    axios
      .post("/send_recovery_email", {
        OTP,
        recipient_email: watchedEmail,
      })
      .then(() => {
        // Navigate to "/otp"
        navigate("/otp");
      })
      .catch(console.log);
  };
  
  


  return (
    <div className="Login container pt-5">
      {error?.length !== 0 && <p className="text-danger display-1"> {error}</p>}

      <div className="cat m-auto shadow-lg rounded">
        <h2 className="title">Login</h2>
        <form onSubmit={handleSubmit(handleUserLogin)} action="">
      <div className="inputbox form-floating">
        <i className="fa-regular fa-user"></i>
        <input
          type="email"
          id="email"
          className="form-control"
          name="email"
          onChange={handleInputChange}
          {...register("email", { required: true, pattern: /^\S+@\S+$/ })}
          placeholder="xyz"
        />
        <label htmlFor="email" className="text-dark">
          email
        </label>
        {errors.email && errors.email.type === "required" && (
          <p className="text-danger">*enter your email</p>
        )}
        {errors.email && errors.email.type === "pattern" && (
          <p className="text-danger">*enter Link valid email address</p>
        )}
      </div>

      <div className="inputbox form-floating">
        <i className="fa-solid fa-lock"></i>
        <input
          type="password"
          id="password"
          className="form-control"
          name="password"
          onChange={handleInputChange}
          {...register("password", { required: true, minLength: 4 })}
          placeholder="xyz"
        />
        <label htmlFor="password" className="text-dark">
          password
        </label>
        {errors.password && errors.password.type === "required" && (
          <p className="text-danger">*enter your password</p>
        )}
        {errors.password && errors.password.type === "minLength" && (
          <p className="text-danger">*minimum 4 password word is required</p>
        )}
      </div>

      <div>
      <Link  onClick={nagigateToOtp} className="text-gray-800">
  Forgot password?
</Link>

      </div>
      <button type="submit" id="submit-button" className="button-l d-block m-auto mt-5">
        Login
      </button>
    </form>


      </div>
    </div>
  );
}

export default Login;

