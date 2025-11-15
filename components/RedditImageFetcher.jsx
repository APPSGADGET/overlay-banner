import React, { useState } from 'react';

export default function RedditImageFetcher() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [overlayMode, setOverlayMode] = useState(false);
  const [title, setTitle] = useState('');
  const [website, setWebsite] = useState('');
  const [design, setDesign] = useState('default');
  const [error, setError] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);

  // Get API base from environment or default to relative path
  const API_BASE = typeof window !== 'undefined' ? window.location.origin : '';

  async function fetchImages() {
    setError(null);
    setProcessedImage(null);
    setImages([]);
    
    if (!input) {
      return setError('Please paste a Reddit post URL');
    }

    setLoading(true);
    
    try {
      const url = `${API_BASE}/api/reddit-image?url=${encodeURIComponent(input)}`;
      const response = await fetch(url);
      const json = await response.json();
      
      if (!json.success) {
        setError(json.error || json.message || 'No images found');
      } else {
        setImages(json.images || []);
      }
    } catch (e) {
      console.error('Fetch error:', e);
      setError('Network error: ' + e.message);
    } finally {
      setLoading(false);
    }
  }

  async function processWithOverlay(imageUrl) {
    setError(null);
    setProcessedImage(null);
    setLoading(true);

    try {
      const params = new URLSearchParams({
        url: input,
        ...(title && { title }),
        ...(website && { website }),
        ...(design !== 'default' && { design })
      });

      const url = `${API_BASE}/api/reddit-image?${params.toString()}`;
      
      // Fetch as blob since we're getting an image
      const response = await fetch(url);
      
      if (!response.ok) {
        const json = await response.json();
        setError(json.error || json.message || 'Processing failed');
        return;
      }

      // Create object URL from blob
      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      setProcessedImage(objectUrl);
      
    } catch (e) {
      console.error('Processing error:', e);
      setError('Network error: ' + e.message);
    } finally {
      setLoading(false);
    }
  }

  function downloadProcessedImage() {
    if (processedImage) {
      const link = document.createElement('a');
      link.href = processedImage;
      link.download = `reddit-banner-${Date.now()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
      alert('Copied to clipboard!');
    });
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-3xl font-bold mb-2 text-gray-800">🔴 Reddit Image Fetcher</h2>
        <p className="mb-6 text-sm text-gray-600">
          Paste a Reddit post URL to extract images. Optionally add text overlay with custom designs.
        </p>

        {/* Input Section */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Reddit Post URL
          </label>
          <div className="flex gap-2">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="https://www.reddit.com/r/pics/comments/..."
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onKeyPress={e => e.key === 'Enter' && fetchImages()}
            />
            <button
              onClick={fetchImages}
              disabled={loading}
              className="px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Loading...' : 'Fetch Images'}
            </button>
          </div>
        </div>

        {/* Overlay Options Toggle */}
        <div className="mb-4">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={overlayMode}
              onChange={e => setOverlayMode(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm font-medium text-gray-700">
              Enable Text Overlay & Design Options
            </span>
          </label>
        </div>

        {/* Overlay Options Panel */}
        {overlayMode && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold mb-3 text-gray-700">Overlay Options</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="BREAKING NEWS"
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Website
                </label>
                <input
                  value={website}
                  onChange={e => setWebsite(e.target.value)}
                  placeholder="Reddit.com"
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Design Variant
              </label>
              <select
                value={design}
                onChange={e => setDesign(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              >
                <option value="default">Default (Modern Gradient)</option>
                <option value="design1">🚨 Red Alert (Breaking News)</option>
                <option value="design2">⚡ Blue Pulse (Tech News)</option>
                <option value="design3">🟡 Yellow Flash (Viral)</option>
                <option value="design4">🟥 Gradient Burst (YouTube)</option>
                <option value="design5">📰 White Noise (Professional)</option>
                <option value="design6">🧨 Cyber Alert (Futuristic)</option>
                <option value="design7">🔥 Red Flash (Urgent)</option>
                <option value="design8">⚡ Electric Cyan (Tech)</option>
                <option value="design9">🖤 Black + Red Pulse</option>
                <option value="design10">🟠 Amber Alert</option>
                <option value="design11">🔵 Blue Ribbon (Corporate)</option>
                <option value="design12">🔴 Metallic Red</option>
                <option value="blank">⬜ Blank (No Overlay)</option>
              </select>
            </div>

            <button
              onClick={() => processWithOverlay(images[0])}
              disabled={loading || !input || images.length === 0}
              className="w-full px-4 py-2 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Processing...' : 'Generate Banner with Overlay'}
            </button>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 font-medium">❌ {error}</p>
          </div>
        )}

        {/* Processed Image Display */}
        {processedImage && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="text-lg font-semibold mb-3 text-green-800">✅ Banner Generated</h3>
            <img
              src={processedImage}
              alt="Processed banner"
              className="w-full rounded-lg shadow-md mb-3"
            />
            <div className="flex gap-2">
              <button
                onClick={downloadProcessedImage}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Download Banner
              </button>
              <button
                onClick={() => copyToClipboard(processedImage)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Copy URL
              </button>
            </div>
          </div>
        )}

        {/* Images Grid */}
        {images.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-700">
              Found {images.length} Image{images.length > 1 ? 's' : ''}
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {images.map((img, i) => (
                <div
                  key={i}
                  className="p-4 border border-gray-200 rounded-lg flex flex-col md:flex-row items-start gap-4 hover:shadow-md transition-shadow"
                >
                  <img
                    src={img}
                    alt={`Reddit image ${i + 1}`}
                    className="w-full md:w-32 h-32 object-cover rounded-lg"
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="128" height="128"%3E%3Crect fill="%23ccc" width="128" height="128"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%23666"%3EError%3C/text%3E%3C/svg%3E';
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-gray-600 break-all mb-2 font-mono bg-gray-50 p-2 rounded">
                      {img}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <a
                        href={img}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                      >
                        Open Image
                      </a>
                      <button
                        onClick={() => copyToClipboard(img)}
                        className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                      >
                        Copy URL
                      </button>
                      <a
                        href={`${API_BASE}/api/direct-image?image=${encodeURIComponent(img)}&title=FROM%20REDDIT`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors"
                      >
                        Apply Overlay
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Usage Examples */}
        {!images.length && !error && !loading && (
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">💡 Try these examples:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Paste any Reddit post URL from r/pics, r/EarthPorn, etc.</li>
              <li>• Works with single images and gallery posts</li>
              <li>• Enable overlay mode to add custom text and designs</li>
              <li>• Supports all 13 design variants including blank/transparent</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
