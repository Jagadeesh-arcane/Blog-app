// pages/blogs/[slug]/[typeSlug].tsx

import { Blog, BlogType } from '../../../types/type';
import { useEffect, useState } from 'react';

import Image from "next/legacy/image";
import { fetchBlogs } from '../../../data/fetcher';
import { useRouter } from 'next/router';

const TypeDetail = () => {
    const router = useRouter();
    const { slug, typeSlug } = router.query; 
    const [typeDetail, setTypeDetail] = useState<BlogType | null>(null);

    useEffect(() => {
        if (slug && typeSlug) {
            fetchBlogs().then(data => {
                const blogCategory = data.find((blog: Blog) => blog.slug === slug);
                if (blogCategory) {
                    const foundType = blogCategory.types.find((type: BlogType) => type.slug === typeSlug);
                    if (foundType) {
                        setTypeDetail(foundType);
                    }
                }
            });
        }
    }, [slug, typeSlug]);

    if (!typeDetail) {
        return <div className="text-center text-white">Loading...</div>;
    }

    return (
        <div className="bg-transparent text-white max-w-5xl mx-auto p-6 rounded-lg shadow-lg">
            <h1 className="text-4xl font-bold mb-6 text-center text-yellow-300">
                {typeDetail.name}
            </h1>
            {typeDetail.imageUrl && (
                <div className="relative h-96 mb-6 transition-transform transform hover:scale-105">
                    <Image
                        src={typeDetail.imageUrl}
                        alt={typeDetail.name}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg shadow-md"
                    />
                </div>
            )}
            <p className="text-gray-200 mb-6">{typeDetail.content}</p>
            <p className="text-sm text-blue-500 italic">Category: {typeDetail.category}</p>
        </div>
    );
};

export default TypeDetail;
