import { GraphQLClient, gql } from 'graphql-request';

const DATOCMS_API_ENDPOINT = 'https://graphql.datocms.com/';
const API_TOKEN = '2081f445fe9651aa784d20bbb173f8'; // Replace this with your actual token

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
  }
}
`;


export async function fetchBlogs() {

  const client = new GraphQLClient(DATOCMS_API_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });

  try {

    const data = await client.request(BLOG_POSTS_QUERY);

    return data.allBlogPosts.map((blog: any) => ({
      id: blog.id,
      title: blog.title,
      imageUrl: blog.image.url,
      description: blog.description,
      content: blog.content,
      quote: blog.quote,
      slug: blog.slug,
    }));
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}
