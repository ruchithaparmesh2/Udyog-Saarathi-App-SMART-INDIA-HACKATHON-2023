import React, { useContext } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { loginContext } from "../../context/loginContext";
import { FaWheelchair, FaHome, FaSignInAlt, FaSignOutAlt, FaUser, FaFileAlt, FaBookReader, FaVolumeUp, FaUsers } from 'react-icons/fa';
import { GiSpeaker } from "react-icons/gi";
import { Link } from "react-router-dom";
import { RiUserSearchFill } from "react-icons/ri";
import logo from "../../images/logo.jpeg"
import PaidCourses from "../paidCourses/PaidCourses";
import GoogleTranslate from './GoogleTranslate';
import "./NavbarMain.css"

const visuallyHidden = {
  position: 'absolute',
  width: '1px',
  height: '1px',
  margin: '-1px',
  padding: '0',
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  border: '0',
};


const NavbarMain = (props) => {
  let [currentUser, error, userLoginStatus, loginUser, logoutUser, role] = useContext(loginContext);

  const downloadNVDA = () => {
    // Replace this URL with the actual NVDA installer URL
    const nvdaInstallerUrl = "https://www.nvaccess.org/download/nvda/releases/2017.3/nvda_2017.3.exe";

    const anchor = document.createElement("a");
    anchor.href = nvdaInstallerUrl;
    anchor.download = "NVDA_2023.3.exe";

    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  const dropdownStyle = {
    position: "relative",
    zIndex: 1000,
  };

  return (
    <Navbar expand="lg" className="p-0 body">
      <div className="container-fluid px-3 body1">
        
        <div className="flex">
          <Link className="nav-link text-black fs-3 mx-2" to="/">
            <img
              src={logo}
              width="80px"
              height="80px"
              alt="image"
            ></img>{"  "}
            Udyog Saarathi
          </Link>
        </div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto  ">
            <Dropdown className="mt-1 mx-2 ms-auto " style={{ zIndex: 1000 }}>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                <i className="fas fa-wheelchair"></i>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <button
                  onClick={props.increaseFontSize}
                  className="btn d-block m-auto w-100 fs-5 text-dark"
                >
                  {" "}
                  +A
                </button>

                <Dropdown.Divider />
                <button
                  onClick={props.decreaseFontSize}
                  className="btn d-block m-auto w-100 fs-5 text-dark"
                >
                  {" "}
                  -A
                </button>
                <Dropdown.Divider />

                <Dropdown.Divider />
                <Dropdown.Item
                  className="d-block w-75 m-auto p-3"
                  style={{ backgroundColor: "#E50203" }}
                  onClick={() => props.changeColor("#E50203")}
                ></Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item
                  className="d-block w-75 m-auto p-3"
                  style={{ backgroundColor: "#AA9403" }}
                  onClick={() => props.changeColor("#AA9403")}
                ></Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item
                  className="d-block w-75 m-auto p-3"
                  style={{ backgroundColor: "#FF005B" }}
                  onClick={() => props.changeColor("#FF005B")}
                ></Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item
                  className="d-block w-75 m-auto p-3"
                  style={{ backgroundColor: "#FEED00" }}
                  onClick={() => props.changeColor("#FEED00")}
                ></Dropdown.Item>

                <Dropdown.Divider />
                <Dropdown.Item
                  className="text-center"
                  onClick={props.resetColor}
                >
                  D
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <ul className="navbar-nav menu ms-auto text-decoration-none">
              {!userLoginStatus && 
                <ul className="navbar-nav menu ms-auto text-decoration-none">
                    <li className="nav-item dropdown">
                  {/* Make the screen reader access a link */}
                  <Link
                    to="/screenReader"  // Redirect to "/screenReader" on click
                    className="nav-link"
                    style={{
                      padding: "1.3rem",
                      border: "none",
                      background: "none",
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <FaVolumeUp style={{ marginRight: '5px' }} />
                    Screen reader access
                  </Link>
                </li>
                  <li className="nav-item active">
                    <Link
                      className="nav-link  "
                      style={{ padding: "1.3rem" }}
                      to="/"
                    ><FaHome className="mx-2" /> 
                      Home
                    </Link>
                  </li>
                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link   "
                      style={{ padding: "1.3rem" }}
                      to="/login"
                    ><FaSignInAlt className="mx-2" /> 
                      Sign in
                    </Link>
                  </li>
                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link "
                      style={{ padding: "1.3rem" }}
                      to="/register"
                    ><FaSignOutAlt className="mx-2" /> 
                      Sign up
                    </Link>
                  </li>
                </ul>
}
              {userLoginStatus && role == "admin" && 
                <ul className="navbar-nav menu ms-auto text-decoration-none">
                  <li className="nav-item dropdown">
                  {/* Make the screen reader access a link */}
                  <Link
                    to="/screenReader"  // Redirect to "/screenReader" on click
                    className="nav-link"
                    style={{
                      padding: "1.3rem",
                      border: "none",
                      background: "none",
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <FaVolumeUp style={{ marginRight: '5px' }} className="mx-2" />
                    Screen reader access
                  </Link>
                </li>
                  <li className="nav-item active">
                    <Link
                      className="nav-link  "
                      style={{ padding: "1.3rem" }}
                      to="/"
                    ><FaHome className="mx-2" /> 
                      Home
                    </Link>
                  </li>

                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link "
                      style={{ padding: "1.3rem" }}
                      to="/jobs/public"
                    ><FaFileAlt className="mx-2"/>
                      Jobs
                    </Link>
                  </li>
                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link "
                      style={{ padding: "1.3rem" }}
                      to="/coursespage"
                    ><FaBookReader className="mx-2" /> 
                      Courses
                    </Link>
                  </li>
                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link "
                      style={{ padding: "1.3rem" }}
                      to="/mockTestCard"
                    ><FaFileAlt className="mx-2"/> 
                      Tests
                    </Link>
                  </li>
                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link "
                      style={{ padding: "1.3rem" }}
                      to="/users"
                    ><FaUsers className="mx-2"/>
                      Users
                    </Link>
                  </li>
                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link "
                      style={{ padding: "1.3rem" }}
                      to="/login"
                      onClick={logoutUser}
                    ><FaSignOutAlt className="mx-2" />
                      Sign Out
                    </Link>
                  </li>
                </ul>
              }
                            {userLoginStatus && role == "employee" && 
                <ul className="navbar-nav menu ms-auto text-decoration-none">
                  <li className="nav-item dropdown">
                  {/* Make the screen reader access a link */}
                  <Link
                    to="/screenReader"  // Redirect to "/screenReader" on click
                    className="nav-link"
                    style={{
                      padding: "1.3rem",
                      border: "none",
                      background: "none",
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <FaVolumeUp style={{ marginRight: '5px' }} />
                    Screen reader access
                  </Link>
                </li>
                  <li className="nav-item active">
                    <Link
                      className="nav-link  "
                      style={{ padding: "1.3rem" }}
                      to="/"
                    ><FaHome className="mx-2" /> 
                      Home
                    </Link>
                  </li>

                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link "
                      style={{ padding: "1.3rem" }}
                      to="/jobs/public"
                    ><FaFileAlt className="mx-2"/>
                      Jobs
                    </Link>
                  </li>
                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link "
                      style={{ padding: "1.3rem" }}
                      to="/coursespage"
                    ><FaBookReader className="mx-2" /> 
                      Courses
                    </Link>
                  </li>
                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link "
                      style={{ padding: "1.3rem" }}
                      to="/mockTestCard"
                    ><FaFileAlt className="mx-2"/> 
                      Tests
                    </Link>
                  </li>
                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link "
                      style={{ padding: "1.3rem" }}
                      to="/user-profile"
                    ><RiUserSearchFill />
                      User Profile
                    </Link>
                  </li>
                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link "
                      style={{ padding: "1.3rem" }}
                      to="/login"
                      onClick={logoutUser}
                    ><FaSignOutAlt />
                      Sign Out
                    </Link>
                  </li>
                  
                </ul>
              }
              
              <li className="nav-item active">
              <div id="google_translate_element"></div>

{/* Include Google Translate script */}
<GoogleTranslate />
              </li>
            </ul>
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}

export default NavbarMain;