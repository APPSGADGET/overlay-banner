import Head from "next/head";

export default function Home({ imageData, error, image, title }) {
  // If we have image data, return JSON response
  if (imageData) {
    return (
      <div style={{ padding: "20px", fontFamily: "monospace", backgroundColor: "#1a1a1a", color: "#00ff00", minHeight: "100vh" }}>
        <Head>
          <title>Image Data API Response</title>
        </Head>
        <h2>Image Data Response:</h2>
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

          <h3 style={{ color: "#2196F3", marginBottom: "15px", marginTop: "25px" }}>Example:</h3>
          <div style={codeStyle}>
            ?image=https://images.unsplash.com/photo-1506905925346-21bda4d32df4&title=Adventure%20Awaits
          </div>

          <h3 style={{ color: "#2196F3", marginBottom: "15px", marginTop: "25px" }}>Response includes:</h3>
          <ul style={{ lineHeight: "2", opacity: "0.9" }}>
            <li>✅ HTTP Status Code</li>
            <li>✅ Response Headers</li>
            <li>✅ Binary Image Data (Base64)</li>
            <li>✅ File Size Information</li>
            <li>✅ Content Type Detection</li>
            <li>✅ Cache Control Headers</li>
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
  const { image = "", title = "" } = context.query;
  
  // If no image parameter, show the API documentation
  if (!image) {
    return { props: { image: "", title: "" } };
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

    return {
      props: {
        imageData,
        image,
        title
      }
    };

  } catch (error) {
    console.error('Error fetching image:', error);
    
    return {
      props: {
        error: `Failed to fetch image: ${error.message}`,
        image,
        title
      }
    };
  }
}