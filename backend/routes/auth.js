import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const router = express.Router();

// @desc    Auth admin & get token
// @route   POST /api/auth/login
// @access  Public
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  // Simple check against env variables
  // In a real app, you'd use a database and hashed passwords
  if (email === adminEmail && password === adminPassword) {
    res.json({
      email: adminEmail,
      token: jwt.sign({ email: adminEmail }, process.env.JWT_SECRET, {
        expiresIn: '30d',
      }),
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
});

export default router;
