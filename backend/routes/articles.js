import { Hono } from 'hono';
import Article from '../models/Article.js';

const app = new Hono();

// GET all published articles
app.get('/', async (c) => {
  try {
    const page = parseInt(c.req.query('page') || '1');
    const limit = parseInt(c.req.query('limit') || '10');
    const category = c.req.query('category');
    const featured = c.req.query('featured');
    const tag = c.req.query('tag');

    const filter = { published: true };

    if (category) filter.category = category;
    if (featured === 'true') filter.featured = true;
    if (tag) filter.tags = tag;

    const articles = await Article.find(filter)
      .sort('-publishedAt')
      .limit(limit)
      .skip((page - 1) * limit)
      .lean();

    const total = await Article.countDocuments(filter);

    return c.json({
      articles,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    return c.json({ message: error.message }, 500);
  }
});

// GET categories
app.get('/meta/categories', async (c) => {
  try {
    const categories = await Article.distinct('category', { published: true });
    return c.json(categories);
  } catch (error) {
    return c.json({ message: error.message }, 500);
  }
});

// GET tags
app.get('/meta/tags', async (c) => {
  try {
    const tags = await Article.aggregate([
      { $match: { published: true } },
      { $unwind: '$tags' },
      { $group: { _id: '$tags', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 20 }
    ]);
    return c.json(tags);
  } catch (error) {
    return c.json({ message: error.message }, 500);
  }
});

// GET single article by slug
app.get('/:slug', async (c) => {
  try {
    const article = await Article.findOne({
      slug: c.req.param('slug'),
      published: true
    });

    if (!article) {
      return c.json({ message: 'Article not found' }, 404);
    }

    // Increment views
    article.views += 1;
    await article.save();

    return c.json(article);
  } catch (error) {
    return c.json({ message: error.message }, 500);
  }
});

export default app;
