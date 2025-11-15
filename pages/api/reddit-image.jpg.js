// JPEG-specific route for reddit-image
// This route explicitly indicates it returns a JPEG image
// Usage: /api/reddit-image.jpg?url=...&title=...&website=...

import handler from './reddit-image.js';

// Re-export the same handler with explicit JPEG route
export default handler;
export const runtime = 'nodejs';
