import mongoose from 'mongoose';

const SiteVisitSchema = new mongoose.Schema({
  ip: {
    type: String,
    sparse: true
  },
  userAgent: String,
  url: {
    type: String,
    default: '/'
  },
  referrer: String,
  country: String,
  region: String,
  city: String,
  deviceType: {
    type: String,
    enum: ['desktop', 'tablet', 'mobile', 'unknown']
  },
  sessionId: {
    type: String
  }
}, {
  timestamps: true
});

SiteVisitSchema.index({ createdAt: -1 });
SiteVisitSchema.index({ sessionId: 1 });

export default mongoose.models.SiteVisit || mongoose.model('SiteVisit', SiteVisitSchema);
