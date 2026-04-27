import jwt from 'jsonwebtoken';

export const protect = async (c, next) => {
  let token;
  const authHeader = c.req.header('Authorization');

  if (authHeader && authHeader.startsWith('Bearer')) {
    try {
      token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, c.env?.JWT_SECRET || process.env.JWT_SECRET);
      c.set('admin', decoded);
      await next();
      return;
    } catch (error) {
      console.error('Auth error:', error);
      return c.json({ message: 'Not authorized, token failed' }, 401);
    }
  }

  if (!token) {
    return c.json({ message: 'Not authorized, no token' }, 401);
  }
};
