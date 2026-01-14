const express = require('express');
const router = express.Router();
const pool = require('../config/database');

// GET /api/hotels - Get all hotels
router.get('/', async (req, res) => {
    try {
        const [hotels] = await pool.execute(`
            SELECT hotel_id, hotel_name, destination_id, type, address, latitude, longitude,
                   price_per_night_usd, room_types, meal_plans, amenities, image_urls
            FROM hotels
            ORDER BY hotel_name
        `);
        res.json(hotels);
    } catch (error) {
        console.error('Error fetching hotels:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
