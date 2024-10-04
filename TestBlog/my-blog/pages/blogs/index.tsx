// pages/blogs/index.tsx

import { useEffect, useState } from 'react';

import Link from 'next/link';
import { fetchBlogs } from '../../pages/data/fetcher';

// import { blogs } from '../../pages/data/data';

const Blogs = () => {
  const [blogs, setBlogs] = useState<any[]>([]);

  useEffect(() => {
    fetchBlogs().then(data => {
      setBlogs(data);
    });
  }, []);
  
  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-yellow-400">Blogs</h1>
      <div id="blog-container" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div key={blog.id} className="border rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
            <img src={blog.imageUrl} alt={blog.title} className="w-full h-48 object-cover" />
            <div className="p-4 bg-white">
              <h3 className="text-xl font-semibold text-purple-600">{blog.title}</h3>
              <p className="text-gray-700 mb-2">{blog.description}</p>
              <Link href={`/blog/${blog.slug}`}>
                <span className="text-blue-500 hover:underline">Read more</span>
              </Link>
            </div>
          </div>
          ))}
      </div>
    </div>
  );
};

export default Blogs;
