import Head from "next/head";
import { fetchImageWithBuiltins } from "../lib/fetchUtils";

export default function Home({ imageData, error, image, title, preview, imageBase64 }) {
  // If preview mode is enabled, show the actual image with overlay
  if (preview && imageBase64) {
    return (
      <div style={{ 
        display: "flex", 
        flexDirection: "column",
        justifyContent: "center", 
        alignItems: "center", 
        minHeight: "100vh", 
        backgroundColor: "#0a0a0a", 
        fontFamily: "'Inter', 'Helvetica Neue', sans-serif", 
        padding: "20px",
        gap: "20px"
      }}>
        <Head>
          <title>{title ? decodeURIComponent(title) : "Image Preview"}</title>
          <link 
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap" 
            rel="stylesheet" 
          />
        </Head>
        
        {/* Hidden Canvas for rendering combined image */}
        <canvas 
          id="downloadCanvas"
          width="1080" 
          height="1350"
          style={{ display: "none" }}
        />
        
        <div style={{
          position: "relative",
          width: "1080px",
          height: "1350px",
          maxWidth: "90vw",
          maxHeight: "70vh",
          backgroundColor: "#ffffff",
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow: "0 25px 50px rgba(0, 0, 0, 0.5)",
          border: "2px solid rgba(255, 255, 255, 0.1)"
        }}>
          <img
            id="previewImage"
            src={`data:image/jpeg;base64,${imageBase64}`}
            alt="Preview"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              display: "block"
            }}
          />
          
          {title && (
            <div style={{
              position: "absolute",
              bottom: "0",
              left: "0",
              right: "0",
              background: "linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.1) 20%, rgba(0, 0, 0, 0.4) 40%, rgba(0, 0, 0, 0.7) 60%, rgba(0, 0, 0, 0.9) 80%, rgba(0, 0, 0, 0.98) 100%)",
              padding: "100px 40px 80px 40px",
              color: "white",
              textAlign: "center"
            }}>
              <h1 style={{
                fontSize: "clamp(2rem, 5vw, 4rem)",
                fontWeight: "800",
                lineHeight: "1.2",
                margin: "0",
                textShadow: "2px 4px 12px rgba(0, 0, 0, 0.8)",
                background: "linear-gradient(135deg, #ffffff 0%, #f0f0f0 50%, #ffffff 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                letterSpacing: "-0.02em",
                wordWrap: "break-word",
                overflowWrap: "break-word",
                hyphens: "auto"
              }}>
                {decodeURIComponent(title)}
              </h1>
            </div>
          )}
          
          {/* Preview Mode Indicator */}
          <div style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            backgroundColor: "rgba(76, 175, 80, 0.9)",
            color: "white",
            padding: "8px 16px",
            borderRadius: "20px",
            fontSize: "12px",
            fontWeight: "600"
          }}>
            📖 PREVIEW MODE
          </div>
        </div>
        
        {/* Download Controls */}
        <div style={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center"
        }}>
          <button 
            onClick={() => downloadCombinedImage()}
            style={{
              backgroundColor: "#4CAF50",
              color: "white",
              padding: "12px 24px",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}
          >
            💾 Download Image
          </button>
          
          <button 
            onClick={() => downloadCombinedImage('png')}
            style={{
              backgroundColor: "#2196F3",
              color: "white",
              padding: "12px 24px",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}
          >
            🖼️ Download PNG
          </button>
          
          <div style={{
            color: "rgba(255, 255, 255, 0.7)",
            fontSize: "14px",
            textAlign: "center",
            maxWidth: "300px"
          }}>
            Downloads the complete image with text overlay (1080×1350)
          </div>
        </div>
        
        <script dangerouslySetInnerHTML={{
          __html: `
            function downloadCombinedImage(format = 'jpeg') {
              const canvas = document.getElementById('downloadCanvas');
              const ctx = canvas.getContext('2d');
              const img = document.getElementById('previewImage');
              const title = "${title ? decodeURIComponent(title).replace(/"/g, '\\"') : ''}";
              
              // Set canvas size
              canvas.width = 1080;
              canvas.height = 1350;
              
              // Function to wrap text into multiple lines
              function wrapText(ctx, text, maxWidth) {
                const words = text.split(' ');
                const lines = [];
                let currentLine = words[0];
                
                for (let i = 1; i < words.length; i++) {
                  const word = words[i];
                  const width = ctx.measureText(currentLine + " " + word).width;
                  if (width < maxWidth) {
                    currentLine += " " + word;
                  } else {
                    lines.push(currentLine);
                    currentLine = word;
                  }
                }
                lines.push(currentLine);
                return lines;
              }
              
              // When image loads, draw everything
              const drawImage = () => {
                // Calculate image dimensions for proper cropping/zooming
                const imgAspect = img.naturalWidth / img.naturalHeight;
                const canvasAspect = 1080 / 1350;
                
                let drawWidth, drawHeight, drawX, drawY;
                
                if (imgAspect > canvasAspect) {
                  // Image is wider - fit to height and crop sides
                  drawHeight = 1350;
                  drawWidth = drawHeight * imgAspect;
                  drawX = (1080 - drawWidth) / 2;
                  drawY = 0;
                } else {
                  // Image is taller - fit to width and crop top/bottom
                  drawWidth = 1080;
                  drawHeight = drawWidth / imgAspect;
                  drawX = 0;
                  drawY = (1350 - drawHeight) / 2;
                }
                
                // Draw the background image with proper aspect ratio (zoomed/cropped)
                ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
                
                if (title) {
                // Create improved gradient overlay (starts higher and more black at bottom)
                const gradient = ctx.createLinearGradient(0, 950, 0, 1350);
                gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
                gradient.addColorStop(0.2, 'rgba(0, 0, 0, 0.1)');
                gradient.addColorStop(0.4, 'rgba(0, 0, 0, 0.4)');
                gradient.addColorStop(0.6, 'rgba(0, 0, 0, 0.7)');
                gradient.addColorStop(0.8, 'rgba(0, 0, 0, 0.9)');
                gradient.addColorStop(1, 'rgba(0, 0, 0, 0.98)');
                
                ctx.fillStyle = gradient;
                ctx.fillRect(0, 950, 1080, 400);                  // Set up text properties
                  ctx.textAlign = 'center';
                  ctx.textBaseline = 'middle';
                  
                  // Start with a good font size
                  let fontSize = 120;
                  ctx.font = 'bold ' + fontSize + 'px Inter, Arial, sans-serif';
                  
                  const maxWidth = 1000;
                  const maxLines = 3;
                  let lines = wrapText(ctx, title, maxWidth);
                  
                  // Reduce font size if we have too many lines or lines are still too wide
                  while ((lines.length > maxLines || lines.some(line => ctx.measureText(line).width > maxWidth)) && fontSize > 50) {
                    fontSize -= 8;
                    ctx.font = 'bold ' + fontSize + 'px Inter, Arial, sans-serif';
                    lines = wrapText(ctx, title, maxWidth);
                  }
                  
                  // Calculate starting Y position to center the text block
                  const lineHeight = fontSize * 1.2;
                  const totalHeight = lines.length * lineHeight;
                  const startY = 1215 - (totalHeight / 2) + (lineHeight / 2);
                  
                  // Draw each line
                  lines.forEach((line, index) => {
                    const y = startY + (index * lineHeight);
                    
                    // Draw text shadow
                    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
                    ctx.fillText(line, 542, y + 2); // Slightly offset for shadow
                    
                    // Draw main text
                    ctx.fillStyle = 'white';
                    ctx.fillText(line, 540, y);
                  });
                }
                
                // Download the canvas as image
                const link = document.createElement('a');
                const fileName = title ? title.replace(/[^a-z0-9]/gi, '_') : 'banner';
                link.download = fileName + '.' + format;
                link.href = canvas.toDataURL('image/' + format, 0.95);
                link.click();
              };
              
              if (img.complete) {
                drawImage();
              } else {
                img.onload = drawImage;
              }
            }
          `
        }} />
      </div>
    );
  }

  // If we have image data, return JSON response
  if (imageData) {
    return (
      <div style={{ padding: "20px", fontFamily: "monospace", backgroundColor: "#1a1a1a", color: "#00ff00", minHeight: "100vh" }}>
        <Head>
          <title>Image Data API Response</title>
        </Head>
        <h2>Image Data Response:</h2>
        <div style={{ 
          backgroundColor: "#2a2a2a", 
          padding: "10px", 
          borderRadius: "8px", 
          marginBottom: "20px",
          border: "1px solid #4CAF50"
        }}>
          <p style={{ margin: "0", color: "#4CAF50" }}>
            💡 <strong>Tip:</strong> Add <code>&preview=true</code> to see the actual image output!
          </p>
        </div>
        <pre style={{ 
          backgroundColor: "#2a2a2a", 
          padding: "20px", 
          borderRadius: "8px", 
          overflow: "auto",
          fontSize: "12px",
          border: "1px solid #444"
        }}>
          {JSON.stringify(imageData, null, 2)}
        </pre>
      </div>
    );
  }

  // Show error if there's an issue fetching image
  if (error) {
    return (
      <div style={{ padding: "20px", fontFamily: "monospace", backgroundColor: "#1a1a1a", color: "#ff4444", minHeight: "100vh" }}>
        <Head>
          <title>Error - Image Data API</title>
        </Head>
        <h2>Error fetching image:</h2>
        <pre style={{ 
          backgroundColor: "#2a2a2a", 
          padding: "20px", 
          borderRadius: "8px",
          border: "1px solid #ff4444"
        }}>
          {error}
        </pre>
      </div>
    );
  }

  // Default UI when no image parameter is provided
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#0a0a0a",
    fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
    padding: "20px"
  };

  const apiDocStyle = {
    maxWidth: "800px",
    backgroundColor: "#1a1a1a",
    borderRadius: "20px",
    padding: "40px",
    color: "white",
    border: "2px solid rgba(255, 255, 255, 0.1)"
  };

  const codeStyle = {
    backgroundColor: "#2a2a2a",
    padding: "15px",
    borderRadius: "8px",
    fontFamily: "monospace",
    fontSize: "14px",
    margin: "10px 0",
    border: "1px solid #444"
  };

  return (
    <>
      <Head>
        <title>Image Data API - Overlay Banner Generator</title>
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap" 
          rel="stylesheet" 
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="API to fetch image data with headers and binary content" />
        <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🖼️</text></svg>" />
      </Head>

      <div style={containerStyle} className="banner-container">
        <div style={apiDocStyle}>
          <h1 style={{ marginBottom: "20px", color: "#4CAF50" }}>
            📡 Image Data API
          </h1>
          
          <p style={{ lineHeight: "1.6", marginBottom: "30px", opacity: "0.9" }}>
            This API fetches images and returns detailed metadata including headers, binary data, and file information in JSON format.
          </p>

          <h3 style={{ color: "#2196F3", marginBottom: "15px" }}>Usage:</h3>
          <div style={codeStyle}>
            ?image=IMAGE_URL&title=TITLE_TEXT
          </div>
          <div style={codeStyle}>
            ?image=IMAGE_URL&title=TITLE_TEXT&preview=true  {/* Preview Mode */}
          </div>

          <h3 style={{ color: "#2196F3", marginBottom: "15px", marginTop: "25px" }}>Examples:</h3>
          
          <h4 style={{ color: "#FF9800", marginBottom: "10px", marginTop: "20px" }}>📊 JSON Data Mode:</h4>
          <div style={codeStyle}>
            ?image=https://picsum.photos/800/600&title=Test%20Image
          </div>
          <div style={codeStyle}>
            ?image=https://httpbin.org/image/jpeg&title=Simple%20Test
          </div>
          
          <h4 style={{ color: "#FF9800", marginBottom: "10px", marginTop: "20px" }}>🖼️ Preview Mode:</h4>
          <div style={codeStyle}>
            ?image=https://picsum.photos/800/600&title=Test%20Image&preview=true
          </div>
          <div style={codeStyle}>
            ?image=https://images.unsplash.com/photo-1506905925346-21bda4d32df4&title=Adventure%20Awaits&preview=true
          </div>

          <h3 style={{ color: "#2196F3", marginBottom: "15px", marginTop: "25px" }}>Parameters:</h3>
          <ul style={{ lineHeight: "2", opacity: "0.9" }}>
            <li><code>image</code> - Image URL to fetch (required)</li>
            <li><code>title</code> - Text overlay for preview mode</li>
            <li><code>preview</code> - Set to 'true' to see image output instead of JSON</li>
          </ul>

          <h3 style={{ color: "#2196F3", marginBottom: "15px", marginTop: "25px" }}>Response includes:</h3>
          <ul style={{ lineHeight: "2", opacity: "0.9" }}>
            <li>✅ HTTP Status Code</li>
            <li>✅ Response Headers</li>
            <li>✅ Binary Image Data (Base64)</li>
            <li>✅ File Size Information</li>
            <li>✅ Content Type Detection</li>
            <li>✅ 🖼️ Preview Mode Available</li>
          </ul>

          <div style={{ 
            marginTop: "30px", 
            padding: "20px", 
            backgroundColor: "#2a2a2a", 
            borderRadius: "10px",
            border: "1px solid #4CAF50"
          }}>
            <p style={{ margin: "0", color: "#4CAF50" }}>
              💡 <strong>Tip:</strong> Add image and title parameters to get started!
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

// Server-side rendering to fetch image data
export async function getServerSideProps(context) {
  const { image = "", title = "", preview = "" } = context.query;
  
  // If no image parameter, show the API documentation
  if (!image) {
    return { props: { image: "", title: "", preview: "" } };
  }

  try {
    // Validate URL
    let imageUrl;
    try {
      imageUrl = new URL(image);
    } catch (urlError) {
      throw new Error(`Invalid image URL: ${image}`);
    }

    console.log(`Fetching image from: ${imageUrl.href}`);

    // Use Node.js built-in modules for more reliable fetching
    const response = await fetchImageWithBuiltins(imageUrl.href);

    console.log(`Response status: ${response.status}`);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
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

    // Create response data structure
    const imageData = [{
      statusCode: response.status,
      headers: headers,
      cookieHeaders: [], // Could be populated if needed
      data: `IMTBuffer(${buffer.length}, binary, ${buffer.toString('hex').substring(0, 32)}...): ${base64Data.substring(0, 100)}...`, // Truncated for display
      fileSize: buffer.length,
      fileName: `file.${fileExtension}`,
      // Additional metadata
      contentType: contentType,
      url: image,
      title: title ? decodeURIComponent(title) : "",
      timestamp: new Date().toISOString()
    }];

    // If preview mode, also include base64 data for direct display
    const shouldPreview = preview === 'true' || preview === '1';
    let imageBase64 = null;
    
    if (shouldPreview) {
      imageBase64 = base64Data;
    }

    return {
      props: {
        imageData: shouldPreview ? null : imageData, // Don't send JSON data in preview mode
        image,
        title,
        preview: shouldPreview,
        imageBase64
      }
    };

  } catch (error) {
    console.error('Error fetching image:', error);
    
    // Provide more detailed error information
    let errorMessage = `Failed to fetch image: ${error.message}`;
    
    if (error.code === 'ENOTFOUND') {
      errorMessage += '\n\nPossible causes:\n- Invalid domain name\n- Network connectivity issues\n- DNS resolution failed';
    } else if (error.code === 'ECONNREFUSED') {
      errorMessage += '\n\nConnection refused by the server';
    } else if (error.code === 'ETIMEDOUT') {
      errorMessage += '\n\nRequest timed out';
    } else if (error.name === 'AbortError') {
      errorMessage += '\n\nRequest was aborted (timeout)';
    } else if (error.cause?.code === 'UNABLE_TO_GET_ISSUER_CERT_LOCALLY') {
      errorMessage += '\n\nSSL Certificate Issue:\n- The server has an invalid or expired SSL certificate\n- This is automatically handled by trying HTTP fallback';
    } else if (error.cause?.code === 'CERT_HAS_EXPIRED') {
      errorMessage += '\n\nSSL Certificate Expired:\n- The server certificate has expired\n- Trying alternative connection methods';
    } else if (error.cause?.code === 'SELF_SIGNED_CERT_IN_CHAIN') {
      errorMessage += '\n\nSelf-signed SSL Certificate:\n- The server uses a self-signed certificate\n- This is handled automatically';
    }
    
    errorMessage += `\n\nOriginal URL: ${image}`;
    errorMessage += `\nError details: ${JSON.stringify({ name: error.name, code: error.code, cause: error.cause }, null, 2)}`;
    
    return {
      props: {
        error: errorMessage,
        image,
        title,
        preview: preview === 'true' || preview === '1'
      }
    };
  }
}