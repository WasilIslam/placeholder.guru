// JSON Schema definitions for placeholder.guru API responses

export interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  address: {
    street: string;
    city: string;
    zipcode: string;
    country: string;
  };
  phone: string;
}

export interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  pages: number;
  genre: string;
  published: string;
  description: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  stock: number;
  description: string;
  image: string;
  rating: number;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
  tags: string[];
  excerpt: string;
}

export type DataType = 'users' | 'books' | 'products' | 'posts';

export interface ApiResponse<T> {
  data: T[];
  count: number;
  type: string;
} 