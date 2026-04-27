console.log('Server starting...');
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import dotenv from 'dotenv';
// Routes
import projectRoutes from './routes/projects.js';
import skillRoutes from './routes/skills.js';
import contactRoutes from './routes/contact.js';
import analyticsRoutes from './routes/analytics.js';
import articleRoutes from './routes/articles.js';
import authRoutes from './routes/auth.js';

// Middleware
import { apiLimiter, contactLimiter, errorHandler } from './middleware/error.js';
import { protect } from './middleware/auth.js';

// Database
import connectDB from './config/db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to database
connectDB();

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://cdn.tailwindcss.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      scriptSrc: ["'self'", "https://cdn.tailwindcss.com"],
      imgSrc: ["'self'", "data:", "https:", "blob:"],
    },
  },
}));

// CORS
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));

// Compression
app.use(compression());

// Body parser
app.use(express.json({ limit: '10mb' }));

// Logging (only in dev)
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Rate limiting
app.use('/api/', apiLimiter);
app.use('/api/contact', contactLimiter);

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/articles', articleRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  const path = await import('path');
  app.use(express.static(path.join(process.cwd(), 'frontend/dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'frontend/dist', 'index.html'));
  });
}

// Error handling
app.use(errorHandler);

// Start server
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`API: http://localhost:${PORT}/api`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error(err);
  server.close(() => process.exit(1));
});

export default app;
