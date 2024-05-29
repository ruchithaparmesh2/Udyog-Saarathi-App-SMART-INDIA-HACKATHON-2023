import React, { useState, useContext ,useEffect} from "react";
import axios from 'axios';
import { loginContext } from "../../context/loginContext";

import { topicContext } from "../../context/TopicContextProvider";
import {useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ProgressBar from "react-bootstrap/ProgressBar";
import DropFileInput from "../drop-file-input/DropFileInput";
import UploadButton from "../upload-button/UploadButton";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../config/firebase.config";
import { useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";
import "./UploadVideo.css";

const UploadVideo = () => {
  let location = useLocation();
  let [path, setPath] = useState("UPSC-IAS-Foundation");
  useEffect(() => {
    let url = location.pathname.split("/")[2];
    console.log(url);
    setPath(url);
    getCourses();
  }, [location]);
  let {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [file, setFile] = useState(null);
  let [errorr, setError] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadComplete, setUploadComplete] = useState(false); // New state variable
  let [topic, setTopic] = useContext(topicContext);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    videoUrl: "",
    role: path,
  });

  const onFileChange = (files) => {
    const currentFile = files[0];
    setFile(currentFile);
    
  };

  const handleClick = () => {
    
    if (file === null) return;
    const fileRef = ref(storage, `videos/${file.name}`);
    const uploadTask = uploadBytesResumable(fileRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        console.log("Error:", error);
      },
      () => {
        console.log("Upload complete!");
        setUploadComplete(true); // Set upload complete status
        getDownloadURL(uploadTask.snapshot.ref).then((val) => {
          console.log(val)
          setFormData({
            ...formData,
            videoUrl: val,
          });
        });
      }
    );
  };
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  const modifiedFormData = {
    title: formData.title,
    description: formData.description,
    videoUrl: formData.videoUrl,
    role: formData.role,
  };
  let formSubmit = (newUser) => {
    axios
      .post(`/course-api/add-course`, modifiedFormData)
      .then((response) => {
        if (response.status === 201) {
          console.log("successfull");
          getCourses();
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

  const getCourses = () => {
    axios
      .get(`/course-api/get-course/${path}`)
      .then((response) => {
        if (response.status === 200) {
          setTopic(response.data.payload);
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
 

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    // Reset state when the modal is closed
    setUploadProgress(0);
    setUploadComplete(false);
  };

  const handleShow = () => {
    setShow(true);
    setUploadProgress(0);
    setUploadComplete(false);
  };
  let [currentUser, error, userLoginStatus, loginUser, logoutUser, role] =
  useContext(loginContext);
  return (
    
    <div>
      {userLoginStatus && role==="admin" && 
      <Button
        className="btn btn-dark d-block ms-auto p-3 mt-2 mx-2 "
        onClick={handleShow}
      >
        <i className="fa-solid fa-cart-plus"></i>
      </Button>
}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Upload</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body">
          <Form onSubmit={handleSubmit(formSubmit)} >
            <Form.Group className="mb-3">
              <DropFileInput onFileChange={(files) => onFileChange(files)} />
              <br />
              <UploadButton onClick={() => handleClick()}>Upload</UploadButton>

              {/* Display the progress bar */}
              {uploadProgress > 0 && uploadProgress < 100 && (
                <div className="progress-container">
                  <ProgressBar
                    now={uploadProgress}
                    label={`${uploadProgress.toFixed(2)}%`}
                  />
                </div>
              )}

              {/* Display upload complete message */}
              {uploadComplete && uploadProgress === 100 && (
                <p className="text-success">Upload complete!</p>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" placeholder="Title"  id="title"
            name="title"
           
            value={formData.title}
            onChange={handleChange} autoFocus />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>description</Form.Label>
              <Form.Control as="textarea" id="description"
            name="description"
           
            value={formData.description}
            onChange={handleChange}  rows={3} />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={handleClose}>
            Update
          </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UploadVideo;
