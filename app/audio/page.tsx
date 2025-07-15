import { Metadata } from "next";
import AudioGeneratorClient from "./components/AudioGeneratorClient";

export const metadata: Metadata = {
  title: "Free Audio Generator - Placeholder Audio for Developers | Placeholder.guru",
  description: "Generate placeholder audio files instantly. Perfect for developers, designers, and mockups. Support for speech and tune samples. Custom audio for testing and prototyping. No signup required.",
  keywords: [
    "placeholder audio generator",
    "dummy audio creator",
    "mockup audio",
    "dev tools",
    "audio placeholder",
    "developer tools",
    "placeholder audio",
    "fake audio generator",
    "prototype audio",
    "testing audio",
    "speech samples",
    "tune samples",
    "mp3 generator",
    "audio api",
    "audio testing"
  ].join(", "),
  authors: [{ name: "Placeholder.guru" }],
  creator: "Placeholder.guru",
  publisher: "Placeholder.guru",
  openGraph: {
    title: "Free Audio Generator - Custom Placeholder Audio",
    description: "Generate placeholder audio files with speech and tune samples. Perfect for developers and designers.",
    url: "https://placeholder.guru/audio",
    siteName: "Placeholder.guru",
    type: "website",
    images: [
      {
        url: "https://placeholder.guru/api/image?width=1200&height=630&text=Audio%20Generator&backgroundcolor=10B981&frontcolor=FFFFFF",
        width: 1200,
        height: 630,
        alt: "Placeholder.guru Audio Generator"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Audio Generator - Custom Placeholder Audio",
    description: "Generate placeholder audio files with speech and tune samples. Perfect for developers and designers.",
    images: ["https://placeholder.guru/api/image?width=1200&height=630&text=Audio%20Generator&backgroundcolor=10B981&frontcolor=FFFFFF"]
  },
  robots: {
    index: true,
    follow: true
  },
  alternates: {
    canonical: "https://placeholder.guru/audio"
  }
};

export default function AudioPage() {
  return <AudioGeneratorClient />;
} 