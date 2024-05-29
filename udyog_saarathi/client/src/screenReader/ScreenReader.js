import React from 'react';

function ScreenReader() {
  const screenReaders = [
    {
      name: 'ChromeVox',
      website: 'http://www.chromevox.com/27/index.html',
      accessibility: 'Free Only for Chrome Browser',
    },
    {
      name: 'Screen Access For All (SAFA)',
      website: 'http://www.nabdelhi.org/NAB_SAFA.htm',
      accessibility: 'Free',
    },
    {
      name: 'Non Visual Desktop Access (NVDA)',
      website: 'http://www.nvda-project.org/',
      accessibility: 'Free',
    },
    {
      name: 'System Access To Go',
      website: 'http://www.satogo.com/',
      accessibility: 'Free',
    },
    {
      name: 'Thunder',
      website: 'http://www.screenreader.net/index.php?pageid=2',
      accessibility: 'Free',
    },
    {
      name: 'WebAnywhere',
      website: 'http://webanywhere.cs.washington.edu/wa.php',
      accessibility: 'Free',
    },
    {
      name: 'Hal',
      website: 'http://www.yourdolphin.co.uk/productdetail.asp?id=5',
      accessibility: 'Commercial',
    },
    {
      name: 'JAWS',
      website: 'http://www.freedomscientific.com/jaws-hq.asp',
      accessibility: 'Commercial',
    },
    {
      name: 'Supernova',
      website: 'http://www.yourdolphin.co.uk/productdetail.asp?id=1',
      accessibility: 'Commercial',
    },
    {
      name: 'Window-Eyes',
      website: 'http://www.gwmicro.com/Window-Eyes/',
      accessibility: 'Commercial',
    },
  ];

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Screen Reader Access</h2>
      <p className="text-center">
        The website complies with World Wide Web Consortium (W3C) Web Content Accessibility Guidelines (WCAG) 2.0 level AA.
        This will enable people with visual impairments access the website using assistive technologies, such as screen readers.
        The information of the website is accessible with different screen readers, such as JAWS, NVDA, SAFA, Supernova, and Window-Eyes.
      </p>
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Screen Reader</th>
              <th>Website</th>
              <th>Free / Commercial</th>
            </tr>
          </thead>
          <tbody>
            {screenReaders.map((reader, index) => (
              <tr key={index}>
                <td>{reader.name}</td>
                <td>
                  <a href={reader.website} target="_blank" rel="noopener noreferrer">
                    {reader.website}
                  </a>
                </td>
                <td>{reader.accessibility}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ScreenReader;