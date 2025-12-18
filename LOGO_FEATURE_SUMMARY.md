# Logo Feature Implementation - Summary

## Overview
Added logo overlay functionality to all major overlay API endpoints, allowing users to add custom logos to their banner images through URL parameters.

## Changes Made

### 1. Created Resources Folder
- **Location**: `public/resources/`
- **Purpose**: Store logo image files that can be referenced by filename in API calls
- **Documentation**: Added README.md with usage instructions

### 2. Modified Files
The following overlay API files were updated with logo functionality:

1. **pages/api/overlay.js** - Main overlay endpoint
2. **pages/api/overlayT.js** - Overlay with vertical line and left-aligned title
3. **pages/api/overlayN.js** - Overlay with breaking news label
4. **pages/api/overlayO.js** - Overlay with bordered style
5. **pages/api/overlayM.js** - Overlay with horizontal lines

### 3. Implementation Details

#### URL Parameters Added
- **`logo`** (string): Filename of the logo in the `public/resources/` folder
  - Example: `logo.png`, `company-brand.jpg`
  
- **`logoPos`** (string): Position of the logo on the image
  - Options: `upper-left` (default), `upper-middle`, `upper-right`

#### Features
- **Automatic Sizing**: Logos are automatically resized to ~9% of image width (optimized for Facebook headline posts at 1200x628)
- **Aspect Ratio Preservation**: Original logo proportions are maintained during resize
- **Transparent Background Support**: PNG logos with transparency are properly handled
- **Multiple Format Support**: Supports PNG, JPG, JPEG, WebP, GIF

#### Technical Implementation
Each modified file includes:

1. **Parameter Parsing** (around line 2200-2300):
```javascript
const logoParam = rawParams.logo || '';
const logoPosParam = rawParams.logoPos || 'upper-left';
```

2. **Logo Loading & Processing**:
- Reads logo from `public/resources/{filename}`
- Uses Sharp to get dimensions and resize
- Converts to base64 for SVG embedding
- Calculates appropriate size (9% of image width)
- Maintains aspect ratio

3. **SVG Rendering** (around line 3250-3350):
- Logo rendered as SVG `<image>` element
- Position calculated based on `logoPos` parameter
- Added after gradient background, before other overlay elements

## Usage Examples

### Basic Logo (Upper-Left)
```
/api/overlay?image=https://example.com/image.jpg&title=Breaking%20News&logo=logo.png
```

### Logo at Top Center
```
/api/overlayT?image=https://example.com/image.jpg&title=Latest%20Update&logo=brand.png&logoPos=upper-middle
```

### Logo at Top Right
```
/api/overlayN?image=https://example.com/image.jpg&title=Tech%20News&logo=company-logo.png&logoPos=upper-right
```

### Combined with Other Parameters
```
/api/overlay?image=https://example.com/image.jpg
  &title=Important%20Announcement
  &website=MyCompany.com
  &design=antonBlack
  &logo=watermark.png
  &logoPos=upper-right
  &w=1200
  &h=628
```

## Logo Positioning Logic

The logo position is calculated as follows:

- **upper-left**: `x = 20px`, `y = 20px` (padding from edges)
- **upper-middle**: `x = (imageWidth - logoWidth) / 2`, `y = 20px` (centered horizontally)
- **upper-right**: `x = imageWidth - logoWidth - 20px`, `y = 20px` (right-aligned)

## Size Calculation

```javascript
maxLogoWidth = imageWidth * 0.09  // 9% of image width
logoHeight = maxLogoWidth / aspectRatio  // Preserve aspect ratio
```

For a 1200px wide image:
- Max logo width: 108px
- Height calculated based on original aspect ratio

## File Structure

```
public/
  └── resources/
      ├── README.md          # Documentation for logo usage
      ├── .gitkeep           # Placeholder file
      └── [your-logo].png    # Your logo files go here
```

## Testing

To test the logo feature:

1. Place a logo file (e.g., `test-logo.png`) in `public/resources/`
2. Call any overlay endpoint with logo parameters:
   ```
   http://localhost:3000/api/overlay?logo=test-logo.png&logoPos=upper-middle
   ```
3. Verify logo appears at the specified position with appropriate size

## Best Practices

1. **Logo Format**: Use PNG with transparent background for best results
2. **Logo Resolution**: Provide high-resolution logos (at least 500x500px)
3. **File Size**: Keep logos under 500KB for optimal performance
4. **Naming**: Use descriptive filenames (e.g., `company-logo.png`, not `img1.png`)

## Error Handling

The implementation includes comprehensive error handling:
- Logs if logo file is not found
- Logs if logo loading fails
- Gracefully continues without logo if errors occur
- No impact on other overlay functionality if logo fails

## Backwards Compatibility

- All changes are **non-breaking**
- Logo parameters are optional
- Existing API calls work without modification
- If no logo parameters provided, overlays render as before

## Performance Impact

- Minimal: Logo loading and resizing happens server-side
- Base64 encoding keeps logo embedded in SVG
- No additional HTTP requests from client
- Sharp library handles image processing efficiently
