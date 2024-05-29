import React, { useState,useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { RecoveryContext } from "../../App";

const Reset = () => {
  const { setEmail, setPage, email, setOTP } = useContext(RecoveryContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    getValues,
  } = useForm();

  const watchedPassword = watch("password", "");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValue(name, value);
  };

  const changePassword = async () => {
    const formData = getValues();
    console.log(formData)
   let newPassword= {
    email: email, // Replace with actual user email
    password: formData.password,
  }
  console.log(newPassword)
    // Simulate API call to change password
    try {
      // Replace the following line with your actual API call
      const response = await axios.put("/user-api/change-password",newPassword);

      // Handle API response here
      if (response.status === 200) {
        console.log("API Response:", response.message);
      }
    

      // Redirect or perform other actions after successful password change
      navigate("/login");
    } catch (error) {
      // Handle API error here
      console.error("API Error:", error.message);
    }
  };

  return (
    <div>
      <section className="bg-gray-50 w-screen">
        <div className="d-flex flex-column align-items-center justify-content-center px-3 py-4 mx-auto h-100">
          <div className="w-full p-4 bg-white rounded-lg shadow-md border md:mt-0 sm:max-w-md">
            <h2 className="mb-1 text-xl font-bold leading-tight text-gray-900">
              Change Password
            </h2>
            <form
              onSubmit={handleSubmit(changePassword)}
              className="mt-4 space-y-4"
            >
              <div className="mb-3">
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
                    Password
                  </label>
                  {errors.password && errors.password.type === "required" && (
                    <p className="text-danger">* Enter your password</p>
                  )}
                  {errors.password && errors.password.type === "minLength" && (
                    <p className="text-danger">
                      * Minimum 4 characters password is required
                    </p>
                  )}
                </div>
              </div>

              <div className="mb-3">
                <div className="inputbox form-floating">
                  <i className="fa-solid fa-lock"></i>
                  <input
                    type="password"
                    id="confirmPassword"
                    className="form-control"
                    name="confirmPassword"
                    onChange={handleInputChange}
                    {...register("confirmPassword", {
                      required: true,
                      minLength: 4,
                      validate: (value) =>
                        value === watchedPassword ||
                        "Passwords do not match",
                    })}
                    placeholder="xyz"
                  />
                  <label htmlFor="confirmPassword" className="text-dark">
                    Confirm Password
                  </label>
                  {errors.confirmPassword &&
                    errors.confirmPassword.type === "required" && (
                      <p className="text-danger">* Confirm your password</p>
                    )}
                  {errors.confirmPassword &&
                    errors.confirmPassword.type === "minLength" && (
                      <p className="text-danger">
                        * Minimum 4 characters password is required
                      </p>
                    )}
                  {errors.confirmPassword &&
                    errors.confirmPassword.type === "validate" && (
                      <p className="text-danger">
                        {errors.confirmPassword.message}
                      </p>
                    )}
                </div>
              </div>
              <button
                type="submit"
                className="btn btn-primary w-100 rounded-lg text-sm px-4 py-2.5"
              >
                Reset Password
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Reset;
