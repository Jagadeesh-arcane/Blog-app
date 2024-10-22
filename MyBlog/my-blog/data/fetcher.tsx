// pages/data/fetcher.tsx

import { Blog, BlogResponse, BlogType } from '../types/type';
import { GraphQLClient, gql } from 'graphql-request';

const DATOCMS_API_ENDPOINT = 'https://graphql.datocms.com/';
const API_TOKEN = process.env.NEXT_PUBLIC_DATOCMS_API_TOKEN; // Replace this with your actual token

// GraphQL query to fetch blog posts
const BLOG_POSTS_QUERY = gql`
  {
  allBlogPosts {
    id
    title
    image {
      url
    }
    description
    content
    quote
    slug
    types {
      id
      name
      image {
        url
      }
      category
      content
      slug
    }
  }
}
`;

export async function fetchBlogs():Promise<Blog[]> {

  const client = new GraphQLClient(DATOCMS_API_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });

  try {

    const data = await client.request<BlogResponse>(BLOG_POSTS_QUERY);

    return data.allBlogPosts.map((blog: Blog) => ({
      id: blog.id,
      title: blog.title,
      imageUrl: blog.image?.url || '',
      description: blog.description,
      content: blog.content,
      quote: blog.quote,
      slug: blog.slug,
      types: blog.types.map((type: BlogType) => ({
        id: type.id,
        name: type.name,
        imageUrl: type.image?.url || '', // Handle possible null for image
        category: type.category,
        content: type.content,
        slug: type.slug,
      })),
    }));
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}
