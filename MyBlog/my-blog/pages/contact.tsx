// pages/contact.tsx

import { useCallback, useEffect, useState } from 'react';

import Link from 'next/link';

declare global {
  interface Window {
    hbspt: {
      forms: {
        create: (options: {
          portalId: string;
          formId: string;
          target: string;
          css: string | boolean;
        }) => void;
      };
    };
  }
}

const HubSpotForm = () => {
  const [isFormScriptLoaded, setIsFormScriptLoaded] = useState(false);

  const generateForm = useCallback(() => {
    const portalId = process.env.NEXT_PUBLIC_HUBSPOT_FORM_PORTAL_ID;
    const formId = process.env.NEXT_PUBLIC_HUBSPOT_FORM_ID;
    const targetId = 'hubspotForm';

    if (typeof window !== 'undefined' && window.hbspt) {
      const formEl = document.getElementById(targetId);

      if (formEl && formEl.innerHTML === '') {
        window.hbspt.forms.create({
          portalId: portalId!,
          formId: formId!,
          target: `#${targetId}`,
          css: false,
        });
      }
    }
  }, []);

  useEffect(() => {
    if (!isFormScriptLoaded) {
      const script = document.createElement('script');
      script.src = '//js.hsforms.net/forms/v2.js';
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        setIsFormScriptLoaded(true);
        generateForm();
      };
    }
  }, [isFormScriptLoaded, generateForm]);

  return (
    <div className="bg-transparent min-h-screen text-white">
      <section className="py-12 px-6">
        <h2 className="text-center text-4xl font-bold mb-10 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent mr-2">
          Contact Us
        </h2>

        <div className="grid grid-cols-1 gap-20">
          <div className="group bg-gray-900 p-6 rounded-lg shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2">
            <p className="text-gray-400 text-center group-hover:text-white transition">
              &quot;Please fill out the form to contact us, We will contact you shortly to add your blog content to our site&quot;
            </p>
          </div>
        </div>
      </section>

      <div id="hubspotForm" className="my-8 ml-60 mr-60"></div>

      <div className="text-center mt-8">
        <Link href="/" className="text-blue-700 font-bold hover:text-red-500 transition duration-200">
          Go Back to Home
        </Link>
      </div>

      {/* CSS Styles directly in the component */}
      <style type="text/css">{`
        .hs-form input, 
        .hbspt-form .hs-form textarea, 
        .hbspt-form .hs-form select { 
          background-color: #9E9E9E !important; /* Ensure gray background */
          border: solid 2px #FF69B4;
          font-size: 16px;
          color: #003366;
          -moz-border-radius: 50px;
          -webkit-border-radius: 50px;
          border-radius: 50px;
          padding: 5px 10px;
          margin: 5px 0px;
        }
        .hs-form input::placeholder, 
        .hbspt-form .hs-form textarea::placeholder {
          font-size: 15px;
          color: #000000;
        }
        .hs-form .input label {
          font-size: 16px;
          color: #000000;
          font-weight: normal;
          padding-top: 0px;
          padding-bottom: 0px;
          display: block;
        }
        .hs-form .actions .hs-button.primary.large {
          background-color: #D5006D !important;
          border: solid 3px #FF69B4;
          font-size: 16px;
          color: #FFFFFF;
          font-weight: bold;
          padding-top: 10px;
          padding-bottom: 10px;
          padding-right: 10px;
          padding-left: 10px;
          -moz-border-radius: 11px;
          -webkit-border-radius: 11px;
          border-radius: 11px;
        }
        .hs-form .actions {
          margin-top: 2px;
          margin-bottom: 0px;
          text-align: center;
        }
        ul.hs-error-msgs {
          padding: 0px 0px 10px 0px;
          list-style-type: none;   
          font-size: 14px;
          color: #FF0000;
          font-weight: normal;
          text-align: left;
        }
        .submitted-message p {
          font-size: 16px;
          color: #80FF00;
          font-weight: normal;
          text-align: left;
        }
        .hs-form textarea {
          height: 68px;
          resize: none;
        }
        .hbspt-form .hs-form .input label {
          float: none;
          text-align: left;
        }
        .submitted-message {
          min-height: 50px;
        }
      `}</style>
    </div>
  );
};

export default HubSpotForm;
