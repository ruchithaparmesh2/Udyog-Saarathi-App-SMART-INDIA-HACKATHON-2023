
import Button from '@mui/material/Button';
// import makeStyles from '@mui/styles/makeStyles';
import SearchIcon from '@mui/icons-material/Search';
import VideoCallIcon from '@mui/icons-material/VideoCall';

import React from "react";

import { useAppContext } from "../../context/AppContextProvider.js";

import "./style.css";

// const useStyles = makeStyles((theme) => ({
//   large: {
//     width: theme.spacing(7),
//     height: theme.spacing(7),
//   },
// }));


const Header = () => {

  const [anchorEl, setAnchorEl] = React.useState(null);

  // const classes = useStyles();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const { currentUser, setShowUploadVideo } = useAppContext();

  return (
    <div>
          <div className="header">
      <div className="header__left">
       
      </div>

      <form className="header__center">
        <input className="header__input" placeholder="Search" />
        <Button className="header__btn">
          <SearchIcon className="header__searchIcon" />
        </Button>
      </form>

      <div className="header__right">
        <VideoCallIcon onClick={() => setShowUploadVideo(true)} />
      
        

        
      </div>
    </div>

      
    </div>
  )
}

export default Header