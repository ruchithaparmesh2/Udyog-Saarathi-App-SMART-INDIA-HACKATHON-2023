import moment from "moment";
import React from "react";
import { useNavigate } from "react-router-dom";

const VideoThumb = ({ video }) => {
  const navigate = useNavigate(); // Replace useHistory with useNavigate

  const handleThumbClick = () => navigate(`/courses/watch/${video.id}`);

  const formattedDate = moment
    .unix(video?.timestamp?.seconds)
    .format("YYYYMMDD, HH:mm:ss");

  console.log(formattedDate);
  const uploadedTime = moment(formattedDate, "YYYYMMDD, HH:mm:ss").fromNow();

  return (
    <div className="videothumb">
      <img
        onClick={handleThumbClick}
        className="videothumb__thumbnail"
        src={video.thumbnailURL}
        alt="Thumbnail"
      />

      <div className="videothumb__details">
        <div className="videothumb__channel">
          <h1 className="videothumb__title">{video.title}</h1>

          <div className="videothumb__texts">
            <p className="videothumb__text">{video.channelName}</p>
            <p className="videothumb__text">123 views • {uploadedTime}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoThumb;
