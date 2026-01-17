const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { authenticateToken, authenticateAdmin } = require('../middleware/auth');

// GET /api/analytics/charts
router.get('/charts', authenticateToken, authenticateAdmin, async (req, res) => {
    try {
        const connection = await pool.getConnection();
        try {
            // Monthly Website Visits (Page Views)
            const [visitStats] = await connection.execute(`
                 SELECT 
                    DATE_FORMAT(created_at, '%b') as name,
                    COUNT(*) as visits
                 FROM page_views
                 WHERE created_at >= DATE_SUB(NOW(), INTERVAL 6 MONTH)
                 GROUP BY DATE_FORMAT(created_at, '%Y-%m'), DATE_FORMAT(created_at, '%b')
                 ORDER BY DATE_FORMAT(created_at, '%Y-%m') ASC
            `);

            // Ensure we have at least some data structure even if empty
            // (Frontend will handle empty array)

            res.json({
                success: true,
                charts: {
                    visitsTrend: visitStats
                }
            });
        } finally {
            connection.release();
        }
    } catch (error) {
        console.error('Analytics charts error:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch chart data' });
    }
});

// POST /api/analytics/track (Public endpoint, no auth needed)
// Call this from frontend on page load or route change
router.post('/track', async (req, res) => {
    try {
        const { path, ua } = req.body;
        const ip = req.ip || req.connection.remoteAddress;

        await pool.execute(
            'INSERT INTO page_views (page_path, user_agent, ip_address) VALUES (?, ?, ?)',
            [path || '/', ua || '', ip]
        );

        res.json({ success: true });
    } catch (error) {
        // Fail silently to not block client
        console.error('Track error:', error);
        res.status(200).json({ success: false });
    }
});

module.exports = router;
