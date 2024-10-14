// components/header.tsx

import Image from 'next/image';
import Link from 'next/link';

const Header = () => {

  return (
    <header className="bg-transparent text-white py-3">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Image 
            src="/images/logo.jpg"  // Replace with your actual logo path
            alt="Logo"
            width={50}
            height={50}
            className="rounded-full"
          />
          <div className="text-2xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
            Welcome to My Blog
          </div>
        </div>

        <div className="hidden md:flex justify-center items-center space-x-6">
          <Link href="/" className="text-lg font-semibold">
            <span className="text-white hover:text-orange-500">Home</span>
          </Link>
          <Link href="/blogs" className="text-lg font-semibold">
            <span className="text-white hover:text-orange-500">Blogs</span>
          </Link>
          <Link href="/search" className="text-lg font-semibold">
            <span className="text-white hover:text-orange-500">Search</span>
          </Link>
        </div>

        <span className="hidden md:block">
          <Link href="/chart" className="text-lg font-semibold">
            <span className="text-white hover:text-blue-500">Chart</span>
          </Link>
        </span>
      </nav>

      {/* Mobile Menu */}
      <div className="md:hidden bg-transparent text-white flex flex-col items-center space-y-2 mt-2">
        <Link href="/" className="text-lg font-semibold">
          Home
        </Link>
        <Link href="/blogs" className="text-lg font-semibold">
          Blogs
        </Link>
        <Link href="/search" className="text-lg font-semibold">
          Search
        </Link>
        <Link href="/chart" className="text-lg font-semibold">
          Chart
        </Link>
      </div>
    </header>
  );
};

export default Header;
