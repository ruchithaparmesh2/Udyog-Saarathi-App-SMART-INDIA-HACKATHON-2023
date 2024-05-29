import React from 'react';
import "./Courses.css"
import { useNavigate } from "react-router-dom";
import { useState } from 'react';

const Courses = () => {
  let navigate = useNavigate();
  const goToUpsc=()=>{
    navigate('/upsc/UPSC-IAS-Foundation')
  }
  
  const goToRailway=()=>{
    navigate('/railway')
  }
  const goToBank=()=>{
    navigate('/banking')
  }
  const goToSoftware=()=>{
    navigate('/software-development')
  }
  return (
    <div>
      
      <div className="container mt-2">
{/* <!--   <div className="card card-block mb-2">
    <h4 className="card-c-title">Card 1</h4>
    <p className="card-c-text">Welcom to bootstrap card styles</p>
    <a href="#" className="btn btn-primary">Submit</a>
  </div>   --> */}
  <div className="row">
    <div className="col-md-3 col-sm-6">
      <div className="card card-c card-block" onClick={goToUpsc}>
      <h4 className="card-c-title text-right"></h4>
    <img className='img4' src="https://www.ksgindia.com/images/site/upsc.jpg" alt="Photo of sunset"></img>
        <h5 className="card-c-title mt-3 mb-3 text-center">UPSC</h5>
      
  </div>
    </div>
    <div className="col-md-3 col-sm-6">
      <div className="card card-c card-block" onClick={goToRailway}>
      <h4 className="card-c-title text-right"></h4>
    <img className='img4' src="https://i.pinimg.com/originals/6a/72/4b/6a724b9501764fd83a4abcd37b58144d.png" alt="Photo of sunset"></img>
        <h5 className="card-c-title  mt-3 mb-3 text-center">Railways</h5>
         
  </div>
    </div>
    <div className="col-md-3 col-sm-6">
      <div className="card card-c card-block" onClick={goToBank}>
      <h4 className="card-c-title text-right"></h4>
    <img className='img4' src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Seal_of_the_Reserve_Bank_of_India.svg/800px-Seal_of_the_Reserve_Bank_of_India.svg.png" alt="Photo of sunset"></img>
        <h5 className="card-c-title  mt-3 mb-3 text-center">Banking</h5>
       
  </div>
    </div>
    <div className="col-md-3 col-sm-6">
      <div className="card card-c card-block" onClick={goToSoftware}>
      <h4 className="card-c-title text-right"></h4>
    <img className='img4' src="https://cdn5.vectorstock.com/i/1000x1000/40/99/software-developer-icon-isolated-vector-28234099.jpg" alt="Photo of sunset"></img>
        <h5 className="card-c-title  mt-3 mb-3 text-center">Software Development</h5>
        
  </div>
    </div>    
  </div>
  
</div>

   </div>
  )
}

export default Courses