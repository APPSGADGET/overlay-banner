// API route for pure JSON response
export default async function handler(req, res) {
  const { image, title } = req.query;

  // Validate image parameter
  if (!image) {
    return res.status(400).json({
      error: "Missing 'image' parameter",
      usage: "?image=IMAGE_URL&title=TITLE_TEXT",
      example: "?image=https://images.unsplash.com/photo-1506905925346-21bda4d32df4&title=Adventure%20Awaits"
    });
  }

  try {
    // Fetch the image
    const response = await fetch(image, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Get response headers
    const headers = [];
    response.headers.forEach((value, name) => {
      headers.push({ name, value });
    });

    // Get binary data
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    // Convert to base64 for JSON serialization
    const base64Data = buffer.toString('base64');
    
    // Determine file extension from content-type
    const contentType = response.headers.get('content-type') || 'application/octet-stream';
    let fileExtension = 'bin';
    if (contentType.includes('jpeg') || contentType.includes('jpg')) {
      fileExtension = 'jpeg';
    } else if (contentType.includes('png')) {
      fileExtension = 'png';
    } else if (contentType.includes('gif')) {
      fileExtension = 'gif';
    } else if (contentType.includes('webp')) {
      fileExtension = 'webp';
    }

    // Create hex preview (first 50 characters)
    const hexPreview = buffer.toString('hex').substring(0, 100);

    // Create response data structure matching your example
    const responseData = [{
      statusCode: response.status,
      headers: headers,
      cookieHeaders: [], // Empty array as in your example
      data: `IMTBuffer(${buffer.length}, binary, ${hexPreview.substring(0, 32)}): ${hexPreview}`,
      fileSize: buffer.length,
      fileName: `file.${fileExtension}`,
      // Additional metadata (optional)
      metadata: {
        contentType: contentType,
        originalUrl: image,
        title: title ? decodeURIComponent(title) : "",
        timestamp: new Date().toISOString(),
        base64Data: base64Data // Full base64 data for actual use
      }
    }];

    // Set proper headers
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    return res.status(200).json(responseData);

  } catch (error) {
    console.error('Error fetching image:', error);
    
    return res.status(500).json({
      error: "Failed to fetch image",
      message: error.message,
      statusCode: 500,
      timestamp: new Date().toISOString()
    });
  }
}