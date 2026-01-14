const rateLimit = require('express-rate-limit');

// Granular Rate Limiters
const chatLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 5, // limit to 5 requests per windowMs
    message: { success: false, message: 'Too many chat requests, please try again later.' }
});

const pdfLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 3, // limit to 3 PDF generations per windowMs
    message: { success: false, message: 'Too many PDF generation requests, please try again later.' }
});

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    standardHeaders: true,
    legacyHeaders: false,
});

// Input Sanitization Utility
const sanitizeInput = (input) => {
    if (typeof input !== 'string') return input;
    // Remove potentially dangerous characters and SQL injection patterns
    return input.replace(/['";\\]/g, '').replace(/--/g, '').trim();
};

// Resource Ownership Middleware
// Assumes req.user is populated by auth middleware and params.id exists
const verifyOwnership = (tableName, idParamName = 'id', ownerColName = 'user_id') => {
    return async (req, res, next) => {
        try {
            const db = req.app.get('db'); // Access db from app settings or import it
            const userId = req.user?.id;
            const resourceId = req.params[idParamName];

            if (!userId) {
                return res.status(401).json({ success: false, message: 'Unauthorized' });
            }

            const [rows] = await db.execute(
                `SELECT ${ownerColName} FROM ${tableName} WHERE id = ?`,
                [resourceId]
            );

            if (rows.length === 0) {
                return res.status(404).json({ success: false, message: 'Resource not found' });
            }

            if (rows[0][ownerColName] !== userId && req.user.role !== 'admin') {
                return res.status(403).json({ success: false, message: 'Forbidden: You do not own this resource' });
            }

            next();
        } catch (error) {
            console.error('Ownership verification error:', error);
            res.status(500).json({ success: false, message: 'Server error during authorization' });
        }
    };
};

module.exports = {
    chatLimiter,
    pdfLimiter,
    apiLimiter,
    sanitizeInput,
    verifyOwnership
};
