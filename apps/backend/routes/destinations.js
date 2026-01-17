const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { v4: uuidv4 } = require('uuid');
const { authenticateAdmin } = require('../middleware/auth');

// Helper to parse comma-separated tags
const parseTags = (tagsString) => {
    if (!tagsString) return [];
    return tagsString.split(',').map(tag => tag.trim()).filter(tag => tag);
};

// GET /api/destinations - Public: List all destinations
router.get('/', async (req, res) => {
    try {
        const [destinations] = await pool.execute(`
            SELECT * FROM destinations ORDER BY created_at DESC
        `);

        // For each destination, we could fetch one photo or basic info
        // But for the main list, the main 'image_url' is usually enough.
        // If we need the gallery or activities for the list view (which we typically don't for cards),
        // we can fetch them. For now, let's keep it efficient.
        // However, the frontend might expect 'tags' as an array if it was consistent with previous logic,
        // but our new schema says 'tags' is TEXT. We can send it as is, or parse it.
        // Let's parse it for frontend convenience if needed, or just send the raw text.
        // The implementation plan says "Category/Type (Dropdown - This will serve as the "Tags" in the UI)",
        // so 'type' is the main category. 'tags' field might be extra.

        res.json({
            success: true,
            destinations: destinations
        });
    } catch (error) {
        console.error('Error fetching destinations:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch destinations' });
    }
});

// GET /api/destinations/:id - Public: Get single destination with details
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const [rows] = await pool.execute('SELECT * FROM destinations WHERE destination_id = ?', [id]);

        if (rows.length === 0) {
            return res.status(404).json({ success: false, error: 'Destination not found' });
        }

        const destination = rows[0];

        // Fetch relations
        const [photos] = await pool.execute('SELECT photo_url, alt_text FROM destination_photos WHERE destination_id = ?', [id]);
        const [activities] = await pool.execute('SELECT item_id, activity_name FROM destination_activities WHERE destination_id = ?', [id]);

        res.json({
            success: true,
            destination: {
                ...destination,
                gallery: photos.map(p => p.photo_url),
                activities: activities.map(a => a.activity_name)
            }
        });
    } catch (error) {
        console.error('Error fetching destination details:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch destination details' });
    }
});

// POST /api/destinations - Admin: Create new destination
router.post('/', authenticateAdmin, async (req, res) => {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        const {
            destination_name, tagline, type, description,
            latitude, longitude, best_visit_start, best_visit_end,
            tags, image_url, gallery, activities
        } = req.body;

        // Validation (Basic Backend Check)
        if (!destination_name || !destination_name.trim()) throw new Error("Destination Name is required");
        if (!image_url || !image_url.trim()) throw new Error("Main Image URL is required");
        if (!type) throw new Error("Type/Category is required");

        const destinationId = uuidv4();

        // Insert Destination
        await connection.execute(`
            INSERT INTO destinations 
            (destination_id, destination_name, tagline, type, description, latitude, longitude, 
             best_visit_start, best_visit_end, tags, image_url)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [
            destinationId,
            destination_name.trim(),
            tagline ? tagline.trim() : null,
            type,
            description ? description.trim() : null,
            latitude || null,
            longitude || null,
            best_visit_start,
            best_visit_end,
            tags, // Assuming tags is passed as comma-separated string from frontend or just a string
            image_url.trim()
        ]);

        // Insert Gallery Photos
        if (gallery && Array.isArray(gallery)) {
            for (const photoUrl of gallery) {
                if (photoUrl && photoUrl.trim()) {
                    await connection.execute(`
                        INSERT INTO destination_photos (destination_id, photo_url) VALUES (?, ?)
                    `, [destinationId, photoUrl.trim()]);
                }
            }
        }

        // Insert Activities
        if (activities && Array.isArray(activities)) {
            for (const activity of activities) {
                if (activity && activity.trim()) {
                    await connection.execute(`
                        INSERT INTO destination_activities (destination_id, activity_name) VALUES (?, ?)
                    `, [destinationId, activity.trim()]);
                }
            }
        } else if (typeof activities === 'string') {
            // Handle newline separated string if passed directly as string
            const activityList = activities.split('\n').filter(a => a.trim());
            for (const activity of activityList) {
                await connection.execute(`
                    INSERT INTO destination_activities (destination_id, activity_name) VALUES (?, ?)
                `, [destinationId, activity.trim()]);
            }
        }

        await connection.commit();

        res.json({
            success: true,
            message: 'Destination created successfully',
            destination_id: destinationId
        });

    } catch (error) {
        await connection.rollback();
        console.error('Error creating destination:', error);
        res.status(500).json({ success: false, error: error.message || 'Failed to create destination' });
    } finally {
        connection.release();
    }
});

// PUT /api/destinations/:id - Admin: Update destination
router.put('/:id', authenticateAdmin, async (req, res) => {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();
        const { id } = req.params;
        const {
            destination_name, tagline, type, description,
            latitude, longitude, best_visit_start, best_visit_end,
            tags, image_url, gallery, activities
        } = req.body;

        // Update main table
        await connection.execute(`
            UPDATE destinations 
            SET destination_name = ?, tagline = ?, type = ?, description = ?, 
                latitude = ?, longitude = ?, best_visit_start = ?, best_visit_end = ?, 
                tags = ?, image_url = ?
            WHERE destination_id = ?
        `, [
            destination_name.trim(),
            tagline ? tagline.trim() : null,
            type,
            description ? description.trim() : null,
            latitude || null,
            longitude || null,
            best_visit_start,
            best_visit_end,
            tags,
            image_url.trim(),
            id
        ]);

        // Replace Photos (Delete all and re-insert) - Simplest strategy for full update
        await connection.execute('DELETE FROM destination_photos WHERE destination_id = ?', [id]);
        if (gallery && Array.isArray(gallery)) {
            for (const photoUrl of gallery) {
                if (photoUrl && photoUrl.trim()) {
                    await connection.execute(`
                        INSERT INTO destination_photos (destination_id, photo_url) VALUES (?, ?)
                    `, [id, photoUrl.trim()]);
                }
            }
        }

        // Replace Activities
        await connection.execute('DELETE FROM destination_activities WHERE destination_id = ?', [id]);
        if (activities && Array.isArray(activities)) {
            for (const activity of activities) {
                if (activity && activity.trim()) {
                    await connection.execute(`
                        INSERT INTO destination_activities (destination_id, activity_name) VALUES (?, ?)
                    `, [id, activity.trim()]);
                }
            }
        }

        await connection.commit();

        res.json({
            success: true,
            message: 'Destination updated successfully'
        });

    } catch (error) {
        await connection.rollback();
        console.error('Error updating destination:', error);
        res.status(500).json({ success: false, error: 'Failed to update destination' });
    } finally {
        connection.release();
    }
});

// DELETE /api/destinations/:id - Admin: Delete destination
router.delete('/:id', authenticateAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        // ON DELETE CASCADE takes care of photos and activities
        await pool.execute('DELETE FROM destinations WHERE destination_id = ?', [id]);

        res.json({
            success: true,
            message: 'Destination deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting destination:', error);
        res.status(500).json({ success: false, error: 'Failed to delete destination' });
    }
});

module.exports = router;
