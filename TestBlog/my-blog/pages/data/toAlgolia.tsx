// pages/data/toAlgolia.tsx

import algoliasearch from 'algoliasearch';
import { fetchBlogs } from './fetcher';

const client = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
  process.env.NEXT_PUBLIC_ALGOLIA_ADMIN_API_KEY!
);

const index = client.initIndex('Blog_post');

const uploadToAlgolia = async () => {
  try {
    const blogs = await fetchBlogs();

    const records = blogs.map((blog: any) => ({
      objectID: blog.id,
      title: blog.title,
      slug: blog.slug,
      types: blog.types.map((type: any) => ({
        objectID: type.id,
        name: type.name,
        category: type.category,
        slug: type.slug,
      })),
    }));

    await index.saveObjects(records);
    console.log('Data uploaded to Algolia successfully');
  } catch (error) {
    console.error('Error uploading data to Algolia:', error);
  }
};

export default uploadToAlgolia;
