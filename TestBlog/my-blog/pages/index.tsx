import { useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { fetchBlogs } from '../pages/data/fetcher';
// import { blogs } from '../pages/data/data';

export default function Home() {
  const [blogs, setBlogs] = useState<any[]>([]);

  useEffect(() => {
    fetchBlogs().then(data => {
      setBlogs(data);
    });
  }, []);

  return (
    <div>
      <h1 className="bg-gradient-to-r from-purple-400 to-pink-600 text-white text-4xl font-bold py-4 px-6 rounded-lg shadow-lg" >
        Welcome to My Blog
      </h1>
      <ul className="flex flex-col items-center space-y-3 mt-10 space-y-6">
        {blogs.map((post, index) => (
          <li key={post.id}>
            <Link href={`/blog/${post.slug}`}>
            <div className="bg-white text-blue-600 font-semibold text-2xl py-3 px-6 rounded-full shadow-md transition transform hover:scale-105 hover:shadow-lg">
              {post.title}
            </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
