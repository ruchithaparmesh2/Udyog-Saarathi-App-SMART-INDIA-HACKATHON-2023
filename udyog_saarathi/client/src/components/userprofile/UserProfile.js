import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

import { useForm } from "react-hook-form";
import { loginContext } from "../../context/loginContext";


import Modal from "react-bootstrap/Modal";
import "./UserProfile.css";

const UserProfile = () => {
  let [tasks, setTasks] = useState([]);
 
  let [error, setError] = useState("");
  let token = sessionStorage.getItem("token");
  let [
    currentUser,
    err,
    userLoginStatus,
    loginUser,
    logoutUser,
    role,
    
  ] = useContext(loginContext);
  let {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();
  const [show, setShow] = useState(false);
  const [userToEdit, setUserToEdit] = useState({});

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getUsers = () => {
    axios
      .get(`/user-api/get-emp/${currentUser.email}`, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((response) => {
        console.log(response.data.payload)
        if (response.status === 200) {
          setTasks(response.data.payload);
        }
        if (response.status !== 200) {
          setError(response.data.message);
        }
      })
      .catch((err) => {
        if (err.response) {
          setError(err.message);
          console.log(err.response);
        } else if (err.request) {
          setError(err.message);
        } else {
          setError(err.message);
        }
      });
    // reset();
  };

  // edit user
  const editUser = (userObj) => {
    handleShow();
    setUserToEdit(userObj);
    setValue("firstname", userObj?.firstname);
    setValue("middlename",userObj?.middlename);
    setValue("lastname",userObj?.middlename);
    
    setValue("gender", userObj?.gender);
    setValue("email", userObj?.email);
    setValue("phone", userObj?.phone);
    setValue("category", userObj?.category);
    setValue("udid",userObj?.udid);
  };
  //   saveModifiedUser
  const saveModifiedUser = () => {
    
    if(Object.keys(errors).length===0){
      let modifieduser = getValues();

      axios
        .put(`/user-api/update-user`, modifieduser, {
          headers: { Authorization: "Bearer " + token },
        })
        .then((response) => {
          if (response.status === 200) {
            getUsers();
          }
        })
        .catch((err) => {
          if (err.response) {
            setError(err.message);
            console.log(err.response);
          } else if (err.request) {
            setError(err.message);
          } else {
            setError(err.message);
          }
        });
  
        handleClose();
    }
    
   
  };

  useEffect(() => {
    getUsers();
  }, []);
 

  return (
    <div className="container">
      <link
        rel="stylesheet"
        href="https://site-assets.fontawesome.com/releases/v6.4.0/css/all.css"
      ></link>
      {error?.length !== 0 && <p className="text-danger display-1"> {error}</p>}
      <div className="pt-4">
        <div className="dog  shadow-lg  rounded my-5">
          <div className="card-body edit-card">
            <div>
              <ul className="list-unstyled list-group ">
                <li className="list-group-item bg-transparent  fs-2">
                  Full Name :{tasks?.firstname+" "+tasks?.middlename+" "+tasks?.lastname}
                </li>
                <li className="list-group-item bg-transparent  fs-2">
                  Gender :{tasks?.gender}
                </li>
                <li className="list-group-item bg-transparent  fs-2">
                  Email :{tasks?.email}
                </li>
                <li className="list-group-item bg-transparent  fs-2">
                  Phone No. :{tasks?.phone}
                </li>
                <li className="list-group-item bg-transparent  fs-2">
                  Category :{tasks?.category}
                </li>
                <li className="list-group-item bg-transparent  fs-2">
                  UDID :{tasks?.udid}
                </li>
              </ul>
            </div>

            <button
              className=" btn-profile d-block m-auto mt-3 border-3 rounded"
              onClick={() => editUser(tasks)}
            >
              Edit
              <span className="first"></span>
              <span className="second"></span>
              <span className="third"></span>
              <span className="fourth"></span>
            </button>
          </div>
        </div>
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        centered
        className="modal"
      ><div className="modal-profile border rounded">
          <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(saveModifiedUser)}>
            <div className="row justify-content-center">
              <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                <div className="inputbox4 form-floating">
                  <i className="fa-regular fa-user"></i>
                  <input
                    type="text"
                    id="username"
                    className="form-control "
                    placeholder="xyz"
                    {...register("name", {
                      required: true,
                      minLength: 4,
                      maxLength: 10,
                    })}
                  ></input>
                  <label htmlFor="username" className="text-dark">
                    User Name
                  </label>

                  {errors.username?.type === "required" && (
                    <p className=" text-danger">*enter your first name</p>
                  )}
                  {errors.username?.type === "minLength" && (
                    <p className=" text-danger">
                      *minimum 4 letter word is required
                    </p>
                  )}
                  {errors.username?.type === "maxLength" && (
                    <p className=" text-danger">
                      *maximum 6 letter word is required
                    </p>
                  )}
                </div>
                <div className="inputbox4 form-floating">
                    <i className="fa-solid fa-lock"></i>
                    <input
                      type="password"
                      id="password"
                      className="form-control "
                      placeholder="xyz"
                      {...register("password", {
                        required: true,
                        minLength: 4,
                      })}
                    ></input>
                    <label htmlFor="password" className="text-dark">
                      password
                    </label>

                    {errors.password?.type === "required" && (
                      <p className=" text-danger">*enter your password</p>
                    )}
                    {errors.password?.type === "minLength" && (
                      <p className=" text-danger">
                        *minimum 4 password word is required
                      </p>
                    )}
                  </div>


                {/* second row   */}

                <div className="inputbox4 form-floating">
                  <i className="fa-solid fa-calendar-days"></i>
                  <input
                    type="date"
                    id="jod"
                    className="form-control "
                    placeholder="xyz"
                    {...register("jod", { required: true })}
                  ></input>
                  <label htmlFor="jod" className="text-dark">
                    joining date
                  </label>

                  {errors.jod?.type === "required" && (
                    <span className="text-sm text-danger">
                      *joining date is required
                    </span>
                  )}
                </div>
              </div>
              <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                <div className="inputbox4 form-floating">
                  <i className="fa-solid fa-user-magnifying-glass"></i>
                  <input
                    type="text"
                    id="department"
                    className="form-control "
                    placeholder="xyz"
                    {...register("department", { required: true })}
                  ></input>
                  <label htmlFor="department" className="text-dark">
                    Department
                  </label>

                  {errors.department?.type === "required" && (
                    <p className=" text-danger">*enter your department</p>
                  )}
                </div>

                {/* third row  contains Email and Phone Number*/}

                <div className="inputbox4 form-floating">
                  <i className="fa-solid fa-envelope"></i>
                  <input
                    type="email"
                    id="email"
                    className="form-control "
                    placeholder="xyz"
                    {...register("email", { required: true })}
                    disabled
                  ></input>
                  <label htmlFor="email" className="text-dark">
                    Email
                  </label>

                  {errors.email?.type === "required" && (
                    <p className=" text-danger">*enter your valid email id</p>
                  )}
                </div>
                <div className="inputbox4 form-floating">
                  <i className="fa-solid fa-phone"></i>
                  <input
                    type="number"
                    id="phone"
                    className="form-control "
                    placeholder="xyz"
                    {...register("phone", { required: true, maxLength: 11 })}
                  ></input>
                  <label htmlFor="phone" className="text-dark">
                    Phone Number
                  </label>

                  {errors.phone?.type === "required" && (
                    <p className=" text-danger">*enter your Phone number</p>
                  )}
                  {errors.phone?.type === "maxLength" && (
                    <p className=" text-danger">
                      *maximum number length should be 10
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="d-flex flex-row-reverse">
            <button className="btn btn-secondary mx-1"  onClick={handleClose}>Close</button>
          <button className="btn btn-primary mx-1" type="submit">Save</button>
            </div>
            
          </form>
        </Modal.Body>
      
      </div>
        
      </Modal>
    </div>
  );
};

export default UserProfile;
