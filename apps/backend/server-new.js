require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { apiLimiter } = require('./middleware/security');
const pool = require('./config/database');

const itineraryRoutes = require('./routes/itinerary');
const adminRoutes = require('./routes/admin');
const mapRoutes = require('./routes/map');
const authRoutes = require('./routes/auth');
const expertSystemRoutes = require('./routes/expertSystem');
const chatRoutes = require('./routes/chat');
const bookingsRoutes = require('./routes/bookings');
const packagesRoutes = require('./routes/packages');
const hotelsRoutes = require('./routes/hotels');

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet());
app.use(cors({
    origin: process.env.FRONTEND_URL ? process.env.FRONTEND_URL.split(',') : ['http://localhost:5173', 'http://localhost:5174'],
    credentials: true
}));

// Global API Rate Limiting
app.use('/api/', apiLimiter);

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use('/pdfs', express.static('pdfs'));

// Helper functions
function parseTags(tagsData) {
    if (!tagsData) return [];
    try {
        if (typeof tagsData === 'string' && tagsData.startsWith('[')) {
            return JSON.parse(tagsData);
        }
        if (typeof tagsData === 'string') {
            return tagsData.split(',').map(tag => tag.trim()).filter(tag => tag);
        }
        if (Array.isArray(tagsData)) {
            return tagsData;
        }
    } catch (error) {
        console.log('⚠️ Error parsing tags:', tagsData);
    }
    return [];
}

function parseCities(citiesData) {
    if (!citiesData) return [];
    try {
        if (typeof citiesData === 'string' && citiesData.startsWith('[')) {
            return JSON.parse(citiesData);
        }
        if (typeof citiesData === 'string') {
            return [citiesData.trim()];
        }
        if (Array.isArray(citiesData)) {
            return citiesData;
        }
    } catch (error) {
        console.log('⚠️ Error parsing cities:', citiesData);
    }
    return [];
}

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/itinerary', itineraryRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/map', mapRoutes);
app.use('/api/expert-system', expertSystemRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/bookings', bookingsRoutes);
app.use('/api/packages', packagesRoutes);
app.use('/api/hotels', hotelsRoutes);

// Existing routes (keep your chatbot and other routes)
app.get('/api/questionnaire', async (req, res) => {
    try {
        const [responses] = await pool.execute('SELECT * FROM questionnaire_responses ORDER BY created_at DESC');
        res.json({ success: true, responses });
    } catch (error) {
        console.error('Error fetching questionnaire:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});

app.post('/api/questionnaire', async (req, res) => {
    try {
        const {
            session_id, travel_timing, travel_duration_range, budget, accommodation_type,
            num_travelers, traveler_composition, room_type_preference, meal_plan_preference,
            travel_ideas, preferred_destinations, exact_dates, flight_details, travel_intention,
            transport_preference, transport_method, extra_transport_desires, exact_days,
            starting_point, interests
        } = req.body;

        await pool.execute(
            `INSERT INTO questionnaire_responses (response_id, session_id, travel_timing, travel_duration_range,
                budget, accommodation_type, num_travelers, traveler_composition, room_type_preference,
                meal_plan_preference, travel_ideas, preferred_destinations, exact_dates, flight_details,
                travel_intention, transport_preference, transport_method, extra_transport_desires,
                exact_days, starting_point, interests)
             VALUES (UUID(), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [session_id, travel_timing, travel_duration_range, budget, accommodation_type, num_travelers,
                JSON.stringify(traveler_composition), room_type_preference, meal_plan_preference, travel_ideas,
                JSON.stringify(preferred_destinations), JSON.stringify(exact_dates), JSON.stringify(flight_details),
                JSON.stringify(travel_intention), transport_preference, transport_method, extra_transport_desires,
                exact_days, starting_point, JSON.stringify(interests)]
        );

        res.json({ success: true, message: 'Questionnaire submitted successfully' });
    } catch (error) {
        console.error('Error submitting questionnaire:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});

app.get('/api/packages', async (req, res) => {
    try {
        const [packageData] = await pool.execute(`
            SELECT package_id, package_name, package_type, description, duration_days,
                   price_per_person_usd, per_person_cost, included_activities,
                   included_meal_plans, accommodation_type, transport_included,
                   transport_type, image_urls, routes
            FROM packages
        `);
        res.json(packageData);
    } catch (error) {
        console.error('Error fetching packages:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});

app.get('/api/packages/:id', async (req, res) => {
    try {
        const [packageData] = await pool.execute(
            'SELECT * FROM packages WHERE package_id = ?',
            [req.params.id]
        );
        if (packageData.length === 0) {
            return res.status(404).json({ success: false, error: 'Package not found' });
        }
        res.json(packageData[0]);
    } catch (error) {
        console.error('Error fetching package:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});

app.get('/api/destinations', async (req, res) => {
    try {
        const [destinations] = await pool.execute(`
            SELECT destination_id, destination_name, type, description, latitude, longitude,
                   best_visit_start, best_visit_end, image_url, tags
            FROM destinations
        `);

        if (!destinations || destinations.length === 0) {
            return res.json([]);
        }

        const transformedDestinations = destinations.map(dest => ({
            destination_id: dest.destination_id,
            destination_name: dest.destination_name,
            type: dest.type,
            latitude: dest.latitude ? parseFloat(dest.latitude) : null,
            longitude: dest.longitude ? parseFloat(dest.longitude) : null,
            best_season_start: dest.best_visit_start || 'jan',
            best_season_end: dest.best_visit_end || 'dec',
            tags: parseTags(dest.tags)
        })).filter(dest => dest.latitude && dest.longitude); // Filter out invalid coordinates

        res.json(transformedDestinations);
    } catch (error) {
        console.error('Error fetching destinations:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});

app.get('/api/activities', async (req, res) => {
    try {
        const [allActivities] = await pool.execute(`
            SELECT activity_id, activity_name, type, description, duration_hours,
                   intensity, price_range, tags, cities
            FROM activities
        `);
        const transformedActivities = allActivities.map(activity => ({
            activity_id: activity.activity_id,
            activity_name: activity.activity_name,
            type: activity.type,
            description: activity.description,
            duration: activity.duration_hours || 2,
            intensity: activity.intensity || 'medium',
            price_range: activity.price_range || 'moderate',
            tags: parseTags(activity.tags),
            cities: parseCities(activity.cities)
        }));
        res.json(transformedActivities);
    } catch (error) {
        console.error('Error fetching activities:', error);
        res.json([]);
    }
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: 'Server is running',
        timestamp: new Date().toISOString()
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({
        success: false,
        error: 'Internal server error'
    });
});

// Database initialization
async function initializeDatabase() {
    try {
        // Create users table first (required by foreign keys)
        const [userTables] = await pool.execute(`SHOW TABLES LIKE 'users'`);
        if (userTables.length === 0) {
            await pool.execute(`
                CREATE TABLE users (
                    user_id VARCHAR(50) PRIMARY KEY,
                    email VARCHAR(100) UNIQUE NOT NULL,
                    full_name VARCHAR(100) NOT NULL,
                    phone VARCHAR(20),
                    country VARCHAR(50),
                    city VARCHAR(100),
                    emergency_contact VARCHAR(20),
                    special_requirements TEXT,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
                )
            `);
        }

        const [tables] = await pool.execute(`SHOW TABLES LIKE 'bookings'`);
        if (tables.length === 0) {
            await pool.execute(`
                CREATE TABLE bookings (
                    booking_id VARCHAR(50) PRIMARY KEY,
                    user_id VARCHAR(50) NOT NULL,
                    full_name VARCHAR(100) NOT NULL,
                    email VARCHAR(100) NOT NULL,
                    phone VARCHAR(20) NOT NULL,
                    country VARCHAR(50) NOT NULL,
                    city VARCHAR(100),
                    emergency_contact VARCHAR(20),
                    special_requirements TEXT,
                    total_booking_amount DECIMAL(10, 2) DEFAULT 0.00,
                    booking_status VARCHAR(20) DEFAULT 'pending',
                    itinerary_id VARCHAR(50),
                    itinerary_data JSON,
                    payment_status VARCHAR(20) DEFAULT 'unpaid',
                    payment_amount DECIMAL(10, 2) DEFAULT 0.00,
                    booking_notes TEXT,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
                )
            `);
        }

        const [qTables] = await pool.execute(`SHOW TABLES LIKE 'questionnaire_responses'`);
        if (qTables.length === 0) {
            await pool.execute(`
                CREATE TABLE questionnaire_responses (
                    response_id VARCHAR(50) PRIMARY KEY,
                    session_id VARCHAR(100) NOT NULL,
                    user_id VARCHAR(50),
                    travel_timing VARCHAR(50),
                    travel_duration_range VARCHAR(50),
                    budget VARCHAR(50),
                    traveler_type VARCHAR(50),
                    accommodation_type VARCHAR(50),
                    num_travelers INT,
                    traveler_composition TEXT,
                    room_type_preference VARCHAR(50),
                    meal_plan_preference VARCHAR(50),
                    interests TEXT,
                    preferred_destinations TEXT,
                    starting_point VARCHAR(100),
                    transport_preference VARCHAR(100),
                    exact_days INT,
                    random_plan_selected BOOLEAN DEFAULT FALSE,
                    travel_ideas TEXT,
                    exact_dates TEXT,
                    flight_details TEXT,
                    travel_intention TEXT,
                    transport_method VARCHAR(50),
                    extra_transport_desires TEXT,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE SET NULL
                )
            `);
        }
    } catch (error) {
        console.error('Database initialization error:', error);
    }
}

app.listen(PORT, async () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`📍 API endpoints:`);
    console.log(`   GET  /api/health`);
    console.log(`   GET  /api/destinations`);
    console.log(`   GET  /api/packages`);
    console.log(`   POST /api/itinerary/generate`);
    console.log(`   GET  /api/map/destinations`);
    console.log(`   POST /api/admin/destinations (protected)`);
    console.log(`   POST /api/expert-system/recommend`);
    console.log(`   GET  /api/expert-system/weights`);
    console.log(`   POST /api/bookings`);
    console.log(`   POST /api/bookings/package`);
    console.log(`   POST /api/bookings/payment`);
    console.log(`   POST /api/packages/calculate-price`);
    console.log(`   GET  /api/packages/generate-pdf/:id`);
    console.log(`   GET  /api/hotels`);
    console.log(`   POST /api/questionnaire`);
    await initializeDatabase();
});

module.exports = app;
