import { NextRequest } from 'next/server';

// Data generators
const generators = {
  users: () => ({
    id: Math.floor(Math.random() * 1000) + 1,
    name: generateName(),
    email: generateEmail(),
    age: Math.floor(Math.random() * 50) + 18,
    address: generateAddress(),
    phone: generatePhone()
  }),
  
  books: () => ({
    id: Math.floor(Math.random() * 1000) + 1,
    title: generateBookTitle(),
    author: generateName(),
    isbn: generateISBN(),
    pages: Math.floor(Math.random() * 800) + 100,
    genre: generateGenre(),
    published: generateDate()
  }),
  
  products: () => ({
    id: Math.floor(Math.random() * 1000) + 1,
    name: generateProductName(),
    price: Math.round((Math.random() * 999 + 1) * 100) / 100,
    category: generateCategory(),
    stock: Math.floor(Math.random() * 100),
    description: generateDescription()
  }),
  
  posts: () => ({
    id: Math.floor(Math.random() * 1000) + 1,
    title: generatePostTitle(),
    content: generateContent(),
    author: generateName(),
    date: generateDate(),
    tags: generateTags()
  })
};

// Helper functions
function generateName(): string {
  const firstNames = ['John', 'Jane', 'Alex', 'Sarah', 'Mike', 'Emily', 'David', 'Lisa', 'Chris', 'Anna'];
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];
  return `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
}

function generateEmail(): string {
  const name = generateName().toLowerCase().replace(' ', '.');
  const domains = ['example.com', 'test.com', 'demo.org', 'sample.net'];
  return `${name}@${domains[Math.floor(Math.random() * domains.length)]}`;
}

function generateAddress(): string {
  const streets = ['Main St', 'Oak Ave', 'Elm St', 'Park Rd', 'First Ave'];
  const number = Math.floor(Math.random() * 9999) + 1;
  const zip = Math.floor(Math.random() * 90000) + 10000;
  return `${number} ${streets[Math.floor(Math.random() * streets.length)]}, City, State ${zip}`;
}

function generatePhone(): string {
  const area = Math.floor(Math.random() * 900) + 100;
  const exchange = Math.floor(Math.random() * 900) + 100;
  const number = Math.floor(Math.random() * 9000) + 1000;
  return `+1-${area}-${exchange}-${number}`;
}

function generateBookTitle(): string {
  const adjectives = ['Great', 'Hidden', 'Lost', 'Secret', 'Ancient', 'Modern', 'Digital'];
  const nouns = ['Adventure', 'Mystery', 'Journey', 'Discovery', 'Revolution', 'Guide', 'Story'];
  return `The ${adjectives[Math.floor(Math.random() * adjectives.length)]} ${nouns[Math.floor(Math.random() * nouns.length)]}`;
}

function generateISBN(): string {
  return `978-${Math.floor(Math.random() * 10)}-${Math.floor(Math.random() * 900000) + 100000}-${Math.floor(Math.random() * 90) + 10}-${Math.floor(Math.random() * 10)}`;
}

function generateGenre(): string {
  const genres = ['Fiction', 'Non-Fiction', 'Science Fiction', 'Mystery', 'Romance', 'Biography', 'History', 'Technology'];
  return genres[Math.floor(Math.random() * genres.length)];
}

function generateDate(): string {
  const year = Math.floor(Math.random() * 5) + 2020;
  const month = Math.floor(Math.random() * 12) + 1;
  const day = Math.floor(Math.random() * 28) + 1;
  return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
}

function generateProductName(): string {
  const adjectives = ['Wireless', 'Smart', 'Portable', 'Premium', 'Professional', 'Compact'];
  const products = ['Headphones', 'Speaker', 'Keyboard', 'Mouse', 'Monitor', 'Tablet', 'Phone', 'Laptop'];
  return `${adjectives[Math.floor(Math.random() * adjectives.length)]} ${products[Math.floor(Math.random() * products.length)]}`;
}

function generateCategory(): string {
  const categories = ['Electronics', 'Books', 'Clothing', 'Home & Garden', 'Sports', 'Toys', 'Health'];
  return categories[Math.floor(Math.random() * categories.length)];
}

function generateDescription(): string {
  const descriptions = [
    'High-quality product with excellent features',
    'Perfect for everyday use and professional needs',
    'Innovative design meets functionality',
    'Durable construction with premium materials',
    'User-friendly interface and great performance'
  ];
  return descriptions[Math.floor(Math.random() * descriptions.length)];
}

function generatePostTitle(): string {
  const topics = ['Getting Started with', 'Advanced', 'Complete Guide to', 'Introduction to', 'Mastering'];
  const subjects = ['APIs', 'React', 'TypeScript', 'Web Development', 'JavaScript', 'Node.js', 'CSS'];
  return `${topics[Math.floor(Math.random() * topics.length)]} ${subjects[Math.floor(Math.random() * subjects.length)]}`;
}

function generateContent(): string {
  return 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';
}

function generateTags(): string[] {
  const allTags = ['api', 'tutorial', 'development', 'javascript', 'react', 'typescript', 'web', 'frontend', 'backend'];
  const count = Math.floor(Math.random() * 3) + 1;
  const shuffled = [...allTags].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  
  const type = searchParams.get('type') || 'users';
  const count = Math.min(parseInt(searchParams.get('count') || '5'), 100);

  // Validate type
  if (!(type in generators)) {
    return Response.json({ error: 'Invalid type. Must be one of: users, books, products, posts' }, { status: 400 });
  }

  // Generate data
  const generator = generators[type as keyof typeof generators];
  const data = Array.from({ length: count }, () => generator());

  return Response.json(data, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }
  });
} 