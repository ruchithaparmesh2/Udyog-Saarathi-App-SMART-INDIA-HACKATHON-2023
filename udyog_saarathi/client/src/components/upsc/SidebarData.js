import React from 'react';
import * as FaIcons from 'react-icons/fa';
import { FaPersonRunning } from "react-icons/fa6";
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import { GiMagicLamp } from "react-icons/gi";

export const SidebarData = [
  {
    title: 'UPSC IAS ',
    path: '/upsc/UPSC-IAS-Foundation',
    icon: <FaPersonRunning />,
    cName: 'nav-text-u'
  },
  {
    title: 'CSE Mentorship',
    path: '/upsc/CSE-Mentorship',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text-u'
  },
  {
    title: 'CSIR SO ASO',
    path: '/upsc/CSIR-SO-ASO',
    icon: <GiMagicLamp />,
    cName: 'nav-text-u'
  },
  {
    title: 'State PSC',
    path: '/upsc/State-PSC',
    icon: <IoIcons.IoMdPeople />,
    cName: 'nav-text-u'
  }
];
