import { Metadata } from "next";
import TextGeneratorClient from "./components/TextGeneratorClient";

export const metadata: Metadata = {
  title: "Free Text Generator - Lorem Ipsum & Placeholder Text | Placeholder.guru",
  description: "Generate Lorem Ipsum, random text, and custom placeholder text instantly. Perfect for mockups, designs, and development. Multiple text types and customization options.",
  keywords: [
    "lorem ipsum generator",
    "placeholder text",
    "dummy text generator",
    "random text generator",
    "text placeholder",
    "fake text",
    "sample text",
    "mock text",
    "lipsum generator",
    "design text",
    "filler text",
    "dummy content",
    "text mockup",
    "developer tools",
    "design tools",
    "prototype text"
  ].join(", "),
  authors: [{ name: "Placeholder.guru" }],
  creator: "Placeholder.guru",
  publisher: "Placeholder.guru",
  openGraph: {
    title: "Free Text Generator - Lorem Ipsum & Placeholder Text",
    description: "Generate Lorem Ipsum, random text, and custom placeholder text instantly. Perfect for mockups and development.",
    url: "https://placeholder.guru/text",
    siteName: "Placeholder.guru",
    type: "website",
    images: [
      {
        url: "https://placeholder.guru/api/image?width=1200&height=630&text=Text%20Generator&backgroundcolor=8B5CF6&frontcolor=FFFFFF",
        width: 1200,
        height: 630,
        alt: "Placeholder.guru Text Generator"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Text Generator - Lorem Ipsum & Placeholder Text",
    description: "Generate Lorem Ipsum, random text, and custom placeholder text instantly. Perfect for mockups and development.",
    images: ["https://placeholder.guru/api/image?width=1200&height=630&text=Text%20Generator&backgroundcolor=8B5CF6&frontcolor=FFFFFF"]
  },
  robots: {
    index: true,
    follow: true
  },
  alternates: {
    canonical: "https://placeholder.guru/text"
  }
};

export default function TextPage() {
  return <TextGeneratorClient />;
} 