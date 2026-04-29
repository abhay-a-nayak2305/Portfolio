import { Hono } from 'hono';
import SiteVisit from '../models/SiteVisit.js';
import { protect } from '../middleware/auth.js';

const app = new Hono();

// POST track visit
app.post('/', async (c) => {
  try {
    const { ip, userAgent, url, referrer, country, region, city, deviceType, sessionId } = await c.req.json();

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

    return c.json({ message: 'Visit tracked' }, 201);
  } catch (error) {
    // Don't fail the request if tracking fails
    return c.json({ message: 'Visit tracked' }, 201);
  }
});

// GET simple analytics (last 7 days)
app.get('/stats/simple', protect, async (c) => {
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

    return c.json({
      period: '7d',
      totalVisits,
      uniqueVisitors,
      popularPages,
      deviceStats,
      countryStats,
      generatedAt: new Date().toISOString()
    });
  } catch (error) {
    throw error;
  }
});

export default app;
