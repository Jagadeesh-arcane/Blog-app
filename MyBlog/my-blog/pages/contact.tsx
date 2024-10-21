// pages/form.tsx

import Link from 'next/link';
import { useEffect } from 'react';

const HubSpotForm = () => {
  useEffect(() => {
    const portalID = process.env.NEXT_PUBLIC_HUBSPOT_FORM_PORTAL_ID;
    const formID = process.env.NEXT_PUBLIC_HUBSPOT_FORM_ID;
    console.log("data",portalID);
    const script = document.createElement('script');
    script.src = '//js.hsforms.net/forms/embed/v2.js';
    script.async = true;
    document.body.appendChild(script);

    // Initialize HubSpot Form
    script.onload = () => {
      if ((window as any).hbspt) {
        (window as any).hbspt.forms.create({
          portalId: portalID,        // Replace with your HubSpot Portal ID
          formId: formID,           // Replace with your HubSpot Form ID
          target: '#hubspotForm',
        });
      }
    };
  }, []);

  return (
    <div className="bg-transparent min-h-screen text-white">
      <section className="py-12 px-6">
        <h2 className="text-center text-4xl font-bold mb-10 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
          Contact Us
        </h2>
        <div className="grid grid-cols-1 gap-20">
          <div className="group bg-gray-900 p-6 rounded-lg shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2">
            <p className="mt text-gray-400 text-center group-hover:text-white transition">
              Please fill out the form below to upload your blogs and get in touch with us.
            </p>
          </div>
        </div>
      </section>

      <div id="hubspotForm" className="my-8"></div>

      <div className="text-center mt-8">
            <Link href="/" className="text-yellow-300 font-bold hover:text-red-500 transition duration-200">
                Go Back to Home
            </Link>
        </div>
    </div>
  );
};

export default HubSpotForm;
