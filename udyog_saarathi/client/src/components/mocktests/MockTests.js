import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router";

const MockTests = () => {
  return (
    <div className="mocktest mb-5">
      <div className="row g-0">
        <div className="col-sm-2 col-md-2">
          <Navbar />
        </div>
        <div className="col-sm-6 col-md-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MockTests;
