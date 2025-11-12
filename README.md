# �️ Banner Generator API

A powerful Next.js application that creates professional image banners with custom text overlays. Features 12 design variants, direct image URLs, and comprehensive image processing capabilities.

## ✨ Features

- **🎨 13 Professional Designs**: From news alerts to corporate styles, plus a blank/transparent option
- **⚡ Direct Image URLs**: Works like wsrv.nl for instant embedding
- **🖼️ High Quality Output**: 1080×1350 resolution with optimized compression
- **📱 Preview Mode**: Interactive preview with download options
- **🔗 Multiple Formats**: JPEG and PNG support
- **🚀 Fast Processing**: Server-side rendering with Sharp image processing
- **🌐 Public API**: No authentication required

## 🔧 API Parameters

- `image` → Source image URL (required)
- `title` → Text overlay for banner
- `website` → Brand/website name (optional)
- `design` → Design variant: `default`, `design1`-`design12`, `blank`
- `format` → Output format: `jpeg` (default) or `png`
- `preview` → Set to `true` for interactive preview
- `w` → Width in pixels (default: 1080)
- `h` → Height in pixels (default: 1350)

## 🚀 API Endpoints

### 1. Direct Image URL (recommended)
```
https://your-domain.com/api/direct-image?image=IMAGE_URL&title=TITLE&design=DESIGN
```

### 2. Preview Mode
```
https://your-domain.com/?image=IMAGE_URL&title=TITLE&preview=true
```

### 3. JSON Metadata (API Endpoint)
```
https://your-domain.com/api/image?image=IMAGE_URL&title=TITLE
```

## 📝 Complete Fetch Examples

### 🎨 All Design Variants

#### Default Design (Modern Gradient)
```javascript
fetch('https://your-domain.com/api/direct-image?image=https://picsum.photos/800/600&title=Modern%20Banner&website=YourBrand.com')
```

#### Design 1 - 🚨 Classic Red Alert (Breaking News)
```javascript
fetch('https://your-domain.com/api/direct-image?image=https://picsum.photos/800/600&title=BREAKING%20NEWS&website=CNN.com&design=design1')
```

#### Design 2 - ⚡ Blue Pulse (Tech News)
```javascript
fetch('https://your-domain.com/api/direct-image?image=https://picsum.photos/800/600&title=TECH%20UPDATE&website=TechCrunch.com&design=design2')
```

#### Design 3 - 🟡 Yellow Flash (Viral Content)
```javascript
fetch('https://your-domain.com/api/direct-image?image=https://picsum.photos/800/600&title=VIRAL%20NOW&website=BuzzFeed.com&design=design3')
```

#### Design 4 - 🟥 Gradient Burst (YouTube Style)
```javascript
fetch('https://your-domain.com/api/direct-image?image=https://picsum.photos/800/600&title=HOT%20TOPIC&website=YouTube.com&design=design4')
```

#### Design 5 - 📰 White Noise (Professional News)
```javascript
fetch('https://your-domain.com/api/direct-image?image=https://picsum.photos/800/600&title=OFFICIAL%20STATEMENT&website=Reuters.com&design=design5')
```

#### Design 6 - 🧨 Cyber Alert (Futuristic)
```javascript
fetch('https://your-domain.com/api/direct-image?image=https://picsum.photos/800/600&title=CYBER%20ALERT&website=Wired.com&design=design6')
```

#### Design 7 - 🔥 Red Flash Impact (Urgent Alert)
```javascript
fetch('https://your-domain.com/api/direct-image?image=https://picsum.photos/800/600&title=FLASH%20UPDATE&website=NewsAlert.com&design=design7')
```

#### Design 8 - ⚡ Electric Cyan Pop (Future Tech)
```javascript
fetch('https://your-domain.com/api/direct-image?image=https://picsum.photos/800/600&title=FUTURE%20TECH&website=CyberNews.com&design=design8')
```

#### Design 9 - 🖤 Black + Red Pulse (Energy)
```javascript
fetch('https://your-domain.com/api/direct-image?image=https://picsum.photos/800/600&title=ENERGY%20PULSE&website=PowerNews.com&design=design9')
```

#### Design 10 - 🟠 Amber Alert (Authority)
```javascript
fetch('https://your-domain.com/api/direct-image?image=https://picsum.photos/800/600&title=AMBER%20WARNING&website=AlertSystem.com&design=design10')
```

#### Design 11 - 🔵 Blue Ribbon News (Corporate)
```javascript
fetch('https://your-domain.com/api/direct-image?image=https://picsum.photos/800/600&title=CORPORATE%20NEWS&website=BusinessDaily.com&design=design11')
```

#### Design 12 - 🔴 Metallic Red Signal (Modern)
```javascript
fetch('https://your-domain.com/api/direct-image?image=https://picsum.photos/800/600&title=METALLIC%20SIGNAL&website=ModernNews.com&design=design12')
```

#### Design: Blank - ⬜ Completely Transparent (No Overlay)
```javascript
fetch('https://your-domain.com/api/direct-image?image=https://picsum.photos/800/600&title=&website=&design=blank')
```
Perfect for when you want the raw image without any background, text, or overlay elements. The title and website parameters are ignored with this design.

**Also available in bundled-font-overlay:**
```javascript
fetch('https://your-domain.com/api/bundled-font-overlay?image=https://picsum.photos/800/600&design=blank')
```

### 🖼️ Format Variations

#### PNG Format (with transparency support)
```javascript
fetch('https://your-domain.com/api/direct-image?image=https://picsum.photos/800/600&title=PNG%20Banner&format=png&design=design2')
```

#### Custom Dimensions
```javascript
fetch('https://your-domain.com/api/direct-image?image=https://picsum.photos/800/600&title=Custom%20Size&w=1920&h=1080&design=design1')
```

### 📱 Interactive Preview Mode
```javascript
// Open in browser for interactive preview with download options
window.open('https://your-domain.com/?image=https://picsum.photos/800/600&title=Preview%20Banner&website=Demo.com&preview=true&design=design3')
```

### 📊 JSON Metadata Response
```javascript
// Get pure JSON metadata (no HTML wrapper)
fetch('https://your-domain.com/api/image?image=https://picsum.photos/800/600&title=Metadata%20Only')
  .then(response => response.json())
  .then(data => console.log(data));
```

#### JSON Response Example:
```json
[
  {
    "statusCode": 200,
    "headers": [
      {
        "name": "content-type",
        "value": "image/jpeg"
      },
      {
        "name": "content-length", 
        "value": "370962"
      }
    ],
    "cookieHeaders": [],
    "data": "IMTBuffer(370962, binary, ffd8ffe000104a46...): /9j/4AAQSkZJRgABAQAAAQ...",
    "fileSize": 370962,
    "fileName": "file.jpeg",
    "contentType": "image/jpeg",
    "url": "https://picsum.photos/800/600",
    "title": "Metadata Only",
    "timestamp": "2025-11-02T12:00:00.000Z"
  }
]
```

## 🎨 Design Variants Guide

| Design | Style | Best For | Color Scheme |
|--------|-------|----------|--------------|
| `default` | Modern gradient | General use | Blue gradient |
| `design1` | 🚨 Red Alert | Breaking news | Red gradient |
| `design2` | ⚡ Blue Pulse | Tech news | Electric blue |
| `design3` | 🟡 Yellow Flash | Viral content | Yellow accent |
| `design4` | 🟥 Gradient Burst | YouTube style | Red-orange |
| `design5` | 📰 White Noise | Professional | Clean white |
| `design6` | 🧨 Cyber Alert | Futuristic | Neon effects |
| `design7` | 🔥 Red Flash | Urgent alerts | Impact red |
| `design8` | ⚡ Electric Cyan | Fresh tech | Cyan pop |
| `design9` | 🖤 Black + Red | Energetic | Black/red |
| `design10` | 🟠 Amber Alert | Authority | Amber warning |
| `design11` | 🔵 Blue Ribbon | Corporate | Professional blue |
| `design12` | 🔴 Metallic Red | Modern polish | Metallic red |
| `blank` | ⬜ Transparent | Raw image | No overlay |

**Note:** The `blank` design returns the image without any overlay and is available in both `/api/direct-image` and `/api/bundled-font-overlay` endpoints.

## 🔧 Advanced Usage

### Embedding in HTML
```html
<img src="https://your-domain.com/api/direct-image?image=https://picsum.photos/800/600&title=Embedded%20Banner&design=design1" alt="News Banner" />
```

### Social Media Integration
```javascript
// Perfect for social media posts
const bannerUrl = 'https://your-domain.com/api/direct-image?' + 
  'image=https://images.unsplash.com/photo-1506905925346-21bda4d32df4' +
  '&title=Social%20Media%20Post' +
  '&website=YourBrand.com' +
  '&design=design3' +
  '&format=png';

// Use bannerUrl for Twitter, Facebook, Instagram, etc.
```

### Batch Processing
```javascript
const designs = ['design1', 'design2', 'design3'];
const baseUrl = 'https://your-domain.com/api/direct-image?image=https://picsum.photos/800/600&title=Batch%20Test';

designs.forEach(design => {
  fetch(`${baseUrl}&design=${design}`)
    .then(response => response.blob())
    .then(blob => {
      // Process each design variant
      console.log(`Generated ${design} variant`);
    });
});
```

## 📊 Response Formats

The API supports multiple response types:

- **Direct Image**: Binary image data (default for `/api/direct-image`)
- **JSON Metadata**: Complete image information with base64 data
- **Interactive Preview**: HTML interface with download options

## 🛠 Development

1. Install dependencies:
```bash
npm install
```

2. Run development server:
```bash
npm run dev
```

3. Test the API:
```bash
# Test direct image generation
curl "http://localhost:3001/api/direct-image?image=https://picsum.photos/800/600&title=Test%20Banner&design=design1" --output test-banner.jpg

# Test JSON metadata (pure JSON API)
curl "http://localhost:3001/api/image?image=https://picsum.photos/800/600&title=Test%20Metadata"

# Test preview mode
open "http://localhost:3001/?image=https://picsum.photos/800/600&title=Test%20Preview&preview=true&design=design2"
```

4. Build for production:
```bash
npm run build
```

## � Security & Access

### Public Homepage
- Default homepage shows a clean, professional interface
- No API details exposed to public visitors
- Perfect for public deployment

### Technical Documentation
- Access with `?admin=docs` parameter
- Complete API documentation and examples
- For developers and technical users

```bash
# Public homepage (safe for public)
https://your-domain.com/

# Technical docs (for developers)
https://your-domain.com/?admin=docs
```

## 🚀 Deployment

### Vercel (Recommended)
1. Connect GitHub repository to Vercel
2. Automatic deployments with global CDN
3. Serverless functions with Sharp optimization
4. Built-in SSL and performance optimization

### Environment Variables
No environment variables required - the API is designed to work out of the box.

### Production Considerations
- Sharp image processing is optimized for serverless
- Global CDN ensures fast image delivery
- No rate limiting implemented (add if needed)
- CORS enabled for cross-origin requests

## 📈 Performance

- **Image Processing**: Server-side Sharp optimization
- **Output Quality**: 1080×1350 high resolution
- **Compression**: Optimized JPEG (quality: 90) and PNG
- **Caching**: Browser and CDN friendly headers
- **Response Time**: < 2s for most images

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Add new design variants in `pages/api/direct-image.js`
4. Test with multiple image formats
5. Submit a pull request

## 📄 License

MIT License - feel free to use in personal and commercial projects.

## 🔗 Links

- **Live Demo**: [Try the API](https://your-domain.com/api/direct-image?image=https://picsum.photos/800/600&title=Demo%20Banner&design=design1)
- **Preview Mode**: [Interactive Preview](https://your-domain.com/?image=https://picsum.photos/800/600&title=Demo&preview=true&design=design2)
- **Documentation**: [Technical Docs](https://your-domain.com/?admin=docs)