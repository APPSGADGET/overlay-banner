import fs from 'fs';
import path from 'path';

// Force Node.js runtime
export const runtime = 'nodejs';

export default async function handler(req, res) {
  console.log('\n🎨 === RANDOM BACKGROUND IMAGE GENERATOR ===');
  console.log('Method:', req.method);
  
  try {
    // Path to backgrounds directory
    const backgroundsDir = path.join(process.cwd(), 'public', 'resources', 'hbackgrounds');
    
    console.log('📁 Reading backgrounds from:', backgroundsDir);
    
    // Check if directory exists
    if (!fs.existsSync(backgroundsDir)) {
      console.error('❌ Backgrounds directory not found:', backgroundsDir);
      return res.status(404).json({
        error: 'Backgrounds directory not found',
        path: backgroundsDir
      });
    }
    
    // Read all files from the directory
    const files = fs.readdirSync(backgroundsDir);
    
    // Filter only image files (jpg, jpeg, png, webp)
    const imageFiles = files.filter(file => 
      /\.(jpg|jpeg|png|webp)$/i.test(file)
    );
    
    console.log('🖼️ Found', imageFiles.length, 'images');
    
    if (imageFiles.length === 0) {
      console.error('❌ No image files found in directory');
      return res.status(404).json({
        error: 'No images found',
        directory: backgroundsDir
      });
    }
    
    // Select a random image
    const randomIndex = Math.floor(Math.random() * imageFiles.length);
    const randomImage = imageFiles[randomIndex];
    const imagePath = path.join(backgroundsDir, randomImage);
    
    console.log('✅ Selected random image:', randomImage);
    
    // Read the image file
    const imageBuffer = fs.readFileSync(imagePath);
    
    // Determine content type based on file extension
    const ext = path.extname(randomImage).toLowerCase();
    const contentType = {
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.png': 'image/png',
      '.webp': 'image/webp'
    }[ext] || 'image/jpeg';
    
    console.log('📤 Sending image:', randomImage, '(' + imageBuffer.length, 'bytes)');
    
    // Set response headers
    res.setHeader('Content-Type', contentType);
    res.setHeader('Content-Disposition', `inline; filename="${randomImage}"`);
    res.setHeader('Content-Length', String(imageBuffer.length));
    res.setHeader('Cache-Control', 'public, max-age=300');
    res.setHeader('X-Random-Image', randomImage);
    
    // Send the image
    res.send(imageBuffer);
    
  } catch (error) {
    console.error('❌ Random background generation failed:', error);
    
    res.status(500).json({
      error: 'Random background generation failed',
      message: error.message
    });
  }
}