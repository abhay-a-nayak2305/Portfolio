import mongoose from 'mongoose';

const ArticleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: 200
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  excerpt: {
    type: String,
    required: true,
    maxlength: 300
  },
  content: {
    type: String,
    required: true
  },
  coverImage: {
    type: String
  },
  tags: [{
    type: String,
    trim: true
  }],
  category: {
    type: String,
    enum: ['tutorial', 'thoughts', 'tech-deep-dive', 'career', 'project-update'],
    default: 'thoughts'
  },
  published: {
    type: Boolean,
    default: false
  },
  featured: {
    type: Boolean,
    default: false
  },
  readingTime: {
    type: Number, // minutes
    min: 1
  },
  views: {
    type: Number,
    default: 0
  },
  author: {
    name: String,
    avatar: String,
    bio: String
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Auto-generate slug from title
ArticleSchema.pre('save', function(next) {
  if (this.isModified('title') || !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

// Index for search
ArticleSchema.index({ title: 'text', content: 'text', tags: 'text' });
ArticleSchema.index({ published: 1, createdAt: -1 });

export default mongoose.models.Article || mongoose.model('Article', ArticleSchema);
