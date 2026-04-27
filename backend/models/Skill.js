import mongoose from 'mongoose';

const SkillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Skill name is required'],
    trim: true,
    unique: true
  },
  category: {
    type: String,
    enum: [
      'frontend',
      'backend',
      'database',
      'devops',
      'mobile',
      'design',
      'other'
    ],
    required: true
  },
  level: {
    type: Number,
    min: 1,
    max: 10,
    default: 5
  },
  icon: {
    type: String
  },
  years: {
    type: Number,
    min: 0,
    max: 50
  },
  description: {
    type: String,
    maxlength: 200
  },
  color: {
    type: String,
    default: '#3B82F6'
  },
  featured: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

SkillSchema.index({ category: 1, order: 1 });
SkillSchema.index({ featured: 1 });

export default mongoose.models.Skill || mongoose.model('Skill', SkillSchema);
