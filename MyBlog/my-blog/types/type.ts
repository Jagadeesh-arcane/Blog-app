// types/type.ts

export interface Blog {
    id: string;
    title: string;
    imageUrl: string;
    image?: { 
        url: string; 
    };
    description: string;
    content: string;
    quote: string;
    slug: string;
    types: BlogType[];
}

export interface BlogType {
    id: string;
    name: string;
    imageUrl: string;
    image?: { 
        url: string; 
    };
    category: string;
    content: string;
    slug: string;
}

export interface BlogResponse {
    allBlogPosts: Blog[];
}

export interface Algolia {
    objectID: string;
    title: string;
    slug: string;
    category: string;
    content: string;
}
  