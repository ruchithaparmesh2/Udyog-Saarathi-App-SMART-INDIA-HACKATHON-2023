import { loginContext } from "../../context/loginContext";
import { imgDB } from "../config/firebase.config";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import "./Private.css";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import ProgressBar from "react-bootstrap/ProgressBar";
import axios from "axios";
import { MdOutlineEventSeat } from "react-icons/md";
import React, { createContext, useContext, useEffect, useState } from "react";
import styled from "styled-components";

const RatingContext = createContext();

const StyledPost = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
`;

const StyledRatingContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const StyledRating = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  &:not(:last-child) {
    margin-right: 12px;
  }

  &.post-rating-selected > .post-rating-button,
  &.post-rating-selected > .post-rating-count {
    color: #009578;
  }
`;

const StyledRatingButton = styled.span`
  margin-right: 6px;
  cursor: pointer;
  color: #555555;

  &:not(.post-rating-selected):hover {
    color: #000000;
  }
`;
const Private = () => {
  const [uploadProgress, setUploadProgress] = useState(0);

  const [data, setData] = useState([]);

  let [errorr, setError] = useState("");
  let {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    img: "",
    companyName: "",
    position: "",
    jobType: "",
    salaryStart: "",
    salaryEnd: "",
    lastDate: "",
    location: "",
    link: "",
    role: "private",
  });
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return; // Handle if no file is selected
    console.log(e);
    // Replace with your Firebase storage reference

    const imgs = ref(imgDB, `Imgs/${v4()}`);
    const uploadTask = uploadBytesResumable(imgs, file);

    // Listen to the upload progress
    uploadTask.on("state_changed", (snapshot) => {
      // Calculate progress percentage
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setUploadProgress(progress);
    });

    try {
      // Wait for the upload to complete
      await uploadTask;

      // Retrieve the download URL
      const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
      console.log(downloadURL);
      // Update your state or perform other actions
      setFormData({
        ...formData,
        img: downloadURL,
      });
    } catch (error) {
      // Handle errors
      console.error("Error uploading image:", error);
    }
  };
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  const handleDateChange = (e) => {
    const reversedDate = e.target.value.split("-").reverse().join("-");
    setFormData({
      ...formData,
      [e.target.name]: reversedDate,
    });
  };
  const modifiedFormData = {
    img: formData.img,
    companyName: formData.companyName,
    position: formData.position,
    jobType: formData.jobType,

    location: formData.location,

    link: formData.link,
    role: formData.role,
  };

  let formSubmit = (newUser) => {
    axios
      .post(`/job-api/add-private`, modifiedFormData)
      .then((response) => {
        if (response.status === 201) {
          console.log("successfull");
          getJobs();
        }
        if (response.status !== 201) {
          setError(response.data.message);
        }
      })
      .catch((err) => {
        if (err.response) {
          setError(err.message);
        } else if (err.request) {
          setError(err.message);
        } else {
          setError(err.message);
        }
      });
    reset();
  };

  const [selectedRating, setSelectedRating] = useState(null);

  useEffect(() => {
    // Remove stored rating when component unmounts
    return () => {
      localStorage.removeItem("selectedRating");
    };
  }, []);

  const getJobs = () => {
    axios
      .get(`/job-api/get-job/private`)
      .then((response) => {
        if (response.status === 200) {
          setData(response.data.payload);
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
  };
  useEffect(() => {
    getJobs();
  }, []);
  let [currentUser, error, userLoginStatus, loginUser, logoutUser, role] =
    useContext(loginContext);
  return (
    <div className="container">
      <div className="tab-content">
        <div id="tab-1" className="tab-pane fade show p-0 active">
          {/* job apply cards */}
          {data?.map((job, index) => (
            <div
              className="job-item p-4 mb-4 card shadow-lg p-3 mb-5 bg-white rounded"
              key={index}
            >
              <div className="card-body">
                <div className="row g-4">
                  <div className="col-sm-12 col-md-8 d-flex align-items-center">
                    <img
                      className="flex-shrink-0 img-fluid border rounded"
                      src={job.img}
                      alt=""
                      style={{ width: "80px", height: "80px" }}
                    />
                    <div className="text-start ps-4">
                      <h3 className="mb-3 font-weight-bold">
                        {job.companyName}
                      </h3>
                      <p className="lead">{job.position}</p>
                      {/* <span className="text-truncate me-3">
              <i className="fa fa-map-marker-alt text-primary me-2"></i>New York, USA
            </span> */}
                      <span class="text-truncate me-3">
                        <i class="fa fa-map-marker-alt text-primary me-2"></i>
                        {job.location}
                      </span>
                      <span className="text-truncate me-3">
                        <i className="far fa-clock text-primary me-2"></i>
                        {job.jobType}
                      </span>
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-4 d-flex flex-column align-items-start align-items-md-end justify-content-center">
                    <div className="d-flex mb-3">
                      <RatingContext.Provider
                        value={{ selectedRating, setSelectedRating }}
                      >
                        <StyledPost className="post" data-post-id="7712">
                          <StyledRatingContainer className="post-ratings-container">
                            <RatingButton icon="thumb_up" />
                            <RatingButton icon="thumb_down" />
                          </StyledRatingContainer>
                        </StyledPost>
                      </RatingContext.Provider>
                      <a className="btn btn-success mx-2" href={job.link}>
                        Apply Now
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* input for jobs */}
      {userLoginStatus && role === "admin" && (
        <div className="container spider-man mb-4 w-50 px-5" py-3>
          <form onSubmit={handleSubmit(formSubmit)} action="" className="mt-5">
            <div className="inputbox2 form-floating">
              <div className="input-group">
                <div className="custom-file w-75">
                  <label className="custom-file-label" htmlFor="inputGroupFile">
                    Choose file for image uploading
                  </label>
                  <input
                    type="file"
                    className="custom-file-input"
                    name="img"
                    id="inputGroupFile"
                    onChange={(e) => handleUpload(e)}
                  />
                  {uploadProgress > 0 && uploadProgress < 100 && (
                    <div className="progress-container">
                      <ProgressBar
                        now={uploadProgress}
                        label={`${uploadProgress.toFixed(2)}%`}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="inputbox2 form-floating">
              <i className="fa-solid fa-sitemap"></i>
              <input
                type="text"
                id="companyName"
                name="companyName"
                className="form-control "
                placeholder="xyz"
                value={formData.companyName}
                onChange={handleChange}
              ></input>
              <label htmlFor="companyName" className="text-dark">
                Company Name
              </label>
            </div>

            <div className="inputbox2 form-floating">
              <i className="fa-solid fa-signs-post"></i>
              <input
                type="text"
                id="position"
                name="position"
                className="form-control "
                value={formData.position}
                onChange={handleChange}
                placeholder="xyz"
              ></input>
              <label htmlFor="position" className="text-dark">
                Position
              </label>
            </div>
            <div className="inputbox2 form-floating">
              <i class="fa-solid fa-location-crosshairs"></i>
              <input
                type="text"
                id="location"
                className="form-control "
                placeholder="xyz"
                name="location"
                value={formData.location}
                onChange={handleChange}
              ></input>
              <label htmlFor="location" className="text-dark">
                Location
              </label>
            </div>
            <div className="inputbox2 form-floating">
              <i class="fa-solid fa-location-crosshairs"></i>
              <input
                type="text"
                id="jobType"
                className="form-control "
                placeholder="xyz"
                name="jobType"
                value={formData.jobType}
                onChange={handleChange}
              ></input>
              <label htmlFor="jobType" className="text-dark">
                Job Type
              </label>
            </div>

            <div className="inputbox2 form-floating">
              <i className="fa-solid fa-link"></i>
              <input
                type="text"
                id="link"
                className="form-control "
                placeholder="xyz"
                name="link"
                value={formData.link}
                onChange={handleChange}
              ></input>
              <label htmlFor="link" className="text-dark">
                 Apply Link
              </label>
            </div>

            <button
              type="submit"
              className="btn btn-primary d-block m-auto my-4"
            >
              Update
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

const RatingButton = ({ icon }) => {
  const { selectedRating, setSelectedRating } = useContext(RatingContext);

  const handleRatingClick = async () => {
    if (selectedRating === icon) {
      return;
    }

    setSelectedRating(icon);

    const postId = document.querySelector(".post").dataset.postId;
    const likeOrDislike = icon === "thumb_up" ? "like" : "dislike";
    // Your API call logic goes here
    // const response = await fetch(`/posts/${postId}/${likeOrDislike}`);
    // const body = await response.json();
    // console.log(body);
  };

  return (
    <StyledRating
      className={`post-rating ${
        selectedRating === icon ? "post-rating-selected" : ""
      }`}
    >
      <StyledRatingButton
        className="post-rating-button material-icons"
        onClick={handleRatingClick}
      >
        {icon}
      </StyledRatingButton>
    </StyledRating>
  );
};

export default Private;

