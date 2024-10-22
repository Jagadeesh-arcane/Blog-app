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

    const records = blogs.flatMap((blog: any) =>
      blog.types.map((type: any) => ({
        objectID: `${blog.id}_${type.id}`, 
        title: type.name, 
        slug: type.slug, 
        category: blog.title, 
        content: type.content,
      }))
    );

    await index.saveObjects(records);
    console.log('Data uploaded to Algolia successfully');
  } catch (error) {
    console.error('Error uploading data to Algolia:', error);
  }
};

export default uploadToAlgolia;
