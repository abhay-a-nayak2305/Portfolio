import { Hono } from 'hono';
import Project from '../models/Project.js';

const app = new Hono();

// GET all published projects
app.get('/', async (c) => {
  try {
    const page = parseInt(c.req.query('page') || '1');
    const limit = parseInt(c.req.query('limit') || '10');
    const category = c.req.query('category');
    const featured = c.req.query('featured');
    const sort = c.req.query('sort') || '-createdAt';

    const filter = { isPublished: true };

    if (category) filter.category = category;
    if (featured === 'true') filter.featured = true;

    const projects = await Project.find(filter)
      .sort(sort)
      .limit(limit)
      .skip((page - 1) * limit)
      .lean();

    const total = await Project.countDocuments(filter);

    return c.json({
      projects,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    return c.json({ message: error.message }, 500);
  }
});

// GET featured projects
app.get('/featured/list', async (c) => {
  try {
    const projects = await Project.find({
      featured: true,
      isPublished: true
    }).sort('-createdAt').limit(6).lean();

    return c.json(projects);
  } catch (error) {
    return c.json({ message: error.message }, 500);
  }
});

// GET project categories
app.get('/meta/categories', async (c) => {
  try {
    const categories = await Project.distinct('category', { isPublished: true });
    return c.json(categories);
  } catch (error) {
    return c.json({ message: error.message }, 500);
  }
});

// GET single project by slug
app.get('/:slug', async (c) => {
  try {
    const project = await Project.findOne({
      slug: c.req.param('slug'),
      isPublished: true
    });

    if (!project) {
      return c.json({ message: 'Project not found' }, 404);
    }

    // Increment views
    project.views += 1;
    await project.save();

    return c.json(project);
  } catch (error) {
    return c.json({ message: error.message }, 500);
  }
});

export default app;
