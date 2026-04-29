import { Hono } from 'hono';

const app = new Hono();

// GET all published articles
app.get('/', async (c) => {
  try {
    const db = c.get('db');
    const page = parseInt(c.req.query('page') || '1');
    const limit = parseInt(c.req.query('limit') || '10');
    const category = c.req.query('category');
    const featured = c.req.query('featured');
    const tag = c.req.query('tag');

    const filter = { published: true };
    if (category) filter.category = category;
    if (featured === 'true') filter.featured = true;
    if (tag) filter.tags = tag;

    const articles = await db.collection('articles')
      .find(filter)
      .sort({ publishedAt: -1 })
      .limit(limit)
      .skip((page - 1) * limit)
      .toArray();

    const total = await db.collection('articles').countDocuments(filter);

    return c.json({
      articles,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    throw error;
  }
});

// GET categories
app.get('/meta/categories', async (c) => {
  try {
    const db = c.get('db');
    const categories = await db.collection('articles').distinct('category', { published: true });
    return c.json(categories);
  } catch (error) {
    throw error;
  }
});

// GET tags
app.get('/meta/tags', async (c) => {
  try {
    const db = c.get('db');
    const tags = await db.collection('articles').aggregate([
      { $match: { published: true } },
      { $unwind: '$tags' },
      { $group: { _id: '$tags', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 20 }
    ]).toArray();
    return c.json(tags);
  } catch (error) {
    throw error;
  }
});

// GET single article by slug
app.get('/:slug', async (c) => {
  try {
    const db = c.get('db');
    const slug = c.req.param('slug');
    const article = await db.collection('articles').findOne({
      slug: slug,
      published: true
    });

    if (!article) {
      return c.json({ message: 'Article not found' }, 404);
    }

    // Increment views
    await db.collection('articles').updateOne(
      { _id: article._id },
      { $inc: { views: 1 } }
    );

    return c.json(article);
  } catch (error) {
    throw error;
  }
});

export default app;
