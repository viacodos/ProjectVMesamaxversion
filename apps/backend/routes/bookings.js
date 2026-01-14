const express = require('express');
const router = express.Router();
const pool = require('../config/database');

// POST /api/bookings - Save booking with user details AND questionnaire
router.post('/', async (req, res) => {
    try {
        const {
            full_name, email, phone, country, city, emergency_contact,
            special_requirements, total_booking_amount = 0, booking_status = 'pending',
            itinerary_data, questionnaire_data
        } = req.body;

        const booking_id = `booking_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const user_id = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const session_id = `session_${Date.now()}`;

        const [existingUsers] = await pool.query('SELECT user_id FROM users WHERE email = ?', [email]);

        let finalUserId;
        if (existingUsers.length > 0) {
            finalUserId = existingUsers[0].user_id;
        } else {
            finalUserId = user_id;
            await pool.query(
                `INSERT INTO users (user_id, email, full_name, phone, country, city, emergency_contact, special_requirements)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                [finalUserId, email, full_name, phone, country, city, emergency_contact, special_requirements || '']
            );
        }

        await pool.query(
            `INSERT INTO bookings (booking_id, user_id, full_name, email, phone, country, city,
                emergency_contact, special_requirements, total_booking_amount, booking_status, itinerary_data)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [booking_id, finalUserId, full_name, email, phone, country, city, emergency_contact,
                special_requirements || '', total_booking_amount, booking_status, JSON.stringify(itinerary_data || {})]
        );

        if (questionnaire_data) {
            await pool.query(
                `INSERT INTO questionnaire_responses (response_id, session_id, user_id, travel_timing, travel_duration_range,
                    budget, traveler_type, accommodation_type, num_travelers, traveler_composition, room_type_preference,
                    meal_plan_preference, interests, preferred_destinations, starting_point, transport_preference,
                    exact_days, random_plan_selected, travel_ideas, exact_dates, flight_details, travel_intention,
                    transport_method, extra_transport_desires)
                 VALUES (UUID(), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [session_id, finalUserId, questionnaire_data.travel_timing || null, questionnaire_data.travel_duration_range || null,
                    questionnaire_data.budget || null, questionnaire_data.traveler_type || null, questionnaire_data.accommodation_type || null,
                    questionnaire_data.num_travelers || 0, JSON.stringify(questionnaire_data.traveler_composition || {}),
                    questionnaire_data.room_type_preference || null, questionnaire_data.meal_plan_preference || null,
                    JSON.stringify(questionnaire_data.interests || []), JSON.stringify(questionnaire_data.preferred_destinations || []),
                    questionnaire_data.starting_point || null, questionnaire_data.transport_preference || null,
                    questionnaire_data.exact_days || 0, questionnaire_data.random_plan_selected || false,
                    questionnaire_data.travel_ideas || '', JSON.stringify(questionnaire_data.exact_dates || []),
                    JSON.stringify(questionnaire_data.flight_details || {}), JSON.stringify(questionnaire_data.travel_intention || {}),
                    questionnaire_data.transport_method || null, questionnaire_data.extra_transport_desires || '']
            );
        }

        res.json({ success: true, message: 'Booking saved successfully', booking_id, user_id: finalUserId });
    } catch (error) {
        console.error('Booking error:', error);
        res.status(500).json({ success: false, error: 'Database error', details: error.message });
    }
});

// POST /api/bookings/package - Book package
router.post('/package', async (req, res) => {
    try {
        const { package_id, user_details, total_cost = 0, adults = 1, children = 0, questionnaire_responses = {} } = req.body;

        const booking_id = `booking_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const user_id = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

        let package_name = 'Package';
        let per_person_cost = 0;
        const [packageData] = await pool.execute('SELECT package_name, per_person_cost FROM packages WHERE package_id = ?', [package_id]);
        if (packageData.length > 0) {
            package_name = packageData[0].package_name;
            per_person_cost = packageData[0].per_person_cost;
        }

        const [existingUsers] = await pool.query('SELECT user_id FROM users WHERE email = ?', [user_details.email]);

        let finalUserId;
        if (existingUsers.length > 0) {
            finalUserId = existingUsers[0].user_id;
            await pool.query(
                `UPDATE users SET full_name = ?, phone = ?, country = ?, emergency_contact = ?, special_requirements = ? WHERE user_id = ?`,
                [user_details.full_name, user_details.phone, user_details.country, user_details.emergency_contact || user_details.phone,
                    user_details.special_requirements || '', finalUserId]
            );
        } else {
            finalUserId = user_id;
            await pool.query(
                `INSERT INTO users (user_id, email, full_name, phone, country, city, emergency_contact, special_requirements)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                [finalUserId, user_details.email, user_details.full_name, user_details.phone, user_details.country,
                    user_details.city || 'Not specified', user_details.emergency_contact || user_details.phone, user_details.special_requirements || '']
            );
        }

        await pool.query(
            `INSERT INTO bookings (booking_id, user_id, full_name, email, phone, country, city, emergency_contact,
                special_requirements, total_booking_amount, booking_status, itinerary_id, booking_notes)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [booking_id, finalUserId, user_details.full_name, user_details.email, user_details.phone, user_details.country,
                user_details.city || 'Not specified', user_details.emergency_contact || user_details.phone,
                user_details.special_requirements || '', total_cost, 'pending', package_id,
                `Package: ${package_name} | Adults: ${adults} | Children: ${children} | Total: $${total_cost} | Per Person: $${per_person_cost}`]
        );

        res.json({
            success: true, message: 'Package booking submitted successfully', booking_id, user_id: finalUserId,
            package_id, package_name, total_cost, email: user_details.email, payment_redirect: true
        });
    } catch (error) {
        console.error('Package booking error:', error);
        res.status(500).json({ success: false, error: 'Database error', details: error.message });
    }
});

// GET /api/bookings - Get all bookings
router.get('/', async (req, res) => {
    try {
        const [bookings] = await pool.execute(`
            SELECT b.*, u.email, u.full_name FROM bookings b
            LEFT JOIN users u ON b.user_id = u.user_id ORDER BY b.created_at DESC
        `);
        res.json({ success: true, bookings });
    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).json({ success: false, error: 'Database error' });
    }
});

// GET /api/bookings/:email - Get user bookings
router.get('/:email', async (req, res) => {
    try {
        const [bookings] = await pool.execute(`
            SELECT b.*, p.package_name FROM bookings b
            JOIN users u ON b.user_id = u.user_id
            LEFT JOIN packages p ON b.itinerary_id = p.package_id
            WHERE u.email = ?
        `, [req.params.email]);
        res.json(bookings);
    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// POST /api/bookings/payment - Update payment status
router.post('/payment', async (req, res) => {
    try {
        const { booking_id, payment_status, payment_amount } = req.body;
        await pool.query(
            `UPDATE bookings SET payment_status = ?, payment_amount = ?, booking_status = 'confirmed' WHERE booking_id = ?`,
            [payment_status, payment_amount, booking_id]
        );
        res.json({ success: true, message: 'Payment status updated successfully' });
    } catch (error) {
        console.error('Error updating payment:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
