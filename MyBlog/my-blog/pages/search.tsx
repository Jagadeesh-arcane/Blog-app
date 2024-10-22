// pages/search.tsx

import { Hits, InstantSearch, SearchBox } from 'react-instantsearch-dom';

import { Algolia } from '../types/type';
import Image from "next/legacy/image";
import algoliasearch from 'algoliasearch/lite';
import { useRouter } from 'next/router';
import { useState } from 'react';

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY!
);

// Component to display individual search result
const HitComponent = ({ hit }: { hit: Algolia }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/blogs/${hit.category.toLowerCase()}/${hit.slug}`);
  };

  return (
    <div 
      onClick={handleClick} 
      className="p-3 my-2 bg-gray-800 rounded-lg shadow-md hover:bg-gray-700 transition-colors cursor-pointer transform hover:scale-105"
    >
      <h3 className="text-lg font-semibold text-blue-200">{hit.title}</h3>
      <p className="text-orange-500 text-sm">{hit.category.toLowerCase()}</p>
    </div>
  );
};

const SearchPage = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  // Function to handle search and redirect to the first blog page
  const handleSearch = async () => {
    const index = searchClient.initIndex('Blog_post');
    const { hits } = await index.search<Algolia>(searchQuery);
    if (hits.length > 0) {
      router.push(`/blogs/${hits[0].category.toLowerCase()}/${hits[0].slug}`);    // Redirect to the first hit
    } else {
      console.log('No results found for your search.');
    }
  };

  return (
    <div className="w-full mx-auto p-6 bg-black bg-opacity-90 rounded-lg shadow-lg mt-16">
      <div className="relative z-10 max-w-3xl mx-auto py-12 px-6 bg-gray-900 bg-opacity-80 rounded-lg shadow-lg mt-14">
        <h1 className="text-center text-4xl font-bold mb-5 bg-gradient-to-r from-red-500 to-blue-600 bg-clip-text text-transparent">
          Search Posts
        </h1>

        <InstantSearch indexName="Blog_post" searchClient={searchClient}>
          <div className="flex flex-col sm:flex-row items-center mb-4">
            <SearchBox
              onChange={(e) => setSearchQuery(e.currentTarget.value)}
              translations={{ placeholder: 'Search for posts...', }}
              className="flex-1 w-full sm:w-3/4 p-3 pr-3 border-4 border-gray-600 rounded-lg focus:outline-none focus:ring-4 focus:ring-red-500 transition-transform transform hover:scale-105"
            />
            <button
              type="button" 
              onClick={handleSearch}    // Redirect on button click
              className="mt-2 sm:mt-0 sm:ml-2 bg-red-700 text-white font-bold p-3 rounded hover:bg-red-700 transition duration-300 transform hover:scale-105">
              Search
            </button>
          </div>

          {/* Render the search hits only if there's a search query */}
          {searchQuery && (
            <div className="mt-4">
              <Hits hitComponent={HitComponent} />
            </div>
          )}
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
