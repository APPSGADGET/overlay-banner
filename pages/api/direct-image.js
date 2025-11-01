import sharp from 'sharp';
import { fetchImageWithBuiltins } from '../../lib/fetchUtils.js';

export default async function handler(req, res) {
  const { image, title = "", website = "", format = "jpeg", w = "1080", h = "1350" } = req.query;

  // Validate required parameters
  if (!image) {
    res.status(400).json({ 
      error: "Missing required parameter 'image'",
      usage: "?image=IMAGE_URL&title=TITLE&website=WEBSITE&format=jpeg|png&w=WIDTH&h=HEIGHT",
      example: "/api/direct-image?image=https://picsum.photos/800/600&title=Your%20Title&website=YourSite.com"
    });
    return;
  }

  try {
    console.log('Direct image request for:', image);
    
    // Fetch the base image
    const imageResponse = await fetchImageWithBuiltins(image);
    
    if (!imageResponse || !imageResponse.ok) {
      console.error('Failed to fetch image response for:', image);
      res.status(404).json({ error: "Failed to fetch image from URL" });
      return;
    }

    // Extract buffer from response
    const arrayBuffer = await imageResponse.arrayBuffer();
    const imageBuffer = Buffer.from(arrayBuffer);

    if (!imageBuffer || imageBuffer.length === 0) {
      console.error('Empty image buffer for:', image);
      res.status(404).json({ error: "Received empty image data" });
      return;
    }

    console.log('Image buffer size:', imageBuffer.length, 'bytes');

    // Parse dimensions
    const width = parseInt(w) || 1080;
    const height = parseInt(h) || 1350;
    
    console.log('Target dimensions:', width, 'x', height);
    
    // Process image with sharp - resize and crop to fit aspect ratio
    let processedImage = sharp(imageBuffer)
      .resize(width, height, { 
        fit: 'cover',
        position: 'center' 
      });

    // Add text overlay if title is provided
    if (title && title.trim()) {
      try {
        const decodedTitle = decodeURIComponent(title);
        const decodedWebsite = website ? decodeURIComponent(website) : '';
        
        // Create a gradient overlay using Sharp - make it taller to cover title
        const gradientHeight = Math.floor(height * 0.5); // Increased from 0.4 to 0.5 (50% of image)
        
        // Function to wrap text into multiple lines with better width calculation
        const wrapText = (text, maxWidth, fontSize) => {
          const words = text.split(' ');
          const lines = [];
          let currentLine = '';
          
          // Approximate character width (more accurate)
          const charWidth = fontSize * 0.6;
          const maxChars = Math.floor(maxWidth / charWidth);
          
          for (const word of words) {
            const testLine = currentLine ? `${currentLine} ${word}` : word;
            if (testLine.length <= maxChars) {
              currentLine = testLine;
            } else {
              if (currentLine) {
                lines.push(currentLine);
                currentLine = word;
              } else {
                // Word is too long, break it
                lines.push(word.substring(0, maxChars - 3) + '...');
                currentLine = '';
              }
            }
          }
          if (currentLine) {
            lines.push(currentLine);
          }
          return lines.slice(0, 2); // Max 2 lines for better readability
        };
        
        // Calculate font size and text area with proper padding
        const fontSize = Math.min(width * 0.045, 44); // Slightly smaller
        const textPadding = width * 0.08; // 8% padding on each side
        const maxTextWidth = width - (textPadding * 2);
        const titleLines = wrapText(decodedTitle.toUpperCase(), maxTextWidth, fontSize);
        const lineHeight = fontSize * 1.15;
        const totalTextHeight = titleLines.length * lineHeight;
        
        // Add spacing between title and website (increase from 100 to 140)
        const titleWebsiteGap = decodedWebsite ? 60 : 20; // Extra gap if website exists
        const startY = height - 140 - (totalTextHeight / 2) - titleWebsiteGap;
        
        // Create SVG with gradient and wrapped text
        const svgOverlay = `
          <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style="stop-color:rgb(0,0,0);stop-opacity:0"/>
                <stop offset="30%" style="stop-color:rgb(0,0,0);stop-opacity:0.2"/>
                <stop offset="60%" style="stop-color:rgb(0,0,0);stop-opacity:0.6"/>
                <stop offset="100%" style="stop-color:rgb(0,0,0);stop-opacity:0.95"/>
              </linearGradient>
            </defs>
            <rect x="0" y="${height - gradientHeight}" width="${width}" height="${gradientHeight}" fill="url(#gradient)"/>
            ${titleLines.map((line, index) => `
              <text x="${width/2}" y="${startY + (index * lineHeight) + fontSize}" 
                    text-anchor="middle" 
                    dominant-baseline="middle"
                    font-family="Arial, sans-serif" 
                    font-weight="900" 
                    font-size="${fontSize}" 
                    fill="white" 
                    stroke="rgba(0,0,0,0.9)" 
                    stroke-width="1.5"
                    paint-order="stroke fill">
                ${line}
              </text>
            `).join('')}
            ${decodedWebsite ? `
              <text x="${width/2}" y="${startY + totalTextHeight + titleWebsiteGap + 20}" 
                    text-anchor="middle" 
                    dominant-baseline="middle"
                    font-family="Arial, sans-serif" 
                    font-weight="700" 
                    font-size="${Math.min(width * 0.02, 22)}" 
                    fill="#FFD700" 
                    stroke="rgba(0,0,0,0.7)" 
                    stroke-width="0.8"
                    paint-order="stroke fill"
                    style="letter-spacing: 1.5px;">
                ${decodedWebsite.toUpperCase()}
              </text>
            ` : ''}
          </svg>
        `;

        console.log('Adding text overlay with title:', decodedTitle.substring(0, 20) + '...');
        console.log('Text wrapped into', titleLines.length, 'lines:', titleLines);
        
        // Composite the SVG overlay
        processedImage = processedImage.composite([{
          input: Buffer.from(svgOverlay),
          blend: 'over'
        }]);
        
      } catch (overlayError) {
        console.error('Error creating text overlay:', overlayError.message);
        // Continue without overlay if there's an error
      }
    } else {
      console.log('Processing image without overlay - no title provided');
    }

    // Convert to final format
    let outputBuffer;
    const outputFormat = format.toLowerCase() === 'png' ? 'png' : 'jpeg';
    
    console.log('Converting to format:', outputFormat);
    
    if (outputFormat === 'png') {
      outputBuffer = await processedImage.png({ 
        compressionLevel: 6,
        quality: 90 
      }).toBuffer();
    } else {
      outputBuffer = await processedImage.jpeg({ 
        quality: 90,
        progressive: true
      }).toBuffer();
    }

    console.log('Output buffer size:', outputBuffer.length, 'bytes');

    // Set appropriate headers
    res.setHeader('Content-Type', `image/${outputFormat}`);
    res.setHeader('Content-Length', outputBuffer.length);
    res.setHeader('Cache-Control', 'public, max-age=3600'); // Cache for 1 hour
    res.setHeader('Access-Control-Allow-Origin', '*'); // Allow cross-origin requests
    
    // Send the image directly
    res.send(outputBuffer);

  } catch (error) {
    console.error('Error generating direct image:', error);
    res.status(500).json({ 
      error: "Failed to generate image",
      details: error.message 
    });
  }
}