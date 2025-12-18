# Resources Folder - Logo Images

This folder contains logo images that can be overlaid on banner images.

## Usage

To add a logo to your overlay banner, use the following URL parameters:

### Parameters

- **`logo`** - The filename of the logo image in this folder (e.g., `logo.png`, `brand-logo.jpg`)
- **`logoPos`** - Position of the logo on the image. Options:
  - `upper-left` (default) - Top left corner
  - `upper-middle` - Top center
  - `upper-right` - Top right corner

### Example Usage

```
/api/overlay?image=...&title=...&logo=mylogo.png&logoPos=upper-right
/api/overlayT?image=...&title=...&logo=brand.png&logoPos=upper-middle
/api/overlayN?image=...&title=...&logo=company-logo.png&logoPos=upper-left
```

## Logo Size

Logos are automatically resized to approximately **9% of the image width** to ensure proper visibility for Facebook image headline posts (recommended size: 1200x628).

The aspect ratio of your logo is preserved during resizing.

## Supported Files

You can place any of the following image formats in this folder:
- PNG (recommended for transparency)
- JPG/JPEG
- WebP
- GIF

## Supported Overlay Files

Logo functionality is available in the following API endpoints:
- `/api/overlay.js`
- `/api/overlayT.js`
- `/api/overlayN.js`
- `/api/overlayO.js`
- `/api/overlayM.js`

## Example Logos

Place your logo files in this directory. For best results:
- Use PNG format with transparent background
- Ensure high resolution (at least 500x500 pixels)
- Keep file sizes reasonable (< 500KB)
