import React from 'react'

import MyCarousel from '../carousel/MyCarousel';

function Home() {
  const carouselItems = [
    'https://static.atypicaladvantage.in/component_uploads/cEVZRooOmBcTLkX9otOXxkhFSiZLhT3xMgm3aEfp.png',
    'https://i0.wp.com/ketto.blog/wp-content/uploads/2021/12/International-Day-of-Persons-With-Disabilities.jpg?fit=5000%2C3000&ssl=1',
    'https://pibindia.files.wordpress.com/2017/05/accessible_india_logo.png',
  ];
  return (
    
    <div className='text-center text-black display-6 ' style={{height:"100vh"}}>
      <MyCarousel carouselItems={carouselItems} />
    </div>
  )
}

export default Home