"use client";

import { useState, useEffect } from "react";
import { DocumentTextIcon, ClipboardDocumentIcon, ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import GeneratorLayout from '../../components/GeneratorLayout';
import ControlPanel from '../../components/ControlPanel';
import PreviewPanel from '../../components/PreviewPanel';
import ApiDocumentation from '../../components/ApiDocumentation';
import { Button, ButtonGroup, Select, Input, FormField, ApiUrlDisplay } from '../../components/FormField';

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
  const [copiedStates, setCopiedStates] = useState<{[key: string]: boolean}>({});

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
      console.error('Error generating JSON:', error);
      setGeneratedJson('Error generating JSON');
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
    const url = `/api/json?type=${selectedType}&count=${count}`;
    const fullUrl = `${window.location.origin}${url}`;
    copyToClipboard(fullUrl, 'api');
  };

  const downloadJson = () => {
    if (typeof document !== 'undefined') {
      const blob = new Blob([generatedJson], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${selectedType}-data.json`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const apiUrl = `/api/json?type=${selectedType}&count=${count}`;

  return (
    <GeneratorLayout
      title="JSON Data Generator"
      description="Generate realistic sample data instantly. Perfect for testing APIs, databases, and applications with structured JSON content."
      icon={<DocumentTextIcon className="w-6 h-6 text-accent" />}
    >
      <div className="space-y-8">
        {/* API URL Display - At the top for quick access */}
        <ApiUrlDisplay
          url={apiUrl}
          onCopy={copyApiUrl}
          copied={copiedStates.api}
        />

        {/* Controls */}
        <ControlPanel title="Data Options">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Data Type Selection */}
            <FormField label="Data Type">
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(jsonExamples).map(([key, example]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedType(key as keyof typeof jsonExamples)}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                      selectedType === key
                        ? 'border-accent bg-accent/10 text-accent shadow-lg'
                        : 'border-border/50 hover:border-accent/50 hover:bg-accent/5'
                    }`}
                  >
                    <div className="font-semibold mb-1">{example.name}</div>
                    <div className="text-sm text-muted">{example.description}</div>
                  </button>
                ))}
              </div>
            </FormField>

            {/* Count Selection */}
            <div className="space-y-4">
              <Input
                label="Number of Items"
                type="number"
                min="1"
                max="100"
                value={count}
                onChange={(e) => setCount(parseInt(e.target.value) || 1)}
                placeholder="5"
              />
              
              {/* Fields Preview */}
              <div className="p-4 bg-muted/10 rounded-xl border border-border/20">
                <div className="text-sm font-medium mb-2">Fields included:</div>
                <div className="flex flex-wrap gap-2">
                  {jsonExamples[selectedType].fields.map((field) => (
                    <span
                      key={field}
                      className="px-2 py-1 bg-accent/10 text-accent rounded text-xs font-mono"
                    >
                      {field}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </ControlPanel>

        {/* Preview */}
        <PreviewPanel title="Generated JSON" isVisible={!!generatedJson}>
          <div className="space-y-6">
            {/* JSON Display */}
            <div className="relative">
              {isLoading && (
                <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center rounded-xl z-10">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
                </div>
              )}
              <pre className="bg-muted/20 border border-border/30 rounded-xl p-4 text-sm font-mono overflow-x-auto max-h-96 overflow-y-auto">
                {generatedJson || "Loading..."}
              </pre>
            </div>

            {/* Action Buttons */}
            {generatedJson && (
              <ButtonGroup>
                <Button
                  onClick={() => copyToClipboard(generatedJson, 'json')}
                  className="flex-1"
                >
                  <ClipboardDocumentIcon className="w-5 h-5" />
                  {copiedStates.json ? 'Copied!' : 'Copy JSON'}
                </Button>
                <Button
                  onClick={downloadJson}
                  variant="outline"
                  className="flex-1"
                >
                  <ArrowDownTrayIcon className="w-5 h-5" />
                  Download
                </Button>
              </ButtonGroup>
            )}
          </div>
        </PreviewPanel>

        {/* API Documentation */}
        <ApiDocumentation
          endpoint="/api/json"
          parameters={[
            {
              name: 'type',
              description: 'users | books | products | posts',
              type: 'string',
              required: true
            },
            {
              name: 'count',
              description: 'number of items to generate (1-100)',
              type: 'number'
            }
          ]}
          examples={[
            {
              url: '/api/json?type=users&count=5',
              description: 'Generate 5 user profiles'
            },
            {
              url: '/api/json?type=products&count=20',
              description: 'Generate 20 product listings'
            },
            {
              url: '/api/json?type=posts',
              description: 'Generate default number of blog posts'
            }
          ]}
        />
      </div>
    </GeneratorLayout>
  );
} 