"use client";

import { useState, useEffect } from "react";
import { PhotoIcon, ClipboardDocumentIcon, ArrowDownTrayIcon, ArrowTopRightOnSquareIcon, ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import GeneratorLayout from '../../components/GeneratorLayout';
import ControlPanel from '../../components/ControlPanel';
import PreviewPanel from '../../components/PreviewPanel';
import ApiDocumentation from '../../components/ApiDocumentation';
import { Button, ButtonGroup, Select, Input, FormField, ApiUrlDisplay } from '../../components/FormField';

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
  const [copiedStates, setCopiedStates] = useState<{[key: string]: boolean}>({});

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

  const copyApiUrl = () => {
    const url = generateImageUrl();
    const fullUrl = `${window.location.origin}${url}`;
    copyToClipboard(fullUrl, 'api');
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
    <GeneratorLayout
      title="Image Generator"
      description="Generate custom placeholder images with any dimensions, colors, and text. Perfect for mockups, prototypes, and development."
      icon={<PhotoIcon className="w-6 h-6 text-accent" />}
    >
      <div className="space-y-8">
        {/* API URL Display - At the top for quick access */}
        <ApiUrlDisplay
          url={apiUrl}
          onCopy={copyApiUrl}
          copied={copiedStates.api}
        />

        {/* Controls */}
        <ControlPanel title="Image Options">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Basic Settings */}
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Width"
                  type="number"
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                  min="1"
                  max="2000"
                  placeholder="1600"
                />
                <Input
                  label="Height"
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  min="1"
                  max="2000"
                  placeholder="400"
                />
              </div>

              <Input
                label="Text"
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter your text"
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField label="Background Color">
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={bgColor ? `#${bgColor}` : "#E2E8F0"}
                      onChange={(e) => setBgColor(e.target.value.slice(1))}
                      className="w-12 h-12 border-2 border-border/50 rounded-xl"
                    />
                    <Input
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value.replace("#", ""))}
                      placeholder="E2E8F0"
                      className="flex-1"
                    />
                  </div>
                </FormField>
                <FormField label="Text Color">
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={textColor ? `#${textColor}` : "#4A5568"}
                      onChange={(e) => setTextColor(e.target.value.slice(1))}
                      className="w-12 h-12 border-2 border-border/50 rounded-xl"
                    />
                    <Input
                      value={textColor}
                      onChange={(e) => setTextColor(e.target.value.replace("#", ""))}
                      placeholder="4A5568"
                      className="flex-1"
                    />
                  </div>
                </FormField>
              </div>

              <Select
                label="Format"
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                options={[
                  { value: "png", label: "PNG" },
                  { value: "jpg", label: "JPG" },
                  { value: "webp", label: "WebP" },
                  { value: "gif", label: "GIF" },
                  { value: "avif", label: "AVIF" }
                ]}
              />

              {/* Advanced Settings */}
              <div className="border border-border/50 rounded-xl">
                <button
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/10 transition-colors rounded-xl"
                >
                  <span className="font-medium">Advanced Settings</span>
                  {showAdvanced ? (
                    <ChevronUpIcon className="w-5 h-5 text-muted" />
                  ) : (
                    <ChevronDownIcon className="w-5 h-5 text-muted" />
                  )}
                </button>
                
                {showAdvanced && (
                  <div className="border-t border-border/50 p-4 space-y-4">
                    <Select
                      label="Font"
                      value={font}
                      onChange={(e) => setFont(e.target.value)}
                      options={FONTS}
                    />
                    
                    <Select
                      label="Quality"
                      value={retina}
                      onChange={(e) => setRetina(e.target.value)}
                      options={[
                        { value: "", label: "Standard" },
                        { value: "2x", label: "Retina 2x" },
                        { value: "3x", label: "Retina 3x" }
                      ]}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Preview */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Preview</h3>
                <div className="border border-border/50 rounded-xl p-4 bg-muted/10">
                  <img
                    src={generateImageUrl()}
                    alt="Generated placeholder"
                    className="max-w-full h-auto rounded-lg"
                    style={{ maxHeight: "400px" }}
                  />
                </div>
              </div>

              <ButtonGroup>
                <Button
                  onClick={openFullSize}
                  className="flex-1"
                >
                  <ArrowTopRightOnSquareIcon className="w-5 h-5" />
                  Open Full Size
                </Button>
                <Button
                  onClick={downloadImage}
                  variant="outline"
                  className="flex-1"
                >
                  <ArrowDownTrayIcon className="w-5 h-5" />
                  Download
                </Button>
              </ButtonGroup>
            </div>
          </div>
        </ControlPanel>

        {/* API Documentation */}
        <ApiDocumentation
          endpoint="/api/image"
          parameters={[
            {
              name: 'width',
              description: 'image width in pixels (1-2000)',
              type: 'number'
            },
            {
              name: 'height',
              description: 'image height in pixels (1-2000)',
              type: 'number'
            },
            {
              name: 'text',
              description: 'text to display on image',
              type: 'string'
            },
            {
              name: 'backgroundcolor',
              description: 'background color (hex without #)',
              type: 'string'
            },
            {
              name: 'frontcolor',
              description: 'text color (hex without #)',
              type: 'string'
            },
            {
              name: 'format',
              description: 'png | jpg | webp | gif | avif',
              type: 'string'
            },
            {
              name: 'font',
              description: 'font family name',
              type: 'string'
            },
            {
              name: 'retina',
              description: '2x | 3x for high DPI displays',
              type: 'string'
            }
          ]}
          examples={[
            {
              url: '/api/image?width=800&height=600&text=Hello%20World',
              description: 'Basic 800x600 image with text'
            },
            {
              url: '/api/image?width=1200&height=630&backgroundcolor=3B82F6&frontcolor=FFFFFF&text=Social%20Media',
              description: 'Social media image with custom colors'
            },
            {
              url: '/api/image?width=400&height=400&format=webp&retina=2x',
              description: 'Square WebP image at 2x resolution'
            }
          ]}
        />
      </div>
    </GeneratorLayout>
  );
} 