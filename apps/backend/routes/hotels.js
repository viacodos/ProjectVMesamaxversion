const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { authenticateToken, authenticateAdmin } = require('../middleware/auth');
const { v4: uuidv4 } = require('uuid');

// GET /api/hotels - Get all hotels with photo count
router.get('/', async (req, res) => {
    try {
        const [hotels] = await pool.execute(`
            SELECT h.*, 
            (SELECT photo_url FROM hotel_photos WHERE hotel_id = h.hotel_id LIMIT 1) as first_gallery_image
            FROM hotels h
            ORDER BY h.hotel_name ASC
        `);

        // Parse JSON fields if needed, or keeping simple strings as requested
        // Schema uses TEXT for simplicity so no JSON.parse needed for basic fields usually

        res.json({ success: true, hotels });
    } catch (error) {
        console.error('Error fetching hotels:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});

// GET /api/hotels/:id - Get single hotel details with photos
router.get('/:id', async (req, res) => {
    try {
        const [hotels] = await pool.execute('SELECT * FROM hotels WHERE hotel_id = ?', [req.params.id]);

        if (hotels.length === 0) {
            return res.status(404).json({ success: false, error: 'Hotel not found' });
        }

        const hotel = hotels[0];

        // Fetch photos
        const [photos] = await pool.execute('SELECT photo_url FROM hotel_photos WHERE hotel_id = ?', [req.params.id]);
        hotel.gallery = photos.map(p => p.photo_url);

        res.json({ success: true, hotel });
    } catch (error) {
        console.error('Error fetching hotel details:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});

// POST /api/hotels - Create new hotel
router.post('/', authenticateToken, authenticateAdmin, async (req, res) => {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        const {
            hotel_name,
            website_url,
            short_description,
            description,
            star_rating,
            type,
            image_url, // Main image
            amenities,
            gallery, // Array of strings
            latitude,
            longitude,
            destination_id
        } = req.body;

        const hotel_id = uuidv4();

        // Insert Hotel
        await connection.execute(`
            INSERT INTO hotels (
                hotel_id, hotel_name, website_url, short_description, description,
                star_rating, type, image_url, amenities, latitude, longitude, destination_id
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [
            hotel_id, hotel_name, website_url, short_description, description,
            star_rating, type, image_url, amenities, latitude, longitude, destination_id
        ]);

        // Insert Photos
        if (gallery && Array.isArray(gallery)) {
            for (const photoUrl of gallery) {
                if (photoUrl && photoUrl.trim() !== '') {
                    await connection.execute(
                        'INSERT INTO hotel_photos (hotel_id, photo_url) VALUES (?, ?)',
                        [hotel_id, photoUrl]
                    );
                }
            }
        }

        await connection.commit();
        res.status(201).json({ success: true, message: 'Hotel created successfully', hotel_id });

    } catch (error) {
        await connection.rollback();
        console.error('Error creating hotel:', error);
        res.status(500).json({ success: false, error: 'Failed to create hotel' });
    } finally {
        connection.release();
    }
});

// POST /api/hotels/:id/feature - Add hotel to featured properties
router.post('/:id/feature', authenticateToken, authenticateAdmin, async (req, res) => {
    try {
        await pool.execute('UPDATE hotels SET is_featured = TRUE WHERE hotel_id = ?', [req.params.id]);
        res.json({ success: true, message: 'Hotel added to featured properties' });
    } catch (error) {
        console.error('Error adding featured hotel:', error);
        res.status(500).json({ success: false, error: 'Failed to update featured property' });
    }
});

// DELETE /api/hotels/:id/feature - Remove hotel from featured properties
router.delete('/:id/feature', authenticateToken, authenticateAdmin, async (req, res) => {
    try {
        await pool.execute('UPDATE hotels SET is_featured = FALSE WHERE hotel_id = ?', [req.params.id]);
        res.json({ success: true, message: 'Hotel removed from featured properties' });
    } catch (error) {
        console.error('Error removing featured hotel:', error);
        res.status(500).json({ success: false, error: 'Failed to update featured property' });
    }
});

// DELETE /api/hotels/:id
router.delete('/:id', authenticateToken, authenticateAdmin, async (req, res) => {
    try {
        await pool.execute('DELETE FROM hotels WHERE hotel_id = ?', [req.params.id]);
        res.json({ success: true, message: 'Hotel deleted successfully' });
    } catch (error) {
        console.error('Error deleting hotel:', error);
        res.status(500).json({ success: false, error: 'Failed to delete hotel' });
    }
});

module.exports = router;
