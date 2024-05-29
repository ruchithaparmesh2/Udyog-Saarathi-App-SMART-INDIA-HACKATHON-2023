// Carousel.js
import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './Carousel.css';

const MyCarousel = ({ carouselItems }) => {
  return (
    <Carousel className="my-carousel" interval={1100 /* Adjust the interval time in milliseconds */}>
      {carouselItems.map((item, index) => (
        <Carousel.Item key={index}>
          <img
            className="d-block w-100"
            src={item}
            alt={`Slide ${index + 1}`}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default MyCarousel;