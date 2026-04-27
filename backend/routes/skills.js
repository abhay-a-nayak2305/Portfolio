import express from 'express';
import Skill from '../models/Skill.js';
const router = express.Router();

// GET all skills
router.get('/', async (req, res) => {
  try {
    const { category, featured } = req.query;

    const filter = {};
    if (category) filter.category = category;
    if (featured === 'true') filter.featured = true;

    const skills = await Skill.find(filter)
      .sort({ featured: -1, order: 1, level: -1 })
      .lean();

    res.json(skills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET skills grouped by category
router.get('/grouped', async (req, res) => {
  try {
    const skills = await Skill.find()
      .sort({ category: 1, order: 1, level: -1 })
      .lean();

    const grouped = skills.reduce((acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill);
      return acc;
    }, {});

    res.json(grouped);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single skill by ID
router.get('/:id', async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }
    res.json(skill);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
