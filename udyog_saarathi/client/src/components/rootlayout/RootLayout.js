import React, { useContext, useEffect } from "react";
import NavbarMain from "../navbar/NavbarMain";
import Footer from "../footer/Footer";

import "./RootLayout.css";
import { Outlet, useLocation } from "react-router-dom";
import { useState } from "react";

function RootLayout() {
  const [selectedColor, setSelectedColor] = useState("default");

  const changeColor = (color) => {
    setSelectedColor(color);
  };

  const resetColor = () => {
    setSelectedColor("transparent");
  };
  const getStyles = () => {
    switch (selectedColor) {
      case "#AA9403":
        return { backgroundColor: "#AA9403", color: "white" };
      case "#E50203":
        return { backgroundColor: "#E50203", color: "white" };
      case "#FF005B":
        return { backgroundColor: "#FF005B", color: "white" };
      case "#FEED00":
        return { backgroundColor: "#FEED00", color: "black" };
      default:
        // Set a transparent color for the default state
        return { backgroundColor: "rgba(0, 0, 0, 0)", color: "black" };
    }
  };
  const [fontSize, setFontSize] = useState(16);
  let location = useLocation();
  let [path, setPath] = useState("none");
  useEffect(() => {
    let url = location.pathname.replace("/", "");
        // Split the path by '/'
    let pathArray = url.split('/');

    // Get the last element of the array
    let lastPart = pathArray[pathArray.length - 1];

    console.log(lastPart); // This will output 'public'
  
    if (lastPart.length === 0) {
      setPath("home");
    } else {
      setPath(lastPart);
    }
  }, [location]);

  // let [domain,setDomain]=useContext(domainContext)
  // useEffect(()=>{
  //   let url=window.location.href;
  //   let baseURL = url.split("/").slice(0, 3).join("/")
  //   console.log(baseURL)
  //   setDomain(baseURL.replace("://","://server."))
  //   console.log(domain)
  // },[location])

  const increaseFontSize = () => {
    setFontSize(fontSize + 2);
  };

  const decreaseFontSize = () => {
    setFontSize(fontSize - 2);
  };
  return (
    <div className={path}>
      <div className="body-main">
        <div
          className="head"
          style={{
            ...getStyles(),
            fontSize: `${fontSize}px`,
            zIndex: "2",
            position: "relative",
          }}
        >
          <NavbarMain
         
            increaseFontSize={increaseFontSize}
            decreaseFontSize={decreaseFontSize}
            getStyles={getStyles}
            resetColor={resetColor}
            changeColor={changeColor}
          />
        </div>
        {/* <div className="d-flex align-items-end flex-column bd-highlight mx-4   ">

<button onClick={increaseFontSize} className="btn-success p-3 text-center">A+</button>
<button onClick={decreaseFontSize}className="btn-primary p-3">A-</button>
</div> 
        
        <div className="sidebar " style={{marginTop:"6rem"}}>
        
            <button
              style={{ backgroundColor: "red"}}
              onClick={() => changeColor("red")}
            ></button>
            <button
              style={{ backgroundColor: "white" }}
              onClick={resetColor}
            ></button>
            <button
              style={{ backgroundColor: "green" }}
              onClick={() => changeColor("green")}
            ></button>
            <button
              style={{ backgroundColor: "blue" }}
              onClick={() => changeColor("blue")}
            ></button>
          </div> */}

        {/* placeholder */}
        <div
          className="main "
          style={{
            ...getStyles(),
            fontSize: `${fontSize}px`,
            zIndex: " 1",
            position: "relative",
          }}
        >
          <Outlet />
        </div>
        <div className="sticky-footer">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default RootLayout;