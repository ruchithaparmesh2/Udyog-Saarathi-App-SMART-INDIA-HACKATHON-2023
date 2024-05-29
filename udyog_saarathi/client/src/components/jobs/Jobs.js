import React, { useEffect, useRef } from "react";
import { Outlet, Link } from "react-router-dom";
import "./Jobs.css";

const Jobs = () => {
  return (
    <div className="jobs-portal">
      <nav  >
        <ul className="text-decoration-none d-flex justify-content-center list-inline font-weight-bold fs-4 mb-1" >
          <li >
            <Link
            id="iron-man"
              className="nav-link mx-2 "
              style={{ padding: "1.3rem" }}
              to="/jobs/public"
            >
              Public Sector
            </Link>
          </li>
          <li >
            <Link
            id="iron-man"
              className="nav-link mx-2 "
              style={{ padding: "1.3rem" }}
              to="/jobs/private"
            >
              Private Sector
            </Link>
          </li>
        </ul>
      </nav>
      <hr className="font-weight-bolder fs-4 w-75 d-block m-auto  " style={{height:"4px",color:"black"}}></hr>

      <div className="jobs-list mt-1">
        <Outlet />
      </div>
    </div>
  );
};

export default Jobs;
