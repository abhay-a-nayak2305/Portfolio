import { Hono } from 'hono';
import { ObjectId } from 'mongodb';

const app = new Hono();

// GET all skills
app.get('/', async (c) => {
  try {
    const db = c.get('db');
    const category = c.req.query('category');
    const featured = c.req.query('featured');

    const filter = {};
    if (category) filter.category = category;
    if (featured === 'true') filter.featured = true;

    const skills = await db.collection('skills')
      .find(filter)
      .sort({ featured: -1, order: 1, level: -1 })
      .toArray();

    return c.json(skills);
  } catch (error) {
    throw error;
  }
});

// GET skills grouped by category
app.get('/grouped', async (c) => {
  try {
    const db = c.get('db');
    const skills = await db.collection('skills')
      .find()
      .sort({ category: 1, order: 1, level: -1 })
      .toArray();

    const grouped = skills.reduce((acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill);
      return acc;
    }, {});

    return c.json(grouped);
  } catch (error) {
    throw error;
  }
});

// GET single skill by ID
app.get('/:id', async (c) => {
  try {
    const db = c.get('db');
    const id = c.req.param('id');
    
    let query = {};
    try {
      query = { _id: new ObjectId(id) };
    } catch (e) {
      // If not a valid ObjectId, try searching by name or just return 404
      return c.json({ message: 'Invalid ID format' }, 400);
    }

    const skill = await db.collection('skills').findOne(query);
    if (!skill) {
      return c.json({ message: 'Skill not found' }, 404);
    }
    return c.json(skill);
  } catch (error) {
    throw error;
  }
});

export default app;
