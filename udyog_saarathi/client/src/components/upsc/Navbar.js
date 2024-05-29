import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './Navbar.css';
import { IconContext } from 'react-icons';

function Navbar() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: 'black' }}  >
        <div className='navbar-u '>
          <Link to='#' className='text-decoration-none' id="menu-bars-u" onClick={showSidebar} >
            <FaIcons.FaBars /> All Courses
          </Link>
        </div>
        <nav className={sidebar ? 'nav-menu-u active front' : 'nav-menu-u'}>
          <ul className='nav-menu-u-items p-0' onClick={showSidebar}>
            <li className='navbar-u-toggle'>
              <Link to='#' className='menu-bars-close'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;