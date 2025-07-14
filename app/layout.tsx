import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Placeholder.guru - Free Developer Tools for Placeholder Content",
  description: "Free and easy placeholder tools for developers. Generate dummy images, JSON data, and Lorem Ipsum instantly. No signup required, just simple tools that work.",
  keywords: [
    "placeholder tools",
    "free developer tools", 
    "dummy data generator",
    "placeholder images",
    "json generator",
    "lorem ipsum",
    "dev tools",
    "mockup tools",
    "fake data",
    "sample data",
    "prototype tools",
    "wireframe content",
    "api testing",
    "frontend tools",
    "design tools",
    "web development",
    "placeholder content",
    "dummy content generator",
    "test data",
    "development utilities"
  ].join(", "),
  authors: [{ name: "Placeholder.guru" }],
  creator: "Placeholder.guru",
  publisher: "Placeholder.guru",
  metadataBase: new URL("https://placeholder.guru"),
  openGraph: {
    title: "Placeholder.guru - Free Developer Tools",
    description: "Generate placeholder images and sample JSON data instantly. Free tools for developers, designers, and creators.",
    url: "https://placeholder.guru",
    siteName: "Placeholder.guru",
    type: "website",
    images: [
      {
        url: "https://placeholder.guru/api/image?width=1200&height=630&text=Placeholder.guru&backgroundcolor=6366F1&frontcolor=FFFFFF",
        width: 1200,
        height: 630,
        alt: "Placeholder.guru - Free Developer Tools"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Placeholder.guru - Free Developer Tools",
    description: "Generate placeholder images and sample JSON data instantly. Free tools for developers, designers, and creators.",
    images: ["https://placeholder.guru/api/image?width=1200&height=630&text=Placeholder.guru&backgroundcolor=6366F1&frontcolor=FFFFFF"]
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://placeholder.guru"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script type="text/javascript">
          {`(function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "senxh2qz7h");`}
        </script>
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
      </body>
      
    </html>
  );
}
