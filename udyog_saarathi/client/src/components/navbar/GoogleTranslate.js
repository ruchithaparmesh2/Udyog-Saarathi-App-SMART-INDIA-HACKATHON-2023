import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';

const GoogleTranslate = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <Helmet>
      <script type="text/javascript">
        {`
          function googleTranslateElementInit() {
            new google.translate.TranslateElement({ pageLanguage: 'en' }, 'google_translate_element');
          }
        `}
      </script>
    </Helmet>
  );
};

export default GoogleTranslate;
