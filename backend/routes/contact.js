import express from 'express';
import Contact from '../models/Contact.js';
import { body, validationResult } from 'express-validator';
import { protect } from '../middleware/auth.js';
const router = express.Router();

// POST new contact message
router.post('/', [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ max: 100 }).withMessage('Name too long'),
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email')
    .normalizeEmail(),
  body('subject')
    .trim()
    .notEmpty().withMessage('Subject is required')
    .isLength({ max: 200 }).withMessage('Subject too long'),
  body('message')
    .trim()
    .notEmpty().withMessage('Message is required')
    .isLength({ max: 2000 }).withMessage('Message too long')
], async (req, res) => {
  try {
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, subject, message, website } = req.body;

    // Check for spam (basic rate limiting - prevent same IP spamming)
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    const recentMessages = await Contact.countDocuments({
      email,
      createdAt: { $gte: oneHourAgo }
    });

    if (recentMessages >= 3) {
      return res.status(429).json({
        message: 'Too many messages from this email. Please try again later.'
      });
    }

    const contact = new Contact({
      name,
      email,
      subject,
      message,
      website,
      ip: req.ip || req.connection.remoteAddress,
      userAgent: req.get('User-Agent')
    });

    await contact.save();

    // Send email notification if configured
    // (Implementation would go here with nodemailer)

    res.status(201).json({
      message: 'Message sent successfully',
      contact: {
        id: contact._id,
        name: contact.name,
        email: contact.email,
        subject: contact.subject,
        createdAt: contact.createdAt
      }
    });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ message: 'Failed to send message' });
  }
});

// GET all messages (admin endpoint)
router.get('/', protect, async (req, res) => {
  try {
    const { page = 1, limit = 20, unreadOnly } = req.query;

    const filter = {};
    if (unreadOnly === 'true') {
      filter.read = false;
    }

    const contacts = await Contact.find(filter)
      .sort('-createdAt')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .lean();

    const total = await Contact.countDocuments(filter);

    res.json({
      contacts,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PATCH mark as read
router.patch('/:id/read', protect, async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    contact.read = true;
    await contact.save();

    res.json({ message: 'Marked as read', contact });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
