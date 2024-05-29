import React from 'react';
const courseData = [
  {
    image: 'https://st.adda247.com/https://storeimages.adda247.com/394311699260099.png?tr=w-undefined',
    name: 'PUNJAB State TET Paper - 1',
    price: '₹ 999.75',
    applyLink: 'https://www.adda247.com/product-comprehensive-video/39431/punjab-state-tet-paper-1-video-course?productId=39432',
  },
  {
    image: 'https://st.adda247.com/https://storeimages.adda247.com/24753RBIGradeB1702036068.png?tr=w-undefined',
    name: 'RBI Grade B',
    price: '₹ 2,249.75',
    applyLink: 'https://www.adda247.com/product-comprehensive-video/24753/rbi-grade-b-comprehensive-batch-phase-i-phase-ii-bilingual-video-course-by-adda247?productId=24998',
  },
  {
    image: 'https://st.adda247.com/https://d2fldgtygklyv6.cloudfront.net/164821661405193.png?tr=w-undefined',
    name: 'SSC JE Electrical',
    price: '₹ 1,999.75',
    applyLink: 'https://www.adda247.com/product-comprehensive-video/16483/ssc-je-electrical-tech-non-tech-video-course-by-adda247?productId=16732',
  },
  {
    image: 'https://st.adda247.com/https://storeimages.adda247.com/41820SBIClerk20231702035997.png?tr=w-undefined',
    name: 'SBI Clerk 2023',
    price: '₹ 1,749.75',
    applyLink: 'https://www.adda247.com/product-comprehensive-video/41820/sbi-clerk-2023-video-course-prelims-mains-complete-video-course-by-adda247?productId=41821',
  },
];


function PaidCourses() {
  return (
    <div className="container mt-5">
    <div className="row">
      {courseData.map((course, index) => (
        <div key={index} className="col-md-3 mb-4">
          <div className="card">
            <img src={course.image} className="card-img-top" alt={course.name} />
            <div className="card-body">
              <h5 className="card-title" style={{ color: 'red', fontSize: '1.25rem', fontWeight: 'bold' }}>
                {course.name}
              </h5>
              <p className="card-text" style={{ color: 'green', fontSize: '1.1rem', fontWeight: 'bold' }}>
                {course.price}
              </p>
              <a href={course.applyLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                Apply
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
  );
}

export default PaidCourses;