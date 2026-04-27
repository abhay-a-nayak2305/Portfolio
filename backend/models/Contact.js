import mongoose from 'mongoose';

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: 100
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true
  },
  subject: {
    type: String,
    required: [true, 'Subject is required'],
    trim: true,
    maxlength: 200
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    maxlength: 2000
  },
  read: {
    type: Boolean,
    default: false
  },
  replied: {
    type: Boolean,
    default: false
  },
  ip: String,
  userAgent: String,
  website: String
}, {
  timestamps: true
});

ContactSchema.index({ createdAt: -1 });
ContactSchema.index({ read: 1 });

export default mongoose.models.Contact || mongoose.model('Contact', ContactSchema);
