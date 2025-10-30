# 📡 Image Data API

A powerful Next.js application that fetches images and returns detailed metadata including headers, binary data, and file information in JSON format.

## ✨ API Features

- **Image Fetching**: Downloads images from any URL
- **Header Analysis**: Returns complete HTTP headers
- **Binary Data**: Provides image data in multiple formats
- **File Detection**: Automatically detects content type and file extension
- **Error Handling**: Comprehensive error responses
- **CORS Enabled**: Cross-origin requests supported
- **Multiple Endpoints**: Both web interface and pure API access

## 🔧 API Parameters

- `image` → Image URL to fetch and analyze (required)
- `title` → Optional title/description text

## 🚀 API Endpoints

### 1. Web Interface (with HTML response)
```
https://your-domain.com/?image=IMAGE_URL&title=TITLE
```

### 2. Pure JSON API 
```
https://your-domain.com/api/image?image=IMAGE_URL&title=TITLE
```

## 📝 Usage Examples

### Basic Image Fetch:
```
GET /?image=https://images.unsplash.com/photo-1506905925346-21bda4d32df4&title=Adventure%20Awaits
```

### API Response Example:
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
    "data": "IMTBuffer(370962, binary, ffd8ffe000104a46...): ffd8ffe000104a46...",
    "fileSize": 370962,
    "fileName": "file.jpeg",
    "metadata": {
      "contentType": "image/jpeg",
      "originalUrl": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
      "title": "Adventure Awaits",
      "base64Data": "/* full base64 encoded image data */"
    }
  }
]
```

## 🔧 Response Format

The API returns detailed information about fetched images:

- **statusCode**: HTTP status code from the image request
- **headers**: Complete HTTP headers as name/value pairs  
- **cookieHeaders**: Any cookies from the response
- **data**: Binary image data representation with hex preview
- **fileSize**: Size of the image file in bytes
- **fileName**: Generated filename with proper extension
- **metadata**: Additional information including full base64 data

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
curl "http://localhost:3000/api/image?image=https://images.unsplash.com/photo-1506905925346-21bda4d32df4"
```

4. Build for production:
```bash
npm run build
```

## 🚀 Deployment

This API is optimized for Vercel deployment with serverless functions. Simply connect your GitHub repository to Vercel for automatic deployments with global CDN support.