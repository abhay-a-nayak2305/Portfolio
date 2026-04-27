import { Hono } from 'hono';
import jwt from 'jsonwebtoken';

const app = new Hono();

// @desc    Auth admin & get token
// @route   POST /api/auth/login
// @access  Public
app.post('/login', async (c) => {
  const { email, password } = await c.req.json();

  const adminEmail = c.env?.ADMIN_EMAIL || process.env.ADMIN_EMAIL;
  const adminPassword = c.env?.ADMIN_PASSWORD || process.env.ADMIN_PASSWORD;
  const jwtSecret = c.env?.JWT_SECRET || process.env.JWT_SECRET;

  if (email === adminEmail && password === adminPassword) {
    return c.json({
      email: adminEmail,
      token: jwt.sign({ email: adminEmail }, jwtSecret, {
        expiresIn: '30d',
      }),
    });
  } else {
    return c.json({ message: 'Invalid email or password' }, 401);
  }
});

export default app;
