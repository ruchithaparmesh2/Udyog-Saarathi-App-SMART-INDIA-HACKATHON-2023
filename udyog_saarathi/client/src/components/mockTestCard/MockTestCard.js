import React from "react";
import { Link } from "react-router-dom";
import img3 from "../../images/img3.jpg";
import { useNavigate } from "react-router-dom";
import './MockTestCard.css';

function MockTestCard() {
  let navigate = useNavigate();

  const goToMockTests = () => {
    navigate("/mock-tests/upscmock");
  };

  return (
    <div className="mt-5 d-flex justify-content-evenly">
      <div className="card card-m" onClick={goToMockTests}>
        <img
          className="card-img-top img3"
          src={img3}
          alt="Card image cap"
        ></img>
        <div className="card-body">
          <h5 className="card-title">Mock Tests</h5>
        
          <button className="btn btn-primary p-0 d-block m-auto">
            <Link
              id="link"
              className="nav-link"
              style={{ padding: "1.3rem" }}
              to="/mockTestCard"
            >
              Mock Tests
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default MockTestCard;