import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  
  const width = searchParams.get('width') || '400';
  const height = searchParams.get('height') || '300';
  const backgroundcolor = searchParams.get('backgroundcolor') || 'E2E8F0';
  const frontcolor = searchParams.get('frontcolor') || '4A5568';
  const text = searchParams.get('text') || 'Placeholder';
  const format = searchParams.get('format') || 'png';
  const font = searchParams.get('font') || 'lato';
  const retina = searchParams.get('retina') || '';

  // Clean the colors (remove # if present)
  const cleanBg = backgroundcolor.replace('#', '');
  const cleanFront = frontcolor.replace('#', '');
  
  // Encode the text for URL
  const encodedText = encodeURIComponent(text);
  
  // Build the size with retina if specified
  let size = `${width}x${height}`;
  if (retina && ['2x', '3x'].includes(retina)) {
    size += `@${retina}`;
  }
  
  // Build the placehold.co URL with all parameters
  let placeholdUrl = `https://placehold.co/${size}/${cleanBg}/${cleanFront}.${format}`;
  
  const params = new URLSearchParams();
  if (text) params.set('text', text);
  if (font && font !== 'lato') params.set('font', font);
  
  if (params.toString()) {
    placeholdUrl += `?${params.toString()}`;
  }
  
  try {
    // Fetch the image from placehold.co
    const response = await fetch(placeholdUrl);
    
    if (!response.ok) {
      return new Response('Failed to generate image', { status: 500 });
    }
    
    // Get the image data
    const imageBuffer = await response.arrayBuffer();
    
    // Determine content type based on format
    const contentType = format === 'jpg' ? 'image/jpeg' : 
                       format === 'png' ? 'image/png' :
                       format === 'webp' ? 'image/webp' :
                       format === 'gif' ? 'image/gif' :
                       format === 'avif' ? 'image/avif' :
                       'image/png';
    
    // Return the image with proper headers
    return new Response(imageBuffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000', // Cache for 1 year
        'Content-Length': imageBuffer.byteLength.toString(),
      },
    });
    
  } catch (error) {
    console.error('Error fetching image:', error);
    return new Response('Error generating image', { status: 500 });
  }
} 