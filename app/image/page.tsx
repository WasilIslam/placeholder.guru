import { Metadata } from "next";
import ImageGeneratorClient from "./components/ImageGeneratorClient";

export const metadata: Metadata = {
  title: "Free Image Generator - Placeholder Images for Developers | Placeholder.guru",
  description: "Generate custom placeholder images instantly. Perfect for developers, designers, and mockups. Support for PNG, JPG, WebP, GIF, AVIF. Custom dimensions, colors, text, and fonts. No signup required.",
  keywords: [
    "placeholder image generator",
    "dummy image creator",
    "mockup images",
    "dev tools",
    "image placeholder",
    "developer tools",
    "placeholder images",
    "fake image generator",
    "prototype images",
    "wireframe images",
    "testing images",
    "png generator",
    "jpg generator",
    "webp generator",
    "custom dimensions",
    "retina images",
    "high dpi images"
  ].join(", "),
  authors: [{ name: "Placeholder.guru" }],
  creator: "Placeholder.guru",
  publisher: "Placeholder.guru",
  openGraph: {
    title: "Free Image Generator - Custom Placeholder Images",
    description: "Generate custom placeholder images with any dimensions, colors, and text. Perfect for developers and designers.",
    url: "https://placeholder.guru/image",
    siteName: "Placeholder.guru",
    type: "website",
    images: [
      {
        url: "https://placeholder.guru/api/image?width=1200&height=630&text=Image%20Generator&backgroundcolor=3B82F6&frontcolor=FFFFFF",
        width: 1200,
        height: 630,
        alt: "Placeholder.guru Image Generator"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Image Generator - Custom Placeholder Images",
    description: "Generate custom placeholder images with any dimensions, colors, and text. Perfect for developers and designers.",
    images: ["https://placeholder.guru/api/image?width=1200&height=630&text=Image%20Generator&backgroundcolor=3B82F6&frontcolor=FFFFFF"]
  },
  robots: {
    index: true,
    follow: true
  },
  alternates: {
    canonical: "https://placeholder.guru/image"
  }
};

export default function ImagePage() {
  return <ImageGeneratorClient />;
} 