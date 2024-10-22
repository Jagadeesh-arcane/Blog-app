import Link from 'next/link';
import { useEffect } from 'react';

declare global {
  interface Window {
      hbspt: {
          forms: {
              create: (options: {
                  portalId: string | undefined;
                  formId: string | undefined;
                  target: string;
                  css: string;
                  onFormReady: () => void;
              }) => void;
          };
      };
  }
}


const HubSpotForm = () => {
  useEffect(() => {
    const portalID = process.env.NEXT_PUBLIC_HUBSPOT_FORM_PORTAL_ID;
    const formID = process.env.NEXT_PUBLIC_HUBSPOT_FORM_ID;

    const script = document.createElement('script');
    script.src = '//js.hsforms.net/forms/embed/v2.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.hbspt) {
        window.hbspt.forms.create({
          portalId: portalID,
          formId: formID,
          target: '#hubspotForm',
          css: '',
          onFormReady: () => {
            const iframe = document.querySelector('#hubspotForm iframe') as HTMLIFrameElement;
            const iframeDocument = iframe.contentDocument || iframe.contentWindow?.document;

            if (iframeDocument) {
              const styleTag = iframeDocument.createElement('style');
              styleTag.innerHTML = `
                .hs-input {
                  background-color: #1f2937; /* Tailwind's bg-gray-800 */
                  border: 3px solid #d40000; /* Tailwind's border-purple-600 */
                  color: white; /* Tailwind's text-white */
                  padding: 0.75rem; /* Tailwind's p-3 */
                  border-radius: 0.5rem; /* Tailwind's rounded-lg */
                  transition: border-color 0.3s; /* Smooth transition */
                }
                .hs-input:focus {
                  border-color: #ec4899; /* Tailwind's focus:border-pink-500 */
                }
                .hs-button {
                  background-color: #ff0101; /* Tailwind's bg-pink-500 */
                  color: white; /* Tailwind's text-white */
                  padding: 0.5rem 1rem; /* Tailwind's px-4 py-2 */
                  border-radius: 0.5rem; /* Tailwind's rounded-lg */
                  transition: background-color 0.3s; /* Smooth transition */
                }
                .hs-button:hover {
                  background-color: #ff8e1d; /* Tailwind's bg-purple-600 */
                }
                .hs-error-msg {
                  color: #f87171; /* Tailwind's text-red-500 */
                  font-size: 0.875rem; /* Tailwind's text-sm */
                  margin-top: 0.5rem; /* Tailwind's mt-2 */
                }
                label {
                  color: #d1d5db; /* Tailwind's text-gray-300 */
                }
              `;
              iframeDocument.head.appendChild(styleTag);
            }
          },
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
            <p className="text-gray-400 text-center group-hover:text-white transition">
              Please fill out the form below to get in touch with us.
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
