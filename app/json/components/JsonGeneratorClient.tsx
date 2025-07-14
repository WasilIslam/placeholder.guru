"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { DocumentTextIcon, ArrowLeftIcon, ClipboardDocumentIcon, ArrowDownTrayIcon } from "@heroicons/react/24/outline";

const jsonExamples = {
  users: {
    name: "Users",
    description: "User profiles with names, emails, addresses",
    fields: ["id", "name", "email", "age", "address", "phone"]
  },
  books: {
    name: "Books",
    description: "Book catalog with authors and details",
    fields: ["id", "title", "author", "isbn", "pages", "genre", "published"]
  },
  products: {
    name: "Products",
    description: "E-commerce products with pricing",
    fields: ["id", "name", "price", "category", "stock", "description"]
  },
  posts: {
    name: "Posts",
    description: "Blog posts with content and metadata",
    fields: ["id", "title", "content", "author", "date", "tags"]
  }
};

export default function JsonGeneratorClient() {
  const [selectedType, setSelectedType] = useState<keyof typeof jsonExamples>("users");
  const [count, setCount] = useState(5);
  const [generatedJson, setGeneratedJson] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [origin, setOrigin] = useState("");
  const [copiedStates, setCopiedStates] = useState<{[key: string]: boolean}>({});

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setOrigin(window.location.origin);
    }
  }, []);

  // Auto-generate JSON when type or count changes
  useEffect(() => {
    generateJson();
  }, [selectedType, count]);

  const generateJson = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/json?type=${selectedType}&count=${count}`);
      const data = await response.json();
      setGeneratedJson(JSON.stringify(data, null, 2));
    } catch (error) {
      console.error("Error generating JSON:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async (text: string, key: string) => {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      await navigator.clipboard.writeText(text);
      setCopiedStates(prev => ({ ...prev, [key]: true }));
      setTimeout(() => {
        setCopiedStates(prev => ({ ...prev, [key]: false }));
      }, 2000);
    }
  };

  const copyApiUrl = () => {
    const apiUrl = `/api/json?type=${selectedType}&count=${count}`;
    copyToClipboard(origin + apiUrl, 'api');
  };

  const apiUrl = `/api/json?type=${selectedType}&count=${count}`;

  return (
    <div className="min-h-screen bg-background text-foreground font-[family-name:var(--font-inter)]">
      {/* Header */}
      <header className="px-4 py-6 sm:px-6 lg:px-8 border-b border-border">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-accent hover:text-accent-hover transition-colors">
            placeholder.guru
          </Link>
          <Link href="/" className="flex items-center gap-2 text-muted hover:text-foreground transition-colors">
            <ArrowLeftIcon className="w-4 h-4" />
            Back
          </Link>
        </div>
      </header>

      <main className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">JSON Data Generator</h1>
            <p className="text-muted text-lg">Generate realistic sample data instantly</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Controls */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-3">Data Type</label>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(jsonExamples).map(([key, example]) => (
                    <button
                      key={key}
                      onClick={() => setSelectedType(key as keyof typeof jsonExamples)}
                      className={`p-4 rounded-lg border text-left transition-colors ${
                        selectedType === key
                          ? "border-accent bg-accent/10 text-accent"
                          : "border-border hover:border-accent"
                      }`}
                    >
                      <div className="font-medium">{example.name}</div>
                      <div className="text-sm text-muted">{example.description}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Count</label>
                <input
                  type="number"
                  value={count}
                  onChange={(e) => setCount(parseInt(e.target.value) || 1)}
                  className="w-full px-3 py-2 border border-border rounded-lg text-foreground focus:border-accent focus:outline-none"
                  min="1"
                  max="1000"
                  placeholder="Enter any number (1-1,000)"
                />
              </div>

              {/* API URL */}
              <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
                <h3 className="font-medium mb-2">API URL:</h3>
                <code className="text-sm break-all text-accent font-[family-name:var(--font-jetbrains-mono)] block mb-2">
                  {origin}{apiUrl}
                </code>
                <button
                  onClick={copyApiUrl}
                  className="flex items-center gap-1 text-sm text-accent hover:text-accent-hover transition-colors"
                >
                  <ClipboardDocumentIcon className="w-4 h-4" />
                  {copiedStates.api ? 'Copied!' : 'Copy URL'}
                </button>
              </div>
            </div>

            {/* Generated JSON */}
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-4">Generated JSON:</h3>
                <div className="border border-border rounded-lg bg-background relative">
                  {isLoading && (
                    <div className="absolute inset-0 bg-background/80 flex items-center justify-center rounded-lg">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
                    </div>
                  )}
                  <pre className="p-4 text-sm font-[family-name:var(--font-jetbrains-mono)] overflow-x-auto max-h-96 overflow-y-auto">
                    {generatedJson || "Loading..."}
                  </pre>
                </div>
              </div>

              {generatedJson && (
                <div className="space-y-3">
                  <button
                    onClick={() => copyToClipboard(generatedJson, 'json')}
                    className="w-full bg-accent hover:bg-accent-hover text-white font-medium px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <ClipboardDocumentIcon className="w-5 h-5" />
                    {copiedStates.json ? 'Copied!' : 'Copy JSON'}
                  </button>
                  <button
                    onClick={() => {
                      const blob = new Blob([generatedJson], { type: "application/json" });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement("a");
                      a.href = url;
                      a.download = `${selectedType}-data.json`;
                      a.click();
                      URL.revokeObjectURL(url);
                    }}
                    className="w-full border border-accent text-accent hover:bg-accent hover:text-white font-medium px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <ArrowDownTrayIcon className="w-5 h-5" />
                    Download
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 