import { NextRequest } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  
  const type = searchParams.get('type') || 'speech'; // 'speech' or 'tune'
  const file = searchParams.get('file') || '';
  
  // Validate type
  if (!['speech', 'tune'].includes(type)) {
    return new Response('Invalid type. Use "speech" or "tune"', { status: 400 });
  }
  
  // Define available files
  const availableFiles = {
    speech: ['Comparison Of Vernacular And Refined Speech.mp3'],
    tune: ['212.mp3', '42.mp3', '52.mp3', '53.mp3']
  };
  
  let fileName = file;
  
  // If no file specified, return a random one from the type
  if (!fileName) {
    const typeFiles = availableFiles[type as keyof typeof availableFiles];
    fileName = typeFiles[Math.floor(Math.random() * typeFiles.length)];
  }
  
  // Validate file exists in the type
  const typeFiles = availableFiles[type as keyof typeof availableFiles];
  if (!typeFiles.includes(fileName)) {
    return new Response(`File not found. Available ${type} files: ${typeFiles.join(', ')}`, { status: 404 });
  }
  
  try {
    // Read the audio file
    const filePath = join(process.cwd(), 'app', 'api', 'assets', 'audio', type, fileName);
    const audioBuffer = await readFile(filePath);
    
    // Return the audio with appropriate headers
    return new Response(audioBuffer, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Disposition': `inline; filename="${fileName}"`,
        'Cache-Control': 'public, max-age=31536000',
      },
    });
  } catch (error) {
    console.error('Error serving audio file:', error);
    return new Response('Audio file not found', { status: 404 });
  }
} 