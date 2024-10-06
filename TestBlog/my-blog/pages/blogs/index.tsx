// pages/blogs/index.tsx

import { useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { fetchBlogs } from '../data/fetcher';

const Blogs = () => {
    const [blogs, setBlogs] = useState<any[]>([]);

    useEffect(() => {
        fetchBlogs().then(data => {
            setBlogs(data);
        });
    }, []);

    return (
        <div className="max-w-7xl mx-auto py-12 px-6">
            <h2 className="text-center text-4xl font-bold mb-10 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                Explore Our Blogs
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogs.map((post, index) => (
                    <div key={index} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl">
                        <div className="relative h-64">
                            <Image 
                                src={post.imageUrl} 
                                alt={post.title} 
                                layout="fill" 
                                objectFit="cover" 
                                className="w-full h-full object-cover transition-opacity duration-300 hover:opacity-90" 
                            />
                        </div>
                        <div className="p-6">
                            <h2 className="text-2xl font-bold mb-4 text-white hover:text-red-500 transition duration-200">
                                {post.title}
                            </h2>
                            <p className="text-gray-500 mb-4">{post.description}</p>
                            <blockquote className="italic text-gray-200 mb-4 border-l-4 border-yellow-400 pl-4">
                                "{post.quote}"
                            </blockquote>
                            <Link 
                                href={`/blogs/${post.slug}`} 
                                className="text-yellow-300 font-semibold hover:underline transition duration-200">
                                Explore {post.title}
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Blogs;
