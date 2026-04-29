console.log('Server starting...');
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { secureHeaders } from 'hono/secure-headers';
import { logger } from 'hono/logger';

// Load dotenv only in Node.js (local dev)
if (typeof process !== 'undefined' && process.env && !process.env.CF_PAGES) {
  try {
    const { config } = await import('dotenv');
    config();
  } catch (e) {
    // dotenv might not be available in all environments
  }
}

// Routes
import projectRoutes from './routes/projects.js';
import contactRoutes from './routes/contact.js';
import analyticsRoutes from './routes/analytics.js';
import articleRoutes from './routes/articles.js';
import authRoutes from './routes/auth.js';

// Middleware
import { errorHandler } from './middleware/error.js';

// Database
import connectDB from './config/db.js';

// In Node environment, use serve to run locally
import { serve } from '@hono/node-server';

const app = new Hono();

// 1. Bulletproof CORS (Must be absolutely first)
app.use('*', async (c, next) => {
  const origin = c.req.header('origin') || '*';
  c.header('Access-Control-Allow-Origin', origin);
  c.header('Access-Control-Allow-Credentials', 'true');
  c.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
  c.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept');
  
  if (c.req.method === 'OPTIONS') {
    return c.text('', 204);
  }
  await next();
});

// 2. Global Cache & Logger
app.use('*', logger());
app.use('*', async (c, next) => {
  await next();
  // Cache GET requests for 5 minutes in Cloudflare/Browser
  if (c.req.method === 'GET' && c.res.status === 200 && c.req.path.includes('/api/')) {
    c.res.headers.set('Cache-Control', 'public, max-age=300, s-maxage=300');
  }
});
// app.use('*', secureHeaders({
//   contentSecurityPolicy: {
//     defaultSrc: ["'self'"],
//     styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://cdn.tailwindcss.com"],
//     fontSrc: ["'self'", "https://fonts.gstatic.com"],
//     scriptSrc: ["'self'", "https://cdn.tailwindcss.com"],
//     imgSrc: ["'self'", "data:", "https:", "blob:"],
//   }
// }));

// 4. Database connection middleware (serverless pattern)
app.use('*', async (c, next) => {
  try {
    const db = await connectDB(c.env);
    if (!db) throw new Error('Database connection failed');
    c.set('db', db);
    await next();
  } catch (error) {
    console.error('DB Middleware Error:', error.message);
    // Directly return the error response with CORS headers if DB fails
    const origin = c.req.header('origin') || '*';
    return c.json({ 
      message: 'Database connection failed. Please try again.',
      error: error.message 
    }, 500, {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Credentials': 'true'
    });
  }
});


// Health check
app.get('/api/health', (c) => {
  return c.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    environment: c.env?.NODE_ENV || process.env.NODE_ENV || 'development'
  });
});

// Register Routes
app.route('/api/projects', projectRoutes);
app.route('/api/contact', contactRoutes);
app.route('/api/analytics', analyticsRoutes);
app.route('/api/articles', articleRoutes);
app.route('/api/auth', authRoutes);

// Error handling
app.onError(errorHandler);

// If running in development or outside Cloudflare, start the node-server
if (process.env.NODE_ENV !== 'production' && typeof process !== 'undefined' && process.release?.name === 'node') {
  const PORT = process.env.PORT || 5000;
  
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`API: http://localhost:${PORT}/api`);
  
  serve({
    fetch: app.fetch,
    port: PORT
  });
}

// Export for Cloudflare Workers
export default app;

