import { Hono } from 'hono';
import Skill from '../models/Skill.js';

const app = new Hono();

// GET all skills
app.get('/', async (c) => {
  try {
    const category = c.req.query('category');
    const featured = c.req.query('featured');

    const filter = {};
    if (category) filter.category = category;
    if (featured === 'true') filter.featured = true;

    const skills = await Skill.find(filter)
      .sort({ featured: -1, order: 1, level: -1 })
      .lean();

    return c.json(skills);
  } catch (error) {
    return c.json({ message: error.message }, 500);
  }
});

// GET skills grouped by category
app.get('/grouped', async (c) => {
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

    return c.json(grouped);
  } catch (error) {
    return c.json({ message: error.message }, 500);
  }
});

// GET single skill by ID
app.get('/:id', async (c) => {
  try {
    const skill = await Skill.findById(c.req.param('id'));
    if (!skill) {
      return c.json({ message: 'Skill not found' }, 404);
    }
    return c.json(skill);
  } catch (error) {
    return c.json({ message: error.message }, 500);
  }
});

export default app;
