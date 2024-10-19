// pages/blogs/[slug].tsx

import { useEffect, useState } from 'react';

import Image from "next/legacy/image";
import Link from 'next/link';
import { fetchBlogs } from '../data/fetcher';
import { useRouter } from 'next/router';

const BlogCategory = () => {
    const router = useRouter();
    const { slug } = router.query; 
    const [blogCategory, setBlogCategory] = useState(null);

    useEffect(() => {
        if (slug) {
            fetchBlogs().then(data => {
                const foundCategory = data.find(blog => blog.slug === slug);
                setBlogCategory(foundCategory);
            });
        }
    }, [slug]);

    if (!blogCategory) {
        return <div className="text-center text-white">Loading...</div>;
    }

    return (
        <div className="bg-transparent text-white max-w-7xl mx-auto p-6">
            <h1 className="text-center text-4xl font-bold mb-10 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                {blogCategory.title} Types
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
                {blogCategory.types.map((type) => (
                    <div key={type.id} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl">
                        <div className="relative h-64">
                            <Image 
                                src={type.imageUrl} 
                                alt={type.name} 
                                layout="fill" 
                                objectFit="cover" 
                                className="w-full h-full object-cover transition-opacity duration-300 hover:opacity-90" 
                            />
                        </div>
                        <div className="p-6">
                            <h2 className="text-2xl font-bold mb-4 text-white-500 hover:text-orange-500 transition duration-200">
                                {type.name}
                            </h2>
                            <p className="text-gray-500 mb-2">Category: {type.category}</p>
                            <Link 
                                href={`/blogs/${slug}/${type.slug}`} 
                                className="text-yellow-400 font-semibold hover:underline transition duration-200">
                                Read More
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BlogCategory;
