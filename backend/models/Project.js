import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: 100
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    maxlength: 500
  },
  longDescription: {
    type: String,
    maxlength: 5000
  },
  image: {
    type: String,
    required: true
  },
  images: [String],
  tags: [{
    type: String,
    trim: true
  }],
  category: {
    type: String,
    enum: ['fullstack', 'frontend', 'backend', 'mobile', 'devops', 'other'],
    default: 'fullstack'
  },
  featured: {
    type: Boolean,
    default: false
  },
  liveUrl: {
    type: String,
    trim: true
  },
  githubUrl: {
    type: String,
    trim: true
  },
  youtubeUrl: {
    type: String,
    trim: true
  },
  demoUrl: {
    type: String,
    trim: true
  },
  challenges: [{
    title: String,
    description: String
  }],
  solutions: [{
    title: String,
    description: String
  }],
  techStack: [{
    name: String,
    category: { type: String, enum: ['frontend', 'backend', 'database', 'devops', 'other'] }
  }],
  metrics: [{
    label: String,
    value: String
  }],
  timeline: {
    started: Date,
    completed: Date,
    duration: String
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    default: 0
  },
  views: {
    type: Number,
    default: 0
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Slug generation
ProjectSchema.pre('save', function(next) {
  if (!this.isModified('slug') && this.title) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

// Virtual for project URL
ProjectSchema.virtual('url').get(function() {
  return `/projects/${this.slug}`;
});

// Index for search
ProjectSchema.index({ title: 'text', description: 'text', tags: 'text' });

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema);
