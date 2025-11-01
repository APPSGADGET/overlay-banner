import Head from "next/head";

export default function PreviewPage({ imageBase64, title, error, image, website }) {
  if (error) {
    return (
      <div style={{ 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        minHeight: "100vh", 
        backgroundColor: "#1a1a1a", 
        color: "#ff4444",
        fontFamily: "monospace",
        padding: "20px"
      }}>
        <Head>
          <title>Preview Error</title>
        </Head>
        <div style={{ textAlign: "center" }}>
          <h2>❌ Preview Error</h2>
          <pre style={{ 
            backgroundColor: "#2a2a2a", 
            padding: "20px", 
            borderRadius: "8px",
            border: "1px solid #ff4444",
            textAlign: "left"
          }}>
            {error}
          </pre>
          <p style={{ marginTop: "20px" }}>
            <a href="/" style={{ color: "#4CAF50" }}>← Back to API</a>
          </p>
        </div>
      </div>
    );
  }

  if (!imageBase64) {
    return (
      <div style={{ 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        minHeight: "100vh", 
        backgroundColor: "#0a0a0a",
        color: "white",
        fontFamily: "'Inter', sans-serif",
        padding: "20px"
      }}>
        <Head>
          <title>Image Preview</title>
        </Head>
        <div style={{ textAlign: "center" }}>
          <h2>🖼️ Image Preview</h2>
          <p>Add <code>?image=IMAGE_URL</code> to preview an image</p>
          <p style={{ marginTop: "20px" }}>
            <a href="/" style={{ color: "#4CAF50" }}>← Back to API</a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center", 
      minHeight: "100vh", 
      backgroundColor: "#0a0a0a", 
      fontFamily: "'Montserrat', 'Helvetica Neue', sans-serif", 
      padding: "20px",
      flexDirection: "column"
    }}>
      <Head>
        <title>{title ? `Preview: ${decodeURIComponent(title)}` : "Image Preview"}</title>
        <link 
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800;900&display=swap" 
          rel="stylesheet" 
        />
      </Head>
      
      {/* Hidden Canvas for rendering combined image at high resolution */}
      <canvas 
        id="downloadCanvas"
        width="2160" 
        height="2700"
        style={{ display: "none" }}
      />
      
      {/* Preview Canvas */}
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
        border: "2px solid rgba(255, 255, 255, 0.1)",
        marginBottom: "20px"
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
            padding: "100px 40px 20px 40px",
            color: "white",
            textAlign: "center"
          }}>
            <h1 style={{
              fontSize: "clamp(2rem, 5vw, 4rem)",
              fontWeight: "900",
              lineHeight: "1.1",
              margin: "0 0 20px 0",
              textShadow: "3px 6px 15px rgba(0, 0, 0, 0.9)",
              background: "linear-gradient(135deg, #ffffff 0%, #f8f8f8 50%, #ffffff 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              letterSpacing: "-0.03em",
              wordWrap: "break-word",
              overflowWrap: "break-word",
              hyphens: "auto",
              fontFamily: "'Montserrat', sans-serif",
              textTransform: "uppercase"
            }}>
              {decodeURIComponent(title)}
            </h1>
            
            {website && (
              <div style={{
                fontSize: "clamp(0.8rem, 2vw, 1.2rem)",
                fontWeight: "700",
                fontFamily: "'Inter', sans-serif",
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                color: "#FFD700",
                textShadow: "2px 2px 8px rgba(0, 0, 0, 0.8)",
                marginBottom: "30px",
                opacity: "0.95"
              }}>
                {decodeURIComponent(website)}
              </div>
            )}
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
        marginBottom: "20px"
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
          💾 Download JPEG
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
      </div>
      
      {/* Navigation Controls */}
      <div style={{
        display: "flex",
        gap: "10px",
        flexWrap: "wrap",
        justifyContent: "center"
      }}>
        <a 
          href={`/?image=${encodeURIComponent(image)}${title ? `&title=${encodeURIComponent(title)}` : ''}${website ? `&website=${encodeURIComponent(website)}` : ''}`}
          style={{
            backgroundColor: "#2196F3",
            color: "white",
            padding: "10px 20px",
            borderRadius: "8px",
            textDecoration: "none",
            fontSize: "14px",
            fontWeight: "600"
          }}
        >
          📊 View JSON Data
        </a>
        <a 
          href={`/api/image?image=${encodeURIComponent(image)}${title ? `&title=${encodeURIComponent(title)}` : ''}${website ? `&website=${encodeURIComponent(website)}` : ''}`}
          style={{
            backgroundColor: "#4CAF50",
            color: "white",
            padding: "10px 20px",
            borderRadius: "8px",
            textDecoration: "none",
            fontSize: "14px",
            fontWeight: "600"
          }}
        >
          🔗 API Endpoint
        </a>
        <a 
          href="/"
          style={{
            backgroundColor: "#666",
            color: "white",
            padding: "10px 20px",
            borderRadius: "8px",
            textDecoration: "none",
            fontSize: "14px",
            fontWeight: "600"
          }}
        >
          🏠 Home
        </a>
      </div>
      
      <script dangerouslySetInnerHTML={{
        __html: `
          function downloadCombinedImage(format = 'jpeg') {
            const canvas = document.getElementById('downloadCanvas');
            const ctx = canvas.getContext('2d');
            const img = document.getElementById('previewImage');
            const title = "${title ? decodeURIComponent(title).replace(/"/g, '\\"') : ''}";
            const website = "${website ? decodeURIComponent(website).replace(/"/g, '\\"') : ''}";
            
            console.log('Canvas rendering - Title:', title);
            console.log('Canvas rendering - Website:', website);
            
            // Set canvas size at 2x resolution for better quality
            canvas.width = 2160;
            canvas.height = 2700;
            
            // Scale context to maintain coordinate system
            ctx.scale(2, 2);
            
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
              // Enable high-quality image rendering
              ctx.imageSmoothingEnabled = true;
              ctx.imageSmoothingQuality = 'high';
              
              // Ensure fonts are loaded before rendering
              document.fonts.ready.then(() => {
              
              // Calculate image dimensions for proper cropping/zooming
              const imgAspect = img.naturalWidth / img.naturalHeight;
              const canvasAspect = 1080 / 1350;
              
              let sourceX, sourceY, sourceWidth, sourceHeight;
              
              if (imgAspect > canvasAspect) {
                // Image is wider - crop from center horizontally
                sourceHeight = img.naturalHeight;
                sourceWidth = sourceHeight * canvasAspect;
                sourceX = (img.naturalWidth - sourceWidth) / 2;
                sourceY = 0;
              } else {
                // Image is taller - crop from center vertically
                sourceWidth = img.naturalWidth;
                sourceHeight = sourceWidth / canvasAspect;
                sourceX = 0;
                sourceY = (img.naturalHeight - sourceHeight) / 2;
              }
              
              // Draw using source cropping instead of destination scaling for better quality
              ctx.drawImage(
                img, 
                sourceX, sourceY, sourceWidth, sourceHeight,  // Source rectangle
                0, 0, 1080, 1350                              // Destination rectangle
              );
              
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
                ctx.fillRect(0, 950, 1080, 400);
                
                // Set up text properties
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                
                // Start with a good font size
                let fontSize = 120;
                ctx.font = '900 ' + fontSize + 'px Montserrat, Arial, sans-serif';
                
                const maxWidth = 1000;
                const maxLines = 3;
                let lines = wrapText(ctx, title, maxWidth);
                
                // Reduce font size if we have too many lines or lines are still too wide
                  while ((lines.length > maxLines || lines.some(line => ctx.measureText(line).width > maxWidth)) && fontSize > 50) {
                    fontSize -= 8;
                    ctx.font = '900 ' + fontSize + 'px Montserrat, Arial, sans-serif';
                    lines = wrapText(ctx, title, maxWidth);
                  }                // Calculate starting Y position to center the text block
                const lineHeight = fontSize * 1.2;
                const totalHeight = lines.length * lineHeight;
                const startY = 1215 - (totalHeight / 2) + (lineHeight / 2);
                
                // Draw each line
                lines.forEach((line, index) => {
                  const y = startY + (index * lineHeight);
                  
                  // Draw text shadow
                  ctx.fillStyle = 'rgba(0, 0, 0, 0.9)';
                  ctx.fillText(line, 542, y + 3);
                  
                  // Draw main text
                  ctx.fillStyle = 'white';
                  ctx.fillText(line, 540, y);
                });
                
                // Draw website name if provided
                if (website) {
                  const websiteFontSize = Math.min(36, fontSize * 0.3);
                  ctx.font = '700 ' + websiteFontSize + 'px Inter, Arial, sans-serif';
                  ctx.textAlign = 'center';
                  ctx.textBaseline = 'middle';
                  
                  const websiteY = startY + (lines.length * lineHeight) + 40;
                  
                  // Draw website shadow
                  ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
                  ctx.fillText(website.toUpperCase(), 542, websiteY + 2);
                  
                  // Draw website text in gold
                  ctx.fillStyle = '#FFD700';
                  ctx.fillText(website.toUpperCase(), 540, websiteY);
                }
              }
              
              // Download the canvas as image with high quality
              const link = document.createElement('a');
              const fileName = title ? title.replace(/[^a-z0-9]/gi, '_') : 'banner';
              link.download = fileName + '.' + format;
              // Use maximum quality for JPEG (1.0) and PNG (lossless)
              const quality = format === 'jpeg' ? 1.0 : undefined;
              link.href = canvas.toDataURL('image/' + format, quality);
              link.click();
            });
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

// Fetch image data for preview
export async function getServerSideProps(context) {
  const { image = "", title = "", website = "" } = context.query;
  
  if (!image) {
    return { props: { image: "", title: "", website: "" } };
  }

  try {
    // Import the fetch function from the main page
    const { fetchImageWithBuiltins } = await import('../lib/fetchUtils');
    
    const response = await fetchImageWithBuiltins(image);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64Data = buffer.toString('base64');

    return {
      props: {
        imageBase64: base64Data,
        image,
        title: title || "",
        website: website || ""
      }
    };

  } catch (error) {
    console.error('Preview error:', error);
    return {
      props: {
        error: `Failed to load preview: ${error.message}`,
        image,
        title: title || "",
        website: website || ""
      }
    };
  }
}