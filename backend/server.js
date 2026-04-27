console.log('Server starting...');
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { secureHeaders } from 'hono/secure-headers';
import { logger } from 'hono/logger';

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

// Global middleware
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

app.use('*', async (c, next) => {
  const clientUrl = c.env?.CLIENT_URL || process.env.CLIENT_URL || 'http://localhost:5173';
  return cors({
    origin: clientUrl,
    credentials: true,
  })(c, next);
});

// Database connection per request (serverless pattern)
app.use('*', async (c, next) => {
  await connectDB(c.env || process.env);
  await next();
});

// API Routes
app.route('/api/auth', authRoutes);
app.route('/api/projects', projectRoutes);
app.route('/api/skills', skillRoutes);
app.route('/api/contact', contactRoutes);
app.route('/api/analytics', analyticsRoutes);
app.route('/api/articles', articleRoutes);

// Health check
app.get('/api/health', (c) => {
  return c.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    environment: c.env?.NODE_ENV || process.env.NODE_ENV || 'development'
  });
});

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
