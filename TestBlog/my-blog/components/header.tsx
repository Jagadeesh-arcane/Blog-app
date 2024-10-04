// components/Header.tsx

import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-transparent text-white py-1">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ul className="flex justify-end items-center space-x-6">
          <li className="mr-6">
            <Link href="/" className="text-lg font-semibold hover:text-yellow-900">
                <span className="text-white text-lg font-semibold hover:text-yellow-300">
                    Home
                </span>
            </Link>
          </li>
          <li className="mr-6">
            <Link href="/blogs" className="text-lg font-semibold hover:text-yellow-900">
                <span className="text-white text-lg font-semibold hover:text-yellow-300">
                    Blogs
                </span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
