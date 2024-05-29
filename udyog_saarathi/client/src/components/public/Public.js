import { loginContext } from "../../context/loginContext";
import { imgDB } from "../config/firebase.config";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import "./Public.css";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import ProgressBar from "react-bootstrap/ProgressBar";

import axios from "axios";
import Search from "../Search/index";

import React, { createContext, useContext, useEffect, useState } from "react";

// filtering


import Products from ".././Product/Products";
import Sort from ".././Sort/index";
import Sidebar from ".././Sidebar/Sidebar";
import Card from ".././component/Card";


const Public = () => {
  let [currentUser, error, userLoginStatus, loginUser, logoutUser, role] =
    useContext(loginContext);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [data, setData] = useState([]);
  let [errorr, setError] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
    getValues,
  } = useForm();

  const watchedFields = watch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValue(name, value);
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (!file) return; // Handle if no file is selected

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
      setValue("img", downloadURL);
    } catch (error) {
      // Handle errors
      console.error("Error uploading image:", error);
    }
  };
  const [selectedRating, setSelectedRating] = useState(null);

  const modifiedFormData = {
    img: watchedFields.img,
    organisation: watchedFields.organisation,
    post: watchedFields.post,
    cat: watchedFields.cat,
    lastDate: watchedFields.lastDate,
    vacancies: Number(watchedFields.vacancies),
    appLink: watchedFields.appLink,
    link: watchedFields.link,
    role: watchedFields.role,
  };

  

  // sorting and pagenation
  const [obj, setObj] = useState({});
  const [sort, setSort] = useState({ sort: "vacancies", order: "desc" });
  const [filterCat, setFilterCat] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [search, setSearch] = useState("");

  const getAllJobs = async () => {
    try {
      // &sort=${sort.sort},${	sort.order}
      const url = `http://localhost:5000/job-api/get-jobs/public?page=${page}&sort=${
        sort.sort
      },${sort.order}&cat=${filterCat.toString()}&search=${search}`;

      axios
        .get(url)
        .then((response) => {
          if (response.status === 200) {
            const object = response.data;

            setObj(object);
            if (object) {
              setPageCount(object.pageCount);
            }
            setData(
              object?.jobs.map((ele) => ({
                ...ele,
              }))
            );
          } else {
            setError(response.data.message);
          }
        })
        .catch((err) => {
          setError(err.message);
        });
    } catch (err) {
      console.log(err);
    }
  };
  let formSubmit = async () => {
    try {
      let formData = getValues(); // Get the entire form data
      formData = { ...formData, role: "public"};
      // You can access the form data directly, no need for modifiedFormData
      axios
        .post(`/job-api/add-public`, formData)
        .then((response) => {
          if (response.status === 201) {
            console.log(response.data.message);
            getAllJobs();
          } else {
            setError(response.data.message);
          }
        })
        .catch((err) => {
          setError(err.message);
        });

      reset(); // Reset the form after submission
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const textOnlyRegex = /^[A-Za-z\s]+$/;

  // filtering functions
  const [selectedCategory, setSelectedCategory] = useState(null);

  // ----------- Input Filter -----------
  const [query, setQuery] = useState("");



  // ----------- Radio Filtering -----------
  const handleChange1 = (event) => {
    setSelectedCategory(event.target.value);
    console.log(selectedCategory);
  };

 

  useEffect(() => {
    getAllJobs();
  }, [sort, filterCat, page, search]);
  // main function
  function handlePrevious() {
    setPage((p) => {
      if (p === 1) return p;
      return p - 1;
    });
  }

  function handleNext() {
    setPage((p) => {
      if (p === pageCount) return p;
      return p + 1;
    });
  }
  function filteredData(data) {
    let filteredProducts = data;
    
    
    // Filtering Input Items
  

    // Applying selected filter
   

    return filteredProducts.map(
      ({
        _id,
        img,
        organisation,
        cat,
        post,
        vacancies,
        link,
        appLink,
        lastDate,
      }) => (
        <Card
          key={Math.random()}
          _id={_id}
          img={img}
          organisation={organisation}
          cat={cat}
          post={post}
          vacancies={vacancies}
          link={link}
          appLink={appLink}
          lastDate={lastDate}
        />
      )
    );
  }

  const result = filteredData(data);

  return (
    <div className="container">
      {/* input for jobs */}
      {userLoginStatus && role === "admin" && (
        <div className="container spider-man mb-4 w-50 px-5">
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
                    // {...register("img", { required: true })}
                  />
                  {uploadProgress > 0 && uploadProgress < 100 && (
                    <div className="progress-container">
                      <div className="progress">
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{ width: `${uploadProgress}%` }}
                          aria-valuenow={uploadProgress}
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          {`${uploadProgress.toFixed(2)}%`}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {errors.img && <p className="text-danger">* Image is required</p>}
            </div>

            <div className="inputbox2 form-floating">
              <i className="fa-solid fa-sitemap"></i>
              <input
                type="text"
                id="organisation"
                name="organisation"
                className="form-control"
                placeholder="xyz"
                {...register("organisation", {
                  required: true,
                  pattern: {
                    value: textOnlyRegex,
                    message: "Only letters and spaces are allowed",
                  },
                })}
                onChange={handleChange}
              />
              <label htmlFor="organisation" className="text-dark">
                Organisation
              </label>
              {errors.organisation && (
                <p className="text-danger">{errors.organisation.message}</p>
              )}
            </div>

            <div className="inputbox2 form-floating">
              <i className="fa-solid fa-signs-post"></i>
              <input
                type="text"
                id="post"
                name="post"
                className="form-control"
                placeholder="xyz"
                {...register("post", {
                  required: true,
                  pattern: {
                    value: textOnlyRegex,
                    message: "Only letters and spaces are allowed",
                  },
                })}
                onChange={handleChange}
              />
              <label htmlFor="post" className="text-dark">
                Post
              </label>
              {errors.post && (
                <p className="text-danger">{errors.post.message}</p>
              )}
            </div>
            <div className="inputbox2 form-floating">
              <i className="fa-solid fa-calendar-check"></i>
              <input
                type="text"
                id="cat"
                className="form-control "
                placeholder="xyz"
                name="cat"
                value={watchedFields.cat}
                onChange={(e) => setValue("cat", e.target.value)}
                {...register("cat", { required: true })}
              />
              <label htmlFor="cat" className="text-dark">
                Category
              </label>
              {errors.cat && (
                <p className="text-danger">* Job type is required</p>
              )}
            </div>

            <div className="inputbox2 form-floating">
              <i className="fa-solid fa-calendar-days"></i>
              <input
                type="date"
                id="lastDate"
                className="form-control "
                placeholder="xyz"
                name="lastDate"
                value={watchedFields.lastDate}
                onChange={(e) => setValue("lastDate", e.target.value)}
                {...register("lastDate", { required: true })}
              />
              <label htmlFor="lastDate" className="text-dark">
                Last Date
              </label>
              {errors.lastDate && (
                <p className="text-danger">* Last Date is required</p>
              )}
            </div>

            <div className="inputbox2 form-floating">
              <i className="fa-solid fa-percent"></i>
              <input
                type="number"
                id="vacancies"
                className="form-control "
                placeholder="xyz"
                name="vacancies"
                value={watchedFields.vacancies}
                onChange={(e) => setValue("vacancies", e.target.value)}
                {...register("vacancies", { required: true })}
              />
              <label htmlFor="vacancies" className="text-dark">
                Vacancies
              </label>
              {errors.vacancies && (
                <p className="text-danger">* Vacancies is required</p>
              )}
            </div>

            <div className="inputbox2 form-floating">
              <i className="fa-solid fa-link"></i>
              <input
                type="text"
                id="link"
                className="form-control "
                placeholder="xyz"
                name="link"
                value={watchedFields.link}
                onChange={(e) => setValue("link", e.target.value)}
                {...register("link", { required: true })}
              />
              <label htmlFor="link" className="text-dark">
                Details Doc Link
              </label>
              {errors.link && (
                <p className="text-danger">* Details Doc Link is required</p>
              )}
            </div>

            <div className="inputbox2 form-floating">
              <i className="fa-solid fa-link"></i>
              <input
                type="text"
                id="appLink"
                className="form-control "
                placeholder="xyz"
                name="appLink"
                value={watchedFields.appLink}
                onChange={(e) => setValue("appLink", e.target.value)}
                {...register("appLink", { required: true })}
              />
              <label htmlFor="appLink" className="text-dark">
                Apply Link
              </label>
              {errors.appLink && (
                <p className="text-danger">* Apply Link is required</p>
              )}
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
      {/* sidebar */}

      <div className="d-flex friends my-2">
        <div className="wolf d-flex">
        <Sidebar
          handleChange1={handleChange1}
          filterCat={filterCat}
          cat={obj.cat ? obj.cat : []}
          setFilterCat={(cat) => setFilterCat(cat)}
        
        />
      
        <Search setSearch={(search) => setSearch(search)} />
        </div>
     
        <div className=" swing1">
        <Sort sort={sort} setSort={(sort) => setSort(sort)} />
        </div>
        
      </div>

      <div>
        <Products result={result} />
      </div>

      <div className="pt-3 pb-3">
      <footer className="d-flex">
        Page: {page}
        <br />
        Page count: {pageCount}
        <br />
        <button disabled={page === 1} onClick={handlePrevious}>
          Previous
        </button>
        <button disabled={page === pageCount} onClick={handleNext}>
          Next
        </button>
        <select
          value={page}
          onChange={(event) => {
            setPage(event.target.value);
          }}
        >
          {Array(pageCount)
            .fill(null)
            .map((_, index) => {
              return <option key={index}>{index + 1}</option>;
            })}
        </select>
      </footer>
      </div>
    </div>
  );
};

export default Public;
