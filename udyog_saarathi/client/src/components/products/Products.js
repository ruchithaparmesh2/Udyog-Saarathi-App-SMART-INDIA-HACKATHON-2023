import React from "react";
import { Link } from "react-router-dom";
import img3 from "../../images/img3.jpg";
import "./Products.css";
import { useNavigate } from "react-router-dom";
import img4 from "../../images/img4.jpg";
const Products = () => {
  let navigate = useNavigate();
  const goToCourses = () => {
    navigate("/courses");
  };
  const goToMockTests = () => {
    navigate("/mock-tests");
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
            <h5 className="card-title">Courses</h5>
            <p className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
            <button className="btn btn-primary p-0 d-block m-auto">
              <Link
                id="link"
                className="nav-link "
                style={{ padding: "1.3rem" }}
                to="/courses"
              >
                Courses
              </Link>
            </button>
          </div>
        </div>
        <div className="card card-p" onClick={goToMockTests}>
          <img
            className="card-img-top img3"
            src={img3}
            alt="Card image cap"
          ></img>
          <div className="card-body">
            <h5 className="card-title">Mock Tests</h5>
            <p className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
            <button className="btn btn-success p-0 d-block m-auto">
              <Link
                id="link"
                className="nav-link  "
                style={{ padding: "1.3rem" }}
                to="/mock-tests"
              >
                Mock Test
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
