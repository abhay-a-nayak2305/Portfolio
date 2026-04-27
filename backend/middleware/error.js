// Rate limiting is best handled by Cloudflare Rate Limiting rules in production on Workers.
// We provide dummy middlewares here to satisfy the route definitions.
export const apiLimiter = async (c, next) => await next();
export const contactLimiter = async (c, next) => await next();

// Error handler middleware (Hono onError)
export const errorHandler = (err, c) => {
  console.error(err.stack);

  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(e => e.message);
    return c.json({ errors }, 400);
  }

  if (err.code === 11000) {
    return c.json({
      message: 'Duplicate field value',
      field: Object.keys(err.keyPattern)[0]
    }, 409);
  }

  const isProd = (c.env?.NODE_ENV || process.env.NODE_ENV) === 'production';
  return c.json({
    message: isProd ? 'Server error' : err.message
  }, 500);
};
