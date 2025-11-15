import sharp from 'sharp';
import https from 'https';
import http from 'http';

// Force Node.js runtime
export const runtime = 'nodejs';

/**
 * Fetch Reddit post JSON data
 */
async function fetchRedditPost(postUrl) {
  return new Promise((resolve, reject) => {
    // Ensure the URL ends with .json
    let jsonUrl = postUrl.trim();
    
    // Handle trailing slash properly
    if (jsonUrl.endsWith('/')) {
      jsonUrl = jsonUrl.slice(0, -1) + '.json';
    } else if (!jsonUrl.endsWith('.json')) {
      jsonUrl = jsonUrl + '.json';
    }

    console.log('📥 Fetching Reddit JSON:', jsonUrl);

    const protocol = jsonUrl.startsWith('https') ? https : http;
    
    const options = {
      headers: {
        'User-Agent': 'reddit-image-fetcher/1.0',
        'Accept': 'application/json'
      }
    };

    protocol.get(jsonUrl, options, (response) => {
      // Handle redirects
      if (response.statusCode === 302 || response.statusCode === 301) {
        console.log(`↪️ Redirecting to: ${response.headers.location}`);
        return fetchRedditPost(response.headers.location).then(resolve).catch(reject);
      }
      
      if (response.statusCode !== 200) {
        reject(new Error(`HTTP ${response.statusCode}: ${response.statusMessage}`));
        return;
      }
      
      const chunks = [];
      response.on('data', chunk => chunks.push(chunk));
      response.on('end', () => {
        try {
          const data = JSON.parse(Buffer.concat(chunks).toString());
          resolve(data);
        } catch (parseError) {
          reject(new Error(`Failed to parse JSON: ${parseError.message}`));
        }
      });
      response.on('error', reject);
    }).on('error', reject);
  });
}

/**
 * Fetch image from URL and return buffer
 */
function fetchImageBuffer(imageUrl) {
  return new Promise((resolve, reject) => {
    const protocol = imageUrl.startsWith('https') ? https : http;
    
    protocol.get(imageUrl, (response) => {
      if (response.statusCode === 302 || response.statusCode === 301) {
        console.log(`🔀 Image redirect to: ${response.headers.location}`);
        return fetchImageBuffer(response.headers.location).then(resolve).catch(reject);
      }
      
      if (response.statusCode !== 200) {
        reject(new Error(`HTTP ${response.statusCode}`));
        return;
      }
      
      const chunks = [];
      response.on('data', chunk => chunks.push(chunk));
      response.on('end', () => resolve(Buffer.concat(chunks)));
      response.on('error', reject);
    }).on('error', reject);
  });
}

/**
 * Unescape HTML entities in URL
 */
function unescapeHtml(text) {
  if (!text) return text;
  
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'");
}

/**
 * Extract image URLs from Reddit post JSON with priority order
 */
function extractImageUrls(redditData) {
  const images = [];
  
  try {
    // Navigate to post data
    const post = redditData[0]?.data?.children?.[0]?.data;
    
    if (!post) {
      console.log('❌ No post data found');
      return images;
    }

    console.log('📊 Post data:', {
      title: post.title,
      url: post.url,
      hasMediaMetadata: !!post.media_metadata,
      hasPreview: !!post.preview,
      urlOverridden: post.url_overridden_by_dest
    });

    // Priority 1: media_metadata (gallery support)
    if (post.media_metadata) {
      console.log('🖼️ Found media_metadata (gallery)');
      const metadata = post.media_metadata;
      
      for (const key in metadata) {
        const item = metadata[key];
        if (item.s?.u) {
          const imageUrl = unescapeHtml(item.s.u);
          images.push(imageUrl);
          console.log(`  ✅ Gallery image: ${imageUrl}`);
        }
      }
      
      if (images.length > 0) {
        return images;
      }
    }

    // Priority 2: preview.images[0].source.url (single image)
    if (post.preview?.images?.[0]?.source?.url) {
      const imageUrl = unescapeHtml(post.preview.images[0].source.url);
      console.log('🖼️ Found preview image:', imageUrl);
      images.push(imageUrl);
      return images;
    }

    // Priority 3: url_overridden_by_dest (external image links)
    if (post.url_overridden_by_dest) {
      const imageUrl = unescapeHtml(post.url_overridden_by_dest);
      
      // Check if it's actually an image URL
      if (/\.(jpg|jpeg|png|gif|webp)$/i.test(imageUrl)) {
        console.log('🖼️ Found url_overridden_by_dest:', imageUrl);
        images.push(imageUrl);
        return images;
      }
    }

    // Fallback: check post.url as last resort
    if (post.url && /\.(jpg|jpeg|png|gif|webp)$/i.test(post.url)) {
      const imageUrl = unescapeHtml(post.url);
      console.log('🖼️ Found image in post.url:', imageUrl);
      images.push(imageUrl);
    }

  } catch (error) {
    console.error('❌ Error extracting images:', error.message);
  }

  return images;
}

export default async function handler(req, res) {
  console.log('\n🎨 === REDDIT IMAGE FETCHER ===');
  console.log('Method:', req.method);
  console.log('Query:', req.query);

  // Validate required parameter
  const { url, title, website, w, h, design } = req.query;

  if (!url) {
    return res.status(400).json({
      success: false,
      error: "Missing required parameter 'url'",
      usage: "GET /api/reddit-image?url=<reddit_post_url>",
      example: "/api/reddit-image?url=https://www.reddit.com/r/pics/comments/xyz/post_title/",
      optionalParams: {
        title: "Text overlay for banner",
        website: "Brand/website name",
        w: "Width in pixels (default: 1080)",
        h: "Height in pixels (default: 1350)",
        design: "Design variant: default, design1-12, blank"
      }
    });
  }

  try {
    // Step 1: Fetch Reddit post JSON
    console.log('📡 Fetching Reddit post...');
    const redditData = await fetchRedditPost(url);
    
    // Step 2: Extract image URLs
    console.log('🔍 Extracting image URLs...');
    const imageUrls = extractImageUrls(redditData);

    if (imageUrls.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No images found in this Reddit post"
      });
    }

    console.log(`✅ Found ${imageUrls.length} image(s)`);

    // Step 3: If no overlay parameters, return JSON with image URLs
    if (!title && !website && !design) {
      return res.json({
        success: true,
        count: imageUrls.length,
        images: imageUrls,
        post_url: url
      });
    }

    // Step 4: If overlay parameters provided, fetch and process the first image
    console.log('🎨 Processing image with overlay...');
    
    const targetWidth = parseInt(w) || 1080;
    const targetHeight = parseInt(h) || 1350;
    const selectedDesign = design || 'default';
    const imageUrl = imageUrls[0]; // Use first image for overlay

    // Fetch the image
    console.log('📥 Fetching image from:', imageUrl);
    const imageBuffer = await fetchImageBuffer(imageUrl);
    console.log('✅ Image fetched:', imageBuffer.length, 'bytes');

    // Process with Sharp (similar to bundled-font-overlay)
    const processedImage = sharp(imageBuffer)
      .resize(targetWidth, targetHeight, {
        fit: 'cover',
        position: 'center'
      });

    // Handle blank design - return image without overlay
    if (selectedDesign === 'blank') {
      console.log('🔲 Blank design - returning raw image');
      
      const finalImage = await processedImage
        .jpeg({ quality: 90 })
        .toBuffer();

      res.setHeader('Content-Type', 'image/jpeg');
      res.setHeader('Content-Disposition', 'inline; filename="reddit-image.jpg"');
      res.setHeader('Content-Length', String(finalImage.length));
      res.setHeader('Cache-Control', 'public, max-age=300');
      res.setHeader('X-Design', 'blank');
      res.setHeader('X-Reddit-Source', url);
      
      return res.send(finalImage);
    }

    // Generate overlay if title/website provided
    if (title || website) {
      const titleText = title ? decodeURIComponent(title).toUpperCase() : '';
      const websiteText = website ? decodeURIComponent(website).toUpperCase() : '';

      // Create simple SVG overlay
      const svgHeight = 200;
      const svg = `<?xml version="1.0" encoding="UTF-8"?>
        <svg width="${targetWidth}" height="${svgHeight}" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="blackGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style="stop-color:rgb(0,0,0);stop-opacity:0.2"/>
              <stop offset="30%" style="stop-color:rgb(0,0,0);stop-opacity:0.6"/>
              <stop offset="60%" style="stop-color:rgb(0,0,0);stop-opacity:0.85"/>
              <stop offset="100%" style="stop-color:rgb(0,0,0);stop-opacity:0.95"/>
            </linearGradient>
          </defs>
          
          <rect width="100%" height="100%" fill="url(#blackGradient)"/>
          
          ${titleText ? `<text x="${targetWidth / 2}" y="80" 
                text-anchor="middle" 
                font-family="Arial, sans-serif" 
                font-size="48" 
                font-weight="700"
                fill="white">
            ${titleText}
          </text>` : ''}
          
          ${websiteText ? `<text x="${targetWidth / 2}" y="140" 
                text-anchor="middle" 
                font-family="Arial, sans-serif" 
                font-size="24" 
                font-weight="400"
                fill="#FFD700">
            ${websiteText}
          </text>` : ''}
        </svg>
      `;

      const svgBuffer = Buffer.from(svg, 'utf-8');

      const finalImage = await processedImage
        .composite([{
          input: svgBuffer,
          left: 0,
          top: targetHeight - svgHeight,
          blend: 'over'
        }])
        .jpeg({ quality: 90 })
        .toBuffer();

      res.setHeader('Content-Type', 'image/jpeg');
      res.setHeader('Content-Disposition', 'inline; filename="reddit-image-overlay.jpg"');
      res.setHeader('Content-Length', String(finalImage.length));
      res.setHeader('Cache-Control', 'public, max-age=300');
      res.setHeader('X-Reddit-Source', url);
      
      return res.send(finalImage);
    }

    // No overlay parameters - just return the processed image
    const finalImage = await processedImage
      .jpeg({ quality: 90 })
      .toBuffer();

    res.setHeader('Content-Type', 'image/jpeg');
    res.setHeader('Content-Disposition', 'inline; filename="reddit-image.jpg"');
    res.setHeader('Content-Length', String(finalImage.length));
    res.setHeader('Cache-Control', 'public, max-age=300');
    res.setHeader('X-Reddit-Source', url);
    
    return res.send(finalImage);

  } catch (error) {
    console.error('❌ Reddit image fetch failed:', error);
    
    return res.status(500).json({
      success: false,
      error: 'Failed to fetch Reddit image',
      message: error.message,
      url: url
    });
  }
}
