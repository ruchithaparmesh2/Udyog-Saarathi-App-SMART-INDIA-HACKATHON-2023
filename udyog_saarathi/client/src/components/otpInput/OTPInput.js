import React from "react";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { RecoveryContext } from "../../App";

import { useNavigate } from "react-router-dom";
import axios from "axios";

const OTPInput = () => {
  const navigate = useNavigate();




  const { email, otp, setPage } = useContext(RecoveryContext);

  const [OTPinput, setOTPinput] = useState([0, 0, 0, 0]);
  const [disable, setDisable] = useState(false);
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    let interval;

    if (timer > 0 && disable) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0 && disable) {
      setDisable(false);
      setTimer(60);
    }

    return () => clearInterval(interval);
  }, [timer, disable]);
  const handleOTPChange = (index, value) => {
    const newOTP = [...OTPinput];
    newOTP[index] = value;

    // Ensure that the value is not empty before moving to the next input
    if (value !== "" && index < newOTP.length - 1) {
      // Move focus to the next input field
      document.getElementById(`otpDigit${index + 2}`).focus();
    }

    setOTPinput(newOTP);
  };

  function resendOTP() {
    if (disable) return;
    axios
      .post("/send_recovery_email", {
        OTP: otp,
        recipient_email: email,
      })
      .then(() => setDisable(true))
      .then(() => alert("A new OTP has succesfully been sent to your email."))
      .then(() => setTimer(60))
      .catch(console.log);
  }

  function verifyOTP() {
    if (parseInt(OTPinput.join("")) === otp) {
      navigate("/reset");
      return;
    }
    alert(
      "The code you have entered is not correct, try again or re-send the link"
    );
    return;
  }

  React.useEffect(() => {
    let interval = setInterval(() => {
      setTimer((lastTimerCount) => {
        lastTimerCount <= 1 && clearInterval(interval);
        if (lastTimerCount <= 1) setDisable(false);
        if (lastTimerCount <= 0) return lastTimerCount;
        return lastTimerCount - 1;
      });
    }, 1000); //each count lasts for a second
    //cleanup the interval on complete
    return () => clearInterval(interval);
  }, [disable]);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light container">
      <div className="bg-white px-4 py-5 shadow-lg mx-auto w-100 max-w-lg rounded-3 card">
        <div className="mx-auto d-flex flex-column w-100 max-w-md space-y-4">
          <div className="d-flex flex-column align-items-center justify-content-center text-center space-y-2">
            <div className="font-weight-bold fs-3">
              <p>Email Verification</p>
            </div>
            <div className="d-flex flex-row text-sm font-weight-medium text-muted">
              <p>We have sent a code to your email {email}</p>
            </div>
          </div>

          <div>
            <form>
              <div className="d-flex flex-column space-y-4">
                <div className="d-flex flex-row align-items-center justify-content-between mx-auto w-100 max-w-xs">
                <div className="w-100 d-flex flex-row align-items-center justify-content-between mx-auto max-w-xs">
                    {Array.from({ length: 4 }, (_, index) => (
                      <div key={index} className="w-25">
                        <input
                          maxLength="1"
                          className="m-2 w-100 h-100 d-flex flex-column align-items-center justify-content-center text-center outline-none rounded-3 border border-secondary text-sm bg-white focus:bg-light focus:ring-1 ring-primary"
                          type="text"
                          name={`otpDigit${index + 1}`}
                          id={`otpDigit${index + 1}`}
                          onChange={(e) =>
                            handleOTPChange(index, e.target.value)
                          }
                        />
                      </div>
                    ))}
                  </div>
                  {/* Repeat similar structure for other input fields */}
                </div>

                <div className="d-flex flex-column space-y-4">
                  <div>
                    <button
                      onClick={() => verifyOTP()}
                      className="btn btn-primary d-block m-auto"
                    >
                      Verify Account
                    </button>
                  </div>

                  <div className="m-2 d-flex flex-row align-items-center justify-content-center text-center text-sm font-weight-medium space-x-1 text-muted">
                    
                    <div className="text-center text-sm">
                      <p>
                        Didn't receive code?{" "}
                        <span
                          className={`text-${
                            disable ? "secondary" : "primary"
                          }`}
                          style={{ cursor: disable ? "none" : "pointer" }}
                          onClick={() => resendOTP()}
                        >
                          {disable ? `Resend OTP in ${timer}s` : "Resend OTP"}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );

};





export default OTPInput
