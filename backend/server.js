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
import skillRoutes from './routes/skills.js';
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

// 1. CORS - MUST BE FIRST to handle OPTIONS and ensure headers are on all responses
app.use('*', cors({
  origin: (origin, c) => {
    const clientUrl = c.env?.CLIENT_URL || process.env.CLIENT_URL || 'https://abhay-portfolio.smartgadgetfinds23.workers.dev';
    if (!origin || origin === clientUrl || origin.endsWith('.pages.dev') || origin.endsWith('.workers.dev') || origin.includes('localhost')) {
      return origin || clientUrl;
    }
    return clientUrl;
  },
  credentials: true,
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  exposeHeaders: ['Content-Length', 'X-Kuma-Revision'],
  maxAge: 600,
}));

// 2. Other Global middleware
app.use('*', logger());
app.use('*', secureHeaders({
  contentSecurityPolicy: {
    defaultSrc: ["'self'"],
    styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://cdn.tailwindcss.com"],
    fontSrc: ["'self'", "https://fonts.gstatic.com"],
    scriptSrc: ["'self'", "https://cdn.tailwindcss.com"],
    imgSrc: ["'self'", "data:", "https:", "blob:"],
  }
}));

// Database connection middleware (serverless pattern)
app.use('*', async (c, next) => {
  try {
    const db = await connectDB(c.env);
    c.set('db', db);
    await next();
  } catch (error) {
    console.error('Database connection failed:', error);
    // Throw error so it's caught by app.onError which handles CORS headers correctly
    throw error;
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
app.route('/api/skills', skillRoutes);
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

