import { useCallback, useEffect, useState } from 'react';

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

  // Function to generate the HubSpot form
  const generateForm = useCallback(() => {
    const portalId = process.env.NEXT_PUBLIC_HUBSPOT_FORM_PORTAL_ID;
    const formId = process.env.NEXT_PUBLIC_HUBSPOT_FORM_ID;
    const targetId = 'hubspotForm'; // ID for the form container

    if (typeof window !== 'undefined' && window.hbspt) {
      const formEl = document.getElementById(targetId);

      // Ensure the form isn't duplicated
      if (formEl && formEl.innerHTML === '') {
        // Create the HubSpot form as raw HTML and disable default HubSpot CSS
        window.hbspt.forms.create({
          portalId: portalId!,
          formId: formId!,
          target: `#${targetId}`, // Target ID where the form will be rendered
          css: true, // Enable HubSpot's default CSS
        });
      }
    }
  }, []);

  // Load the HubSpot form script dynamically
  useEffect(() => {
    if (!isFormScriptLoaded) {
      const script = document.createElement('script');
      script.src = '//js.hsforms.net/forms/v2.js'; // Correct HubSpot form embed script
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        setIsFormScriptLoaded(true);
        generateForm(); // Generate the form once the script is loaded
      };
    }
  }, [isFormScriptLoaded, generateForm]);

  return (
    <div className="bg-transparent min-h-screen text-white flex flex-col items-center justify-center">
      <section className="py-12 px-6 text-center">
        <h2 className="text-4xl font-bold mb-10 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
          Contact Us
        </h2>

        <div className="group bg-gray-900 p-6 rounded-lg shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 mb-6">
          <p className="text-gray-400 group-hover:text-white transition">
            "Please fill out the form to contact us, We will contact you shortly to discuss uploading your blog content to our site"
          </p>
        </div>

        
      </section>
      {/* HubSpot form container */}
      <div id="hubspotForm" className="w-full max-w-md mx-auto"></div>

      <div className="text-center mt-8">
        <a href="/" className="text-yellow-300 font-bold hover:text-red-500 transition duration-200">
          Go Back to Home
        </a>
      </div>
    </div>
  );
};

export default HubSpotForm;
