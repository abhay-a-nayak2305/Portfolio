import express from 'express';
import SiteVisit from '../models/SiteVisit.js';
import { protect } from '../middleware/auth.js';
const router = express.Router();

// POST track visit
router.post('/', async (req, res) => {
  try {
    const { ip, userAgent, url, referrer, country, region, city, deviceType, sessionId } = req.body;

    const visit = new SiteVisit({
      ip,
      userAgent,
      url: url || '/',
      referrer,
      country,
      region,
      city,
      deviceType: deviceType || 'unknown',
      sessionId: sessionId || crypto.randomUUID()
    });

    await visit.save();

    res.status(201).json({ message: 'Visit tracked' });
  } catch (error) {
    // Don't fail the request if tracking fails
    res.status(201).json({ message: 'Visit tracked' });
  }
});

// GET simple analytics (last 7 days)
router.get('/stats/simple', protect, async (req, res) => {
  try {
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    const [
      totalVisits,
      uniqueVisitors,
      popularPages,
      deviceStats,
      countryStats
    ] = await Promise.all([
      SiteVisit.countDocuments({ createdAt: { $gte: sevenDaysAgo } }),
      SiteVisit.distinct('ip', { createdAt: { $gte: sevenDaysAgo } }).then(ips => ips.length),
      SiteVisit.aggregate([
        { $match: { createdAt: { $gte: sevenDaysAgo } } },
        { $group: { _id: '$url', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 10 }
      ]),
      SiteVisit.aggregate([
        { $match: { createdAt: { $gte: sevenDaysAgo } } },
        { $group: { _id: '$deviceType', count: { $sum: 1 } } }
      ]),
      SiteVisit.aggregate([
        { $match: { createdAt: { $gte: sevenDaysAgo }, country: { $ne: null } } },
        { $group: { _id: '$country', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 5 }
      ])
    ]);

    res.json({
      period: '7d',
      totalVisits,
      uniqueVisitors,
      popularPages,
      deviceStats,
      countryStats,
      generatedAt: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
