'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ClipboardIcon, ArrowDownTrayIcon, ChevronDownIcon, ChevronUpIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

type TextType = 'lorem' | 'random' | 'repeat' | 'sentences' | 'business' | 'tech' | 'pirate' | 'zombie' | 'space' | 'medieval' | 'nonsense';

interface TextParams {
  type: TextType;
  length: number;
  text?: string;
}

export default function TextGeneratorClient() {
  const [params, setParams] = useState<TextParams>({
    type: 'lorem',
    length: 50
  });
  const [generatedText, setGeneratedText] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [textCopied, setTextCopied] = useState(false);
  const [urlCopied, setUrlCopied] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const textTypes = [
    { value: 'lorem' as TextType, label: 'Lorem Ipsum', description: 'Classic placeholder text' },
    { value: 'random' as TextType, label: 'Random Words', description: 'Random English words' },
    { value: 'repeat' as TextType, label: 'Repeat Text', description: 'Repeat custom text' },
    { value: 'sentences' as TextType, label: 'Sentences', description: 'Meaningful sentences' }
  ];

  const moreTextTypes = [
    { value: 'business' as TextType, label: 'Business Text', description: 'Corporate buzzwords' },
    { value: 'tech' as TextType, label: 'Tech Text', description: 'Development terms' },
    { value: 'pirate' as TextType, label: 'Pirate Text', description: 'Ahoy matey!' },
    { value: 'zombie' as TextType, label: 'Zombie Text', description: 'Apocalyptic themed' },
    { value: 'space' as TextType, label: 'Space Text', description: 'Cosmic sci-fi' },
    { value: 'medieval' as TextType, label: 'Medieval Text', description: 'Knights & castles' },
    { value: 'nonsense' as TextType, label: 'Nonsense Text', description: 'Silly made-up words' }
  ];

  const getApiUrl = (textParams: TextParams) => {
    if (!isClient) return '';
    
    const url = new URL('/api/text', window.location.origin);
    url.searchParams.set('type', textParams.type);
    url.searchParams.set('length', textParams.length.toString());
    if (textParams.text) {
      url.searchParams.set('text', textParams.text);
    }
    return url.toString();
  };

  const generateText = async (textParams: TextParams) => {
    if (!isClient) return;
    
    setLoading(true);
    try {
      const url = new URL('/api/text', window.location.origin);
      url.searchParams.set('type', textParams.type);
      url.searchParams.set('length', textParams.length.toString());
      if (textParams.text) {
        url.searchParams.set('text', textParams.text);
      }

      const response = await fetch(url.toString());
      const text = await response.text();
      setGeneratedText(text);
    } catch (error) {
      console.error('Error generating text:', error);
      setGeneratedText('Error generating text');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isClient) {
      generateText(params);
    }
  }, [params, isClient]);

  const copyText = async () => {
    try {
      await navigator.clipboard.writeText(generatedText);
      setTextCopied(true);
      setTimeout(() => setTextCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy text:', error);
    }
  };

  const downloadText = () => {
    const blob = new Blob([generatedText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${params.type}-text.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const copyApiUrl = async () => {
    if (!isClient) return;
    
    const url = getApiUrl(params);
    try {
      await navigator.clipboard.writeText(url);
      setUrlCopied(true);
      setTimeout(() => setUrlCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy URL:', error);
    }
  };

  const handleTypeChange = (type: TextType) => {
    setParams(prev => ({ ...prev, type }));
  };

  const handleLengthChange = (length: number) => {
    setParams(prev => ({ ...prev, length }));
  };

  const handleTextChange = (text: string) => {
    setParams(prev => ({ ...prev, text }));
  };

  // Don't render anything until we're on the client
  if (!isClient) {
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
              <h1 className="text-4xl font-bold mb-4">Text Generator</h1>
              <p className="text-muted text-lg">Generate placeholder text for your designs and mockups</p>
            </div>
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
            </div>
          </div>
        </main>
      </div>
    );
  }

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
            <h1 className="text-4xl font-bold mb-4">Text Generator</h1>
            <p className="text-muted text-lg">Generate placeholder text for your designs and mockups</p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Controls */}
            <div className="space-y-6">
              {/* API URL - Prominent at top */}
              <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
                <h3 className="font-medium mb-3 text-lg">API URL</h3>
                <div className="flex gap-2">
                  <code className="flex-1 px-4 py-3 bg-background border border-border rounded-lg text-sm font-[family-name:var(--font-jetbrains-mono)] break-all text-accent">
                    {getApiUrl(params)}
                  </code>
                  <button
                    onClick={copyApiUrl}
                    className="px-4 py-3 bg-accent hover:bg-accent-hover text-white rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap"
                  >
                    <ClipboardIcon className="w-4 h-4" />
                    {urlCopied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>

              {/* Text Type Selection */}
              <div className="space-y-3">
                <label className="block text-sm font-medium">Text Type</label>
                <div className="grid grid-cols-2 gap-3">
                  {textTypes.map((type) => (
                    <button
                      key={type.value}
                      onClick={() => handleTypeChange(type.value)}
                      className={`p-3 rounded-lg border text-left transition-all ${
                        params.type === type.value
                          ? 'border-accent bg-accent/10 text-accent'
                          : 'border-border hover:border-accent/50'
                      }`}
                    >
                      <div className="font-medium text-sm">{type.label}</div>
                      <div className="text-xs text-muted">{type.description}</div>
                    </button>
                  ))}
                </div>
                
                {/* More Examples Toggle */}
                <button
                  onClick={() => setShowMore(!showMore)}
                  className="flex items-center gap-2 text-sm text-accent hover:text-accent/80 transition-colors"
                >
                  {showMore ? 'Hide' : 'More'} Examples
                  {showMore ? (
                    <ChevronUpIcon className="w-4 h-4" />
                  ) : (
                    <ChevronDownIcon className="w-4 h-4" />
                  )}
                </button>
                
                {/* Additional Text Types */}
                {showMore && (
                  <div className="grid grid-cols-2 gap-3 pt-3 border-t border-border">
                    {moreTextTypes.map((type) => (
                      <button
                        key={type.value}
                        onClick={() => handleTypeChange(type.value)}
                        className={`p-3 rounded-lg border text-left transition-all ${
                          params.type === type.value
                            ? 'border-accent bg-accent/10 text-accent'
                            : 'border-border hover:border-accent/50'
                        }`}
                      >
                        <div className="font-medium text-sm">{type.label}</div>
                        <div className="text-xs text-muted">{type.description}</div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Parameters */}
              <div className="space-y-4">
                {/* Length */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Length ({params.type === 'repeat' ? 'times' : 'words'})
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10000"
                    value={params.length}
                    onChange={(e) => handleLengthChange(parseInt(e.target.value) || 1)}
                    className="w-full px-3 py-2 border border-border rounded-lg text-foreground focus:border-accent focus:outline-none"
                    placeholder="Enter any number (1-10,000)"
                  />
                </div>

                {/* Custom Text for Repeat */}
                {params.type === 'repeat' && (
                  <div>
                    <label className="block text-sm font-medium mb-2">Custom Text</label>
                    <input
                      type="text"
                      value={params.text || ''}
                      onChange={(e) => handleTextChange(e.target.value)}
                      placeholder="Enter text to repeat"
                      className="w-full px-3 py-2 border border-border rounded-lg text-foreground focus:border-accent focus:outline-none"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Generated Text */}
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-4">Generated Text:</h3>
                <div className="border border-border rounded-lg relative">
                  {loading && (
                    <div className="absolute inset-0 bg-background/80 flex items-center justify-center rounded-lg">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
                    </div>
                  )}
                  <div className="p-4 text-sm leading-relaxed max-h-96 overflow-y-auto">
                    {generatedText || "Loading..."}
                  </div>
                </div>
              </div>

              {generatedText && (
                <div className="space-y-3">
                  <button
                    onClick={copyText}
                    className="w-full bg-accent hover:bg-accent-hover text-white font-medium px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <ClipboardIcon className="w-5 h-5" />
                    {textCopied ? 'Copied!' : 'Copy Text'}
                  </button>
                  <button
                    onClick={downloadText}
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