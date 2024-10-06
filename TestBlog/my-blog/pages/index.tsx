// pages/index.tsx

import { useEffect, useState } from 'react';

import Link from 'next/link';
import { fetchBlogs } from '../pages/data/fetcher';

export default function Home() {
  const [blogs, setBlogs] = useState<any[]>([]);

  useEffect(() => {
    fetchBlogs().then(data => {
      setBlogs(data);
    });
  }, []);

  return (
    <div className="bg-transparent min-h-screen text-white">
      <section className="py-12 px-6">
        <h2 className="text-center text-4xl font-bold mb-10 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
          Explore Our Latest Posts
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
          {blogs.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`}>
              <div className="group bg-gray-900 p-6 rounded-lg shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2">
                <h3 className="text-2xl font-bold text-white group-hover:text-pink-500 transition">
                  {post.title}
                </h3>
                <div className="mt-2 h-1 w-12 bg-gradient-to-r from-purple-400 to-pink-600 rounded-full transition-transform transform group-hover:scale-125"></div>
                <p className="mt-4 text-gray-400 group-hover:text-white transition">
                  Click to read more about this post!
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
