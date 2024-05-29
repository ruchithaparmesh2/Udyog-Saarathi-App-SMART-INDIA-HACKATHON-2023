

import Genre from ".././Genre/index";
import "./Sidebar.css";
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';



import { IconContext } from 'react-icons';


const Sidebar = ({ handleChange1 ,filterCat,cat,setFilterCat}) => {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);
  return (
    <>
      <IconContext.Provider value={{ color: 'black' }}  >
        <div className='sidebar-u '>
          <Link to='#' className='text-decoration-none' id="menu-bars-u" onClick={showSidebar} >
            <FaIcons.FaBars /> All 
          </Link>
        </div>
        <nav className={sidebar ? 'side-menu-u active front' : 'side-menu-u'}>
          <ul className='side-menu-u-items p-0 h-100 ' >
            <li className='sidebar-u-toggle' onClick={showSidebar}>
              <Link to='#' className='menu-bars-close'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            <li className="fw-bolder">
         
            <Genre
							filterCat={filterCat}
							cat={cat}
							setFilterCat={setFilterCat}
						/>
    
            </li>
            
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
};

export default Sidebar;

