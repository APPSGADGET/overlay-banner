# 🎨 Overlay Banner Generator

A stunning, production-ready Next.js application that creates beautiful 1080×1350 banners with customizable image backgrounds and gradient text overlays.

## ✨ Enhanced Features

- **Fixed Canvas Size**: 1080×1350 pixels - perfect for social media
- **Smart Text Overlay**: Title appears directly on the image with gradient backdrop
- **Custom Typography**: Inter font family with responsive scaling
- **Gradient Effects**: Beautiful gradient overlays and text effects
- **Auto-fit Text**: Automatically adjusts font size based on content length
- **Responsive Design**: Works beautifully on all device sizes
- **Modern UI**: Dark theme with smooth animations and shadows
- **Error Handling**: Graceful fallbacks for broken images

## 🔧 URL Parameters

- `image` → Background image URL
- `title` → Overlay text (URL encoded for special characters)

## 🚀 Usage

Visit the deployed application with URL parameters:
```
https://your-domain.com/?image=IMAGE_URL&title=BANNER_TEXT
```

### Examples:
```
# Simple banner
?image=https://images.unsplash.com/photo-1506905925346-21bda4d32df4&title=Adventure%20Awaits

# Marketing banner  
?image=https://images.unsplash.com/photo-1557804506-669a67965ba0&title=Black%20Friday%20Sale

# Event banner
?image=https://images.unsplash.com/photo-1492684223066-81342ee5ff30&title=Conference%202024
```

## Development

1. Install dependencies:
```bash
npm install
```

2. Run development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Deployment

This project is optimized for Vercel deployment. Simply connect your GitHub repository to Vercel for automatic deployments.