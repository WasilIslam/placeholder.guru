'use client';

import { useState, useRef } from 'react';
import { SpeakerWaveIcon, MusicalNoteIcon, PlayIcon, PauseIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import GeneratorLayout from '../../components/GeneratorLayout';
import ControlPanel from '../../components/ControlPanel';
import PreviewPanel from '../../components/PreviewPanel';
import ApiDocumentation from '../../components/ApiDocumentation';
import { Button, ButtonGroup, Select, FormField, ApiUrlDisplay } from '../../components/FormField';

export default function AudioGeneratorClient() {
  const [audioType, setAudioType] = useState<'speech' | 'tune'>('speech');
  const [selectedFile, setSelectedFile] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');
  const [copiedUrl, setCopiedUrl] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const availableFiles = {
    speech: ['Comparison Of Vernacular And Refined Speech.mp3'],
    tune: ['212.mp3', '42.mp3', '52.mp3', '53.mp3']
  };

  const generateAudioUrl = () => {
    const params = new URLSearchParams();
    params.set('type', audioType);
    if (selectedFile) {
      params.set('file', selectedFile);
    }
    return `/api/audio?${params.toString()}`;
  };

  const handleGenerate = () => {
    const url = generateAudioUrl();
    setCurrentUrl(url);
    if (audioRef.current) {
      audioRef.current.load();
    }
  };

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
  };

  const copyApiUrl = () => {
    const url = generateAudioUrl();
    const fullUrl = `${window.location.origin}${url}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  const copyGeneratedUrl = () => {
    const fullUrl = `${window.location.origin}${currentUrl}`;
    navigator.clipboard.writeText(fullUrl);
  };

  return (
    <GeneratorLayout
      title="Audio Generator"
      description="Generate placeholder audio files instantly. Access speech samples and tune files for prototyping audio features and testing media functionality."
      icon={<SpeakerWaveIcon className="w-6 h-6 text-accent" />}
    >
      <div className="space-y-8">
        {/* API URL Display - At the top for quick access */}
        <ApiUrlDisplay
          url={generateAudioUrl()}
          onCopy={copyApiUrl}
          copied={copiedUrl}
        />

        {/* Controls */}
        <ControlPanel title="Audio Options">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Audio Type Selection */}
            <FormField label="Audio Type">
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => {
                    setAudioType('speech');
                    setSelectedFile('');
                  }}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 flex items-center gap-3 ${
                    audioType === 'speech'
                      ? 'border-accent bg-accent/10 text-accent shadow-lg'
                      : 'border-border/50 hover:border-accent/50 hover:bg-accent/5'
                  }`}
                >
                  <SpeakerWaveIcon className="w-5 h-5" />
                  <span className="font-medium">Speech</span>
                </button>
                <button
                  onClick={() => {
                    setAudioType('tune');
                    setSelectedFile('');
                  }}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 flex items-center gap-3 ${
                    audioType === 'tune'
                      ? 'border-accent bg-accent/10 text-accent shadow-lg'
                      : 'border-border/50 hover:border-accent/50 hover:bg-accent/5'
                  }`}
                >
                  <MusicalNoteIcon className="w-5 h-5" />
                  <span className="font-medium">Tune</span>
                </button>
              </div>
            </FormField>

            {/* File Selection */}
            <Select
              label="Specific File"
              description="optional - random if not selected"
              value={selectedFile}
              onChange={(e) => setSelectedFile(e.target.value)}
              options={[
                { value: '', label: `Random ${audioType} file` },
                ...availableFiles[audioType].map(file => ({
                  value: file,
                  label: file.replace('.mp3', '')
                }))
              ]}
            />
          </div>

          {/* Generate Button */}
          <div className="mt-8">
            <Button onClick={handleGenerate} className="w-full" size="lg">
              <ArrowPathIcon className="w-5 h-5" />
              Generate Audio
            </Button>
          </div>
        </ControlPanel>

        {/* Preview */}
        <PreviewPanel title="Audio Preview" isVisible={!!currentUrl}>
          <div className="space-y-6">
            {/* Audio Player */}
            <div className="flex items-center gap-6 p-6 bg-accent/10 rounded-xl border border-accent/30">
              <button
                onClick={handlePlayPause}
                className="bg-gradient-to-r from-accent to-accent-hover hover:from-accent-hover hover:to-accent text-white p-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                {isPlaying ? (
                  <PauseIcon className="w-6 h-6" />
                ) : (
                  <PlayIcon className="w-6 h-6 ml-0.5" />
                )}
              </button>
              
              <div className="flex-1">
                <audio
                  ref={audioRef}
                  src={currentUrl}
                  onEnded={handleAudioEnded}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  controls
                  className="w-full"
                />
              </div>
            </div>

            {/* Generated URL Display */}
            <ApiUrlDisplay
              url={currentUrl}
              onCopy={copyGeneratedUrl}
            />
          </div>
        </PreviewPanel>

        {/* API Documentation */}
        <ApiDocumentation
          endpoint="/api/audio"
          parameters={[
            {
              name: 'type',
              description: 'speech | tune (default: speech)',
              type: 'string'
            },
            {
              name: 'file',
              description: 'specific filename (optional, random if not provided)',
              type: 'string'
            }
          ]}
          examples={[
            {
              url: '/api/audio?type=speech',
              description: 'Get a random speech sample'
            },
            {
              url: '/api/audio?type=tune&file=212.mp3',
              description: 'Get a specific tune file'
            }
          ]}
        />
      </div>
    </GeneratorLayout>
  );
} 