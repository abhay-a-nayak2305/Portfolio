import express from 'express';
import Article from '../models/Article.js';
const router = express.Router();

// GET all published articles
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, category, featured, tag } = req.query;

    const filter = { published: true };

    if (category) filter.category = category;
    if (featured === 'true') filter.featured = true;
    if (tag) filter.tags = tag;

    const articles = await Article.find(filter)
      .sort('-publishedAt')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .lean();

    const total = await Article.countDocuments(filter);

    res.json({
      articles,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single article by slug
router.get('/:slug', async (req, res) => {
  try {
    const article = await Article.findOne({
      slug: req.params.slug,
      published: true
    });

    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    // Increment views
    article.views += 1;
    await article.save();

    res.json(article);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET categories
router.get('/meta/categories', async (req, res) => {
  try {
    const categories = await Article.distinct('category', { published: true });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET tags
router.get('/meta/tags', async (req, res) => {
  try {
    const tags = await Article.aggregate([
      { $match: { published: true } },
      { $unwind: '$tags' },
      { $group: { _id: '$tags', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 20 }
    ]);
    res.json(tags);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
