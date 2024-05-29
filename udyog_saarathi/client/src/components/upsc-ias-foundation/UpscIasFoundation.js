import ReactPlayer from 'react-player'

import React, { useState, useContext,useEffect } from "react";

import { topicContext } from "../../context/TopicContextProvider";
import axios from 'axios';

import "./UpscIasFoundation.css"

import UploadVideo from '../upload-video/UploadVideo';
const TopicCard = ({ title, description, videoUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleCardClick = () => {
    if (isPlaying) {
      alert('Please pause the current video before selecting another one.');
    } else {
      handleTogglePlay();
    }
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  return (
    <div className="card-flyer" onClick={handleCardClick}>
      <div className="text-box">
        <div className="image-box">
          {/* Replace img with ReactPlayer */}
          <ReactPlayer
            url={videoUrl}
            width="100%"
            height="100%"
            controls
            playing={isPlaying}
            muted={false}
            volume={0.8}
            onPause={handlePause}
            onEnded={() => setIsPlaying(false)}
            onPlay={() => setIsPlaying(true)}
          />
        </div>
        <div className="text-container">
          <h6>{title}</h6>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

const UpscIasFoundation = () => {

  let [topic, setTopic] = useContext(topicContext);
  let [errorr, setError] = useState("");
  const getCourses = () => {
    axios
      .get(`course-api/get-course/UPSC-IAS-Foundation`)
      .then((response) => {
        console.log('Response:', response); // Log the entire response object
    console.log('Payload:', response.data.payload); // Log the payload
        if (response.status === 200) {
          
          setTopic(response.data.payload);
          console.log(topic)
        }
        if (response.status !== 200) {
          setError(response.data.message);
        }
      })
      .catch((err) => {
        if (err.response) {
          setError(err.message);
          console.log(err.response);
        } else if (err.request) {
          setError(err.message);
        } else {
          setError(err.message);
        }
      });
  };
  useEffect(() => {
    getCourses();
  }, []);
  return (
    <div id="cards_landscape_wrap-2">
    
      <UploadVideo/>
      <div className="container">
     
     
        <div className="row">
          {topic?.map((topic, index) => (
            <div key={index} className="col-xs-12 col-sm-6 col-md-3 col-lg-3">
              <TopicCard {...topic} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UpscIasFoundation;