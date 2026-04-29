import { Hono } from 'hono';

const app = new Hono();

// GET all published projects
app.get('/', async (c) => {
  try {
    const db = c.get('db');
    const page = parseInt(c.req.query('page') || '1');
    const limit = parseInt(c.req.query('limit') || '10');
    const category = c.req.query('category');
    const featured = c.req.query('featured');
    const sortStr = c.req.query('sort') || '-createdAt';

    const filter = { isPublished: true };
    if (category) filter.category = category;
    if (featured === 'true') filter.featured = true;

    // Convert Mongoose-style sort (-createdAt) to Native Driver style
    const sort = {};
    if (sortStr.startsWith('-')) {
      sort[sortStr.substring(1)] = -1;
    } else {
      sort[sortStr] = 1;
    }

    const projects = await db.collection('projects')
      .find(filter)
      .sort(sort)
      .limit(limit)
      .skip((page - 1) * limit)
      .toArray();

    const total = await db.collection('projects').countDocuments(filter);

    return c.json({
      projects,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    throw error;
  }
});

// GET featured projects
app.get('/featured/list', async (c) => {
  try {
    const db = c.get('db');
    const projects = await db.collection('projects')
      .find({ featured: true, isPublished: true })
      .sort({ createdAt: -1 })
      .limit(6)
      .toArray();

    return c.json(projects);
  } catch (error) {
    throw error;
  }
});

// GET project categories
app.get('/meta/categories', async (c) => {
  try {
    const db = c.get('db');
    const categories = await db.collection('projects').distinct('category', { isPublished: true });
    return c.json(categories);
  } catch (error) {
    throw error;
  }
});

// GET single project by slug
app.get('/:slug', async (c) => {
  try {
    const db = c.get('db');
    const slug = c.req.param('slug');
    
    const project = await db.collection('projects').findOne({
      slug: slug,
      isPublished: true
    });

    if (!project) {
      return c.json({ message: 'Project not found' }, 404);
    }

    // Increment views
    await db.collection('projects').updateOne(
      { _id: project._id },
      { $inc: { views: 1 } }
    );

    return c.json(project);
  } catch (error) {
    throw error;
  }
});

export default app;
