import React from 'react';

import { GiLion } from "react-icons/gi";
import { CiBank } from "react-icons/ci";
import { MdDirectionsRailwayFilled } from "react-icons/md";
import { GoLaw } from "react-icons/go";

export const SidebarData = [
  {
    title: 'Law',
    path: '/mock-tests/law',
    icon: <GoLaw />,
    cName: 'nav-text-u'
  },
  {
    title: 'UPSC',
    path: '/mock-tests/upscmock',
    icon: <GiLion />,
    cName: 'nav-text-u'
  },
  {
    title: 'Banking',
    path: '/mock-tests/banking',
    icon: <CiBank />,
    cName: 'nav-text-u'
  },
  {
    title: 'Railway',
    path: '/mock-tests/railway',
    icon: <MdDirectionsRailwayFilled />,
    cName: 'nav-text-u'
  },
 
];