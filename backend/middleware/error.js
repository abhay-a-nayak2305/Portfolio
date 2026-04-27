import rateLimit from 'express-rate-limit';

// Rate limiter for API
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Rate limiter for contact form (stricter)
export const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // limit each IP to 5 messages per hour
  message: 'Too many messages from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Error handler middleware
export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(e => e.message);
    return res.status(400).json({ errors });
  }

  if (err.code === 11000) {
    return res.status(409).json({
      message: 'Duplicate field value',
      field: Object.keys(err.keyPattern)[0]
    });
  }

  res.status(500).json({
    message: process.env.NODE_ENV === 'production' ? 'Server error' : err.message
  });
};
