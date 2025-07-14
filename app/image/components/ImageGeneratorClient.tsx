"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { PhotoIcon, ArrowLeftIcon, ClipboardDocumentIcon, ArrowDownTrayIcon, ArrowTopRightOnSquareIcon, XMarkIcon, ChevronDownIcon, ChevronUpIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";

const FONTS = [
  { value: 'lato', label: 'Lato (Default)' },
  { value: 'lora', label: 'Lora' },
  { value: 'montserrat', label: 'Montserrat' },
  { value: 'noto-sans', label: 'Noto Sans' },
  { value: 'open-sans', label: 'Open Sans' },
  { value: 'oswald', label: 'Oswald' },
  { value: 'playfair-display', label: 'Playfair Display' },
  { value: 'poppins', label: 'Poppins' },
  { value: 'pt-sans', label: 'PT Sans' },
  { value: 'raleway', label: 'Raleway' },
  { value: 'roboto', label: 'Roboto' },
  { value: 'source-sans-pro', label: 'Source Sans Pro' }
];

export default function ImageGeneratorClient() {
  const [width, setWidth] = useState("1600");
  const [height, setHeight] = useState("400");
  const [bgColor, setBgColor] = useState("E2E8F0");
  const [textColor, setTextColor] = useState("4A5568");
  const [text, setText] = useState("Hello World");
  const [format, setFormat] = useState("png");
  const [font, setFont] = useState("lato");
  const [retina, setRetina] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [origin, setOrigin] = useState("");
  const [copiedStates, setCopiedStates] = useState<{[key: string]: boolean}>({});

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setOrigin(window.location.origin);
    }
  }, []);

  const generateImageUrl = () => {
    const params = new URLSearchParams();
    
    if (width && width.trim()) params.set('width', width);
    if (height && height.trim()) params.set('height', height);
    if (bgColor && bgColor.trim()) params.set('backgroundcolor', bgColor.replace("#", ""));
    if (textColor && textColor.trim()) params.set('frontcolor', textColor.replace("#", ""));
    if (text && text.trim()) params.set('text', text);
    if (format && format.trim()) params.set('format', format);
    if (font && font !== 'lato') params.set('font', font);
    if (retina && retina.trim()) params.set('retina', retina);
    
    const queryString = params.toString();
    return `/api/image${queryString ? '?' + queryString : ''}`;
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

  const openFullSize = () => {
    if (typeof window !== 'undefined') {
      window.open(generateImageUrl(), "_blank");
    }
  };

  const downloadImage = () => {
    if (typeof document !== 'undefined') {
      const link = document.createElement("a");
      link.href = generateImageUrl();
      link.download = `placeholder-${width || 'default'}x${height || 'default'}.${format}`;
      link.click();
    }
  };

  const apiUrl = generateImageUrl();

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
            <h1 className="text-4xl font-bold mb-4">Image Generator</h1>
            <p className="text-muted text-lg">Generate placeholder images with custom dimensions and colors</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Controls */}
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Width</label>
                  <input
                    type="number"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:border-accent focus:outline-none"
                    min="1"
                    max="2000"
                    placeholder="1600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Height</label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:border-accent focus:outline-none"
                    min="1"
                    max="2000"
                    placeholder="400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Text</label>
                <input
                  type="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:border-accent focus:outline-none"
                  placeholder="Enter your text"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Background</label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={bgColor ? `#${bgColor}` : "#E2E8F0"}
                      onChange={(e) => setBgColor(e.target.value.slice(1))}
                      className="w-12 h-10 border border-border rounded"
                    />
                    <input
                      type="text"
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value.replace("#", ""))}
                      className="flex-1 px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:border-accent focus:outline-none"
                      placeholder="E2E8F0"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Text Color</label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={textColor ? `#${textColor}` : "#4A5568"}
                      onChange={(e) => setTextColor(e.target.value.slice(1))}
                      className="w-12 h-10 border border-border rounded"
                    />
                    <input
                      type="text"
                      value={textColor}
                      onChange={(e) => setTextColor(e.target.value.replace("#", ""))}
                      className="flex-1 px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:border-accent focus:outline-none"
                      placeholder="4A5568"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Format</label>
                <select
                  value={format}
                  onChange={(e) => setFormat(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:border-accent focus:outline-none"
                >
                  <option value="png">PNG</option>
                  <option value="jpg">JPG</option>
                  <option value="webp">WebP</option>
                  <option value="gif">GIF</option>
                  <option value="avif">AVIF</option>
                </select>
              </div>

              {/* Advanced Settings */}
              <div className="border border-border rounded-lg">
                <button
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/10 transition-colors"
                >
                  <span className="font-medium">Advanced</span>
                  {showAdvanced ? (
                    <ChevronUpIcon className="w-5 h-5 text-muted" />
                  ) : (
                    <ChevronDownIcon className="w-5 h-5 text-muted" />
                  )}
                </button>
                
                {showAdvanced && (
                  <div className="border-t border-border p-4 space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Font</label>
                      <select
                        value={font}
                        onChange={(e) => setFont(e.target.value)}
                        className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:border-accent focus:outline-none"
                      >
                        {FONTS.map((fontOption) => (
                          <option key={fontOption.value} value={fontOption.value}>
                            {fontOption.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Quality</label>
                      <select
                        value={retina}
                        onChange={(e) => setRetina(e.target.value)}
                        className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:border-accent focus:outline-none"
                      >
                        <option value="">Standard</option>
                        <option value="2x">Retina 2x</option>
                        <option value="3x">Retina 3x</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>

              {/* API URL */}
              <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
                <h3 className="font-medium mb-2">API URL:</h3>
                <code className="text-sm break-all text-accent font-[family-name:var(--font-jetbrains-mono)] block mb-2">
                  {origin}{apiUrl}
                </code>
                <button
                  onClick={() => copyToClipboard(origin + apiUrl, 'api')}
                  className="flex items-center gap-1 text-sm text-accent hover:text-accent-hover transition-colors"
                >
                  <ClipboardDocumentIcon className="w-4 h-4" />
                  {copiedStates.api ? 'Copied!' : 'Copy URL'}
                </button>
              </div>
            </div>

            {/* Preview */}
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-4">Preview:</h3>
                <div className="border border-border rounded-lg p-4 bg-muted/20">
                  <img
                    src={generateImageUrl()}
                    alt="Generated placeholder"
                    className="max-w-full h-auto rounded"
                    style={{ maxHeight: "400px" }}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={openFullSize}
                  className="w-full bg-accent hover:bg-accent-hover text-white font-medium px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <ArrowTopRightOnSquareIcon className="w-5 h-5" />
                  Open Full Size
                </button>
                <button
                  onClick={downloadImage}
                  className="w-full border border-accent text-accent hover:bg-accent hover:text-white font-medium px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <ArrowDownTrayIcon className="w-5 h-5" />
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 