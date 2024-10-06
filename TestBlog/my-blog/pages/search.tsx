// pages/search.tsx

import { InstantSearch, SearchBox } from 'react-instantsearch-dom';

import Image from 'next/image';
import algoliasearch from 'algoliasearch/lite';
import { useRouter } from 'next/router';
import { useState } from 'react';

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY!
);

const SearchPage = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  // Function to handle search and redirect to blog page
  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); 
    if (searchQuery) {
      const index = searchClient.initIndex('Blog_post');
      const { hits } = await index.search(searchQuery);
      if (hits.length > 0) {
        router.push(`/blogs/${hits[0].slug}`);
      } else {
        console.log('No results found for your search.');
      }
    }
  };

  return (
    <div className="w-full mx-auto p-6 bg-black bg-opacity-40 rounded-lg shadow-lg mt-16">
      <div className="relative z-10 max-w-3xl mx-auto py-12 px-6 bg-black bg-opacity-50 rounded-lg shadow-lg mt-14">
        <h1 className="text-center text-4xl font-bold mb-5 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
          Search Posts
        </h1>

        <InstantSearch indexName="Blog_post" searchClient={searchClient}>
          <div className="flex flex-col sm:flex-row items-center mb-4">
            <SearchBox
              onSubmit={handleSearch} 
              onChange={(e) => setSearchQuery(e.currentTarget.value)}
              translations={{
                placeholder: 'Search for posts...',
              }}
              className="flex-1 w-full sm:w-3/4 p-3 pr-0 border-4 border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-600 transition-transform transform hover:scale-105"
            />
            <button
              type="button" 
              onClick={handleSearch}
              className="mt-2 sm:mt-0 sm:ml-2 bg-purple-600 text-white p-3 rounded hover:bg-purple-700 transition duration-300 transform hover:scale-105"
            >
              Search
            </button>
          </div>
        </InstantSearch>

        <div className="mt-8 w-full flex justify-center">
          <Image
            src="/images/logo.jpg" // Replace with your decorative image path
            alt="Decorative"
            width={200}
            height={200}
            className="rounded-full transition-transform transform hover:scale-110"
          />
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
