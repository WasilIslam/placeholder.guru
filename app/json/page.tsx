import { Metadata } from "next";
import JsonGeneratorClient from "./components/JsonGeneratorClient";

export const metadata: Metadata = {
  title: "Free JSON Generator - Sample Data for Developers | Placeholder.guru",
  description: "Generate realistic sample JSON data instantly. Perfect for testing APIs, databases, and frontend components. Multiple data types: Users, Products, Books, Posts. No signup required.",
  keywords: [
    "json generator",
    "fake data generator",
    "sample json data",
    "test data generator",
    "dummy json",
    "mock data",
    "api testing",
    "database seeding",
    "frontend testing",
    "json placeholder",
    "fake users",
    "sample products",
    "test data",
    "developer tools",
    "json api",
    "mock json",
    "prototype data",
    "realistic fake data"
  ].join(", "),
  authors: [{ name: "Placeholder.guru" }],
  creator: "Placeholder.guru",
  publisher: "Placeholder.guru",
  openGraph: {
    title: "Free JSON Generator - Sample Data for Developers",
    description: "Generate realistic sample JSON data for testing APIs, databases, and frontend components. Multiple data types available.",
    url: "https://placeholder.guru/json",
    siteName: "Placeholder.guru",
    type: "website",
    images: [
      {
        url: "https://placeholder.guru/api/image?width=1200&height=630&text=JSON%20Generator&backgroundcolor=10B981&frontcolor=FFFFFF",
        width: 1200,
        height: 630,
        alt: "Placeholder.guru JSON Generator"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Free JSON Generator - Sample Data for Developers",
    description: "Generate realistic sample JSON data for testing APIs, databases, and frontend components. Multiple data types available.",
    images: ["https://placeholder.guru/api/image?width=1200&height=630&text=JSON%20Generator&backgroundcolor=10B981&frontcolor=FFFFFF"]
  },
  robots: {
    index: true,
    follow: true
  },
  alternates: {
    canonical: "https://placeholder.guru/json"
  }
};

export default function JsonPage() {
  return <JsonGeneratorClient />;
} 