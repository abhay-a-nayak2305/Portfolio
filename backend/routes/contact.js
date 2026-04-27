import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import Contact from '../models/Contact.js';
import { protect } from '../middleware/auth.js';

const app = new Hono();

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name too long'),
  email: z.string().email('Invalid email'),
  subject: z.string().min(1, 'Subject is required').max(200, 'Subject too long'),
  message: z.string().min(1, 'Message is required').max(2000, 'Message too long'),
  website: z.string().optional()
});

// POST new contact message
app.post('/', zValidator('json', contactSchema, (result, c) => {
  if (!result.success) {
    return c.json({ errors: result.error.issues.map(i => i.message) }, 400);
  }
}), async (c) => {
  try {
    const { name, email, subject, message, website } = await c.req.json();

    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    const recentMessages = await Contact.countDocuments({
      email,
      createdAt: { $gte: oneHourAgo }
    });

    if (recentMessages >= 3) {
      return c.json({
        message: 'Too many messages from this email. Please try again later.'
      }, 429);
    }

    const ip = c.req.header('cf-connecting-ip') || c.req.header('x-forwarded-for') || 'unknown';
    const userAgent = c.req.header('User-Agent');

    const contact = new Contact({
      name, email, subject, message, website, ip, userAgent
    });

    await contact.save();

    return c.json({
      message: 'Message sent successfully',
      contact: {
        id: contact._id,
        name: contact.name,
        email: contact.email,
        subject: contact.subject,
        createdAt: contact.createdAt
      }
    }, 201);
  } catch (error) {
    console.error('Contact form error:', error);
    return c.json({ message: 'Failed to send message' }, 500);
  }
});

// GET all messages (admin endpoint)
app.get('/', protect, async (c) => {
  try {
    const page = parseInt(c.req.query('page') || '1');
    const limit = parseInt(c.req.query('limit') || '20');
    const unreadOnly = c.req.query('unreadOnly');

    const filter = {};
    if (unreadOnly === 'true') {
      filter.read = false;
    }

    const contacts = await Contact.find(filter)
      .sort('-createdAt')
      .limit(limit)
      .skip((page - 1) * limit)
      .lean();

    const total = await Contact.countDocuments(filter);

    return c.json({
      contacts,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    return c.json({ message: error.message }, 500);
  }
});

// PATCH mark as read
app.patch('/:id/read', protect, async (c) => {
  try {
    const contact = await Contact.findById(c.req.param('id'));
    if (!contact) {
      return c.json({ message: 'Contact not found' }, 404);
    }

    contact.read = true;
    await contact.save();

    return c.json({ message: 'Marked as read', contact });
  } catch (error) {
    return c.json({ message: error.message }, 500);
  }
});

export default app;
