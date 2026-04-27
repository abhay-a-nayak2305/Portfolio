import express from 'express';
import Project from '../models/Project.js';
import { body, query } from 'express-validator';
const router = express.Router();

// GET all published projects
router.get('/', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      category,
      featured,
      sort = '-createdAt'
    } = req.query;

    const filter = { isPublished: true };

    if (category) filter.category = category;
    if (featured === 'true') filter.featured = true;

    const projects = await Project.find(filter)
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .lean();

    const total = await Project.countDocuments(filter);

    res.json({
      projects,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single project by slug
router.get('/:slug', async (req, res) => {
  try {
    const project = await Project.findOne({
      slug: req.params.slug,
      isPublished: true
    });

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Increment views
    project.views += 1;
    await project.save();

    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET featured projects
router.get('/featured/list', async (req, res) => {
  try {
    const projects = await Project.find({
      featured: true,
      isPublished: true
    }).sort('-createdAt').limit(6).lean();

    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET project categories
router.get('/meta/categories', async (req, res) => {
  try {
    const categories = await Project.distinct('category', { isPublished: true });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
