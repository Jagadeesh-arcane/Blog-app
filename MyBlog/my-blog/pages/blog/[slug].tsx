// pages/blog/[slug].tsx

import { GetStaticPaths, GetStaticProps } from 'next';

import Image from "next/legacy/image";
import Link from 'next/link';
import { fetchBlogs } from '../../pages/data/fetcher';

// import { blogs } from '../../pages/data/data';

// export const getStaticPaths: GetStaticPaths = async () => {
//   const paths = blogs.map(post => ({
//     params: { slug: post.slug }
//   }));
//   return { paths, fallback: false };
// };

// export const getStaticProps: GetStaticProps = async ({ params }) => {
//   const post = blogs.find((post) => post.slug === params?.slug);
//   return { props: { post } };
// };

export const getStaticPaths: GetStaticPaths = async () => {
  const blogs = await fetchBlogs(); 
  const paths = blogs.map((post: { slug: string }) => ({
    params: { slug: post.slug }, 
  }));

  return {
    paths,
    fallback: false, 
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const blogs = await fetchBlogs(); 
  const post = blogs.find((post: { slug: string }) => post.slug === params?.slug);
  
  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
    },
    revalidate: 10,
  };
};

const BlogPost = ({ post }: { post: { title: string; content: string; imageUrl: string; quote: string; slug: string; type: string } }) => {

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-800 rounded-lg shadow-lg mt-10">
      <h1 className="text-3xl font-bold text-center text-purple-600 mb-4">
        {post.title}
      </h1>
      
      <div className="my-6 rounded-lg shadow-md overflow-hidden">
        <Image
          src={post.imageUrl}
          alt={post.title}
          width={1200}
          height={700}
          layout="responsive"
          className="rounded-lg transition-transform transform hover:scale-105"
        />
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-300">
        <p className="text-gray-700 text-lg mb-4">{post.content}</p>
        <hr className="my-6 border-gray-200" />
        <blockquote className="border-l-4 border-purple-500 pl-4 italic text-gray-600">
          {post.quote}
        </blockquote>
        <div className="mt-6 text-center">
          <Link href={`/blogs/${post.slug}`} className="text-purple-600 hover:text-purple-800 font-semibold transition">
            View More Posts About {post.type}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
