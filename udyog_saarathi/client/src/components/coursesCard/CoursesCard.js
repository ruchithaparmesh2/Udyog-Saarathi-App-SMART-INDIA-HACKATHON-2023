import React from 'react';
import { Link } from "react-router-dom";
import img4 from "../../images/img4.jpg";
import img3 from "../../images/img3.jpg";
import './CoursesPage.css'
import { useNavigate } from "react-router-dom";

function CoursesPage() {
  let navigate = useNavigate();
  const goToCourses = () => {
    navigate("/courses");
  };
  const goToPaidCourses = () => {
    navigate("/paidcourses");
  };

  return (
    <div>
      <div className=" mt-5 d-flex justify-content-evenly">
        <div className="card card-p " onClick={goToCourses}>
          <img
            className="card-img-top img3"
            src={img4}
            alt="Card image cap"
          ></img>
          <div className="card-body">
            <h5 className="card-title">Free Courses</h5>
           
            <button className="btn btn-primary btn-space p-0 d-block m-auto">
              <Link
                id="link"
                className="nav-link "
                style={{ padding: "1.3rem" }}
                to="/courses"
              >
                Free Courses
              </Link>
            </button>
          </div>
        </div>
        <div className="card card-p" onClick={goToPaidCourses}>
          <img
            className="card-img-top img3"
            src={img3}
            alt="Card image cap"
          ></img>
          <div className="card-body">
            <h5 className="card-title">Paid Courses</h5>
        
            <button className="btn btn-success btn-space p-0 d-block m-auto">
              <Link
                id="link"
                className="nav-link  "
                style={{ padding: "1.3rem" }}
                to="/paidcourses"
              >
                Paid Courses
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
  }
  
  export default CoursesPage;