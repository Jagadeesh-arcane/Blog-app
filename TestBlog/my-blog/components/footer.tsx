// components/Footer.tsx
const Footer = () => {
    return (
      <footer className="bg-gray-900 text-white py-2 mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-lg">&copy; {new Date().getFullYear()} My Blog. All rights reserved.</p>
          <p className="text-sm mt-2">Follow us on social media!</p>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  