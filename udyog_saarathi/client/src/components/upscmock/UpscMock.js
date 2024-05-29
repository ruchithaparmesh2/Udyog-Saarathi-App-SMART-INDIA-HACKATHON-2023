import React from 'react';
import { Link } from 'react-router-dom';

function UpscMock() {
  const mockTests = [
    {
      image: 'https://st.adda247.com/https://storeimages.adda247.com/UPPSCROAROPrelims202324PaperIPaperII1701780386.png?tr=w-193',
      name: 'UPPSC RO/ARO Mock Test Series 2023-24',
      link: 'https://www.adda247.com/product-testseries/21242/uppsc-ro-aro-mock-test-series-2023-in-english-hindi-by-adda247?examCategory=state-psc&productId=21488',
    },
    {
      image: 'https://st.adda247.com/https://storeimages.adda247.com/HPSCHCSPRELIMS2024ONLINETESTSERIES1700647650.png?tr=w-193',
      name: 'HPSC HCS Mock Test Series 2024',
      link: 'https://www.adda247.com/product-testseries/21218/hpsc-hcs-online-test-series-by-adda247?examCategory=state-psc&productId=21464',
    },
    {
      image: 'https://st.adda247.com/https://d2fldgtygklyv6.cloudfront.net/367771693645740.png?tr=w-193',
      name: 'UPSC CSE Prelims - Previous Years Papers (2014-2023)',
      link: 'https://www.adda247.com/product-testseries/36779/upsc-cse-prelims-previous-years-papers-2014-2023-in-english-hindi-medium-online-test-series-by-adda247?examCategory=upsc-cse-ias&productId=36780',
    },
    {
      image: 'https://st.adda247.com/https://d2fldgtygklyv6.cloudfront.net/TestSeries1690536219.png?tr=w-193',
      name: 'UPSC CSE Prelims 2024 Complete Online Test Series',
      link: 'https://www.adda247.com/product-testseries/14694/upsc-cse-prelims-2024-complete-online-test-series-by-adda247?examCategory=upsc-cse-ias&productId=14943',
    },
  ];

  return (
    <div className="container mt-5">
      <div className="row">
        {mockTests.map((test, index) => (
           <div key={index} className="col-md-3 mb-4">
            <div className="card">
              <img src={test.image} className="card-img-top" alt={`Mock Test ${index + 1}`} />
              <div className="card-body">
                <h5 className="card-title">{test.name}</h5>
                <Link to={test.link} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                  Apply
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UpscMock;