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
const packagesRoutes = require('./routes/packages');
const hotelsRoutes = require('./routes/hotels');
const destinationsRoutes = require('./routes/destinations');
const analyticsRoutes = require('./routes/analytics');

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
app.use('/api/destinations', destinationsRoutes);
app.use('/api/analytics', analyticsRoutes);

// System Health Check Endpoint
app.get('/api/health', async (req, res) => {
    try {
        // 1. Check Database
        await pool.execute('SELECT 1');

        // 2. Check Expert System (Basic Import Check)
        const { analyzeQuestionnaire } = require('./utils/expertSystem');
        const expertSystemStatus = typeof analyzeQuestionnaire === 'function' ? 'Operational' : 'Error';

        // 3. Maintenance: Ensure page_views table exists
        await pool.execute(`
            CREATE TABLE IF NOT EXISTS page_views (
                view_id INT AUTO_INCREMENT PRIMARY KEY,
                page_path VARCHAR(255),
                user_agent TEXT,
                ip_address VARCHAR(45),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        res.json({
            success: true,
            status: {
                database: 'Connected',
                api: 'Online',
                expertSystem: expertSystemStatus,
                timestamp: new Date().toISOString()
            }
        });
    } catch (error) {
        console.error('Health check failed:', error);
        res.status(500).json({
            success: false,
            status: {
                database: 'Disconnected',
                api: 'Error',
                expertSystem: 'Unknown',
                error: error.message
            }
        });
    }
});

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

// Old destinations route removed - replaced by routes/destinations.js

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

        // --- New 4-Form System Tables (Relational) ---

        // 1. Destinations
        await pool.execute(`
            CREATE TABLE IF NOT EXISTS destinations (
                destination_id VARCHAR(50) PRIMARY KEY,
                destination_name VARCHAR(100) NOT NULL,
                tagline VARCHAR(255),
                type ENUM('cultural', 'beach', 'adventure', 'wildlife', 'city', 'hill_country', 'historical') NOT NULL,
                description TEXT,
                latitude DECIMAL(10, 8),
                longitude DECIMAL(11, 8),
                best_visit_start VARCHAR(20),
                best_visit_end VARCHAR(20),
                tags TEXT,
                image_url TEXT,
                is_active BOOLEAN DEFAULT TRUE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // 2. Destination Photos (Relational)
        await pool.execute(`
            CREATE TABLE IF NOT EXISTS destination_photos (
                photo_id INT AUTO_INCREMENT PRIMARY KEY,
                destination_id VARCHAR(50),
                photo_url TEXT NOT NULL,
                alt_text VARCHAR(255),
                FOREIGN KEY (destination_id) REFERENCES destinations(destination_id) ON DELETE CASCADE
            )
        `);

        // 3. Destination Activities (Relational)
        await pool.execute(`
            CREATE TABLE IF NOT EXISTS destination_activities (
                item_id INT AUTO_INCREMENT PRIMARY KEY,
                destination_id VARCHAR(50),
                activity_name TEXT NOT NULL,
                FOREIGN KEY (destination_id) REFERENCES destinations(destination_id) ON DELETE CASCADE
            )
        `);

        // 4. Hotels
        await pool.execute(`
            CREATE TABLE IF NOT EXISTS hotels (
                hotel_id VARCHAR(50) PRIMARY KEY,
                hotel_name VARCHAR(255) NOT NULL,
                destination_id VARCHAR(50),
                type VARCHAR(50), -- Changed from strict ENUM to VARCHAR to allow flexible categories if needed, or keep strict if preferred. Reference site uses specific categories.
                star_rating INT, 
                address TEXT,
                website_url TEXT,
                short_description TEXT,
                description TEXT, -- For full overview
                price_per_night_usd DECIMAL(10, 2),
                room_types TEXT,
                meal_plans TEXT,
                amenities TEXT,
                image_url TEXT, -- Main Image
                contact_email VARCHAR(100),
                contact_phone VARCHAR(20),
                is_active BOOLEAN DEFAULT TRUE,
                is_featured BOOLEAN DEFAULT FALSE,
                latitude DECIMAL(10, 8),
                longitude DECIMAL(11, 8),
                FOREIGN KEY (destination_id) REFERENCES destinations(destination_id) ON DELETE SET NULL
            )
        `);

        // Migration for Hotels
        const [hotelCols] = await pool.execute("SHOW COLUMNS FROM hotels");
        const hotelColNames = hotelCols.map(c => c.Field);
        const newHotelCols = ['website_url', 'short_description', 'star_rating', 'image_url', 'description', 'is_featured'];
        for (const col of newHotelCols) {
            if (!hotelColNames.includes(col)) {
                let type = 'TEXT';
                if (col === 'is_featured') type = 'BOOLEAN DEFAULT FALSE';
                await pool.execute(`ALTER TABLE hotels ADD COLUMN ${col} ${type}`);
            }
        }
        // Fix star_rating type if it was added as TEXT by loop or ensure it exists
        if (!hotelColNames.includes('star_rating')) await pool.execute("ALTER TABLE hotels MODIFY COLUMN star_rating INT");


        // 4.5 Hotel Photos (NEW)
        await pool.execute(`
            CREATE TABLE IF NOT EXISTS hotel_photos (
                photo_id INT AUTO_INCREMENT PRIMARY KEY,
                hotel_id VARCHAR(50),
                photo_url TEXT NOT NULL,
                FOREIGN KEY (hotel_id) REFERENCES hotels(hotel_id) ON DELETE CASCADE
            )
        `);

        // 5. Services (formerly Activities)
        await pool.execute(`
            CREATE TABLE IF NOT EXISTS services (
                service_id VARCHAR(50) PRIMARY KEY,
                service_name VARCHAR(255) NOT NULL,
                type VARCHAR(50),
                description TEXT,
                duration_hours DECIMAL(4, 2),
                intensity ENUM('low', 'medium', 'high'),
                price_range ENUM('budget', 'moderate', 'premium'),
                image_url TEXT,
                tags TEXT,
                cities TEXT,
                is_active BOOLEAN DEFAULT TRUE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // 6. Packages
        await pool.execute(`
            CREATE TABLE IF NOT EXISTS packages (
                package_id VARCHAR(50) PRIMARY KEY,
                package_name VARCHAR(255) NOT NULL,
                package_type VARCHAR(50),
                description TEXT,
                short_description TEXT,
                duration_days INT,
                price_per_person_usd DECIMAL(10, 2),
                per_person_cost DECIMAL(10, 2),
                accommodation_type VARCHAR(50),
                transport_included BOOLEAN DEFAULT TRUE,
                transport_type VARCHAR(50),
                image_url TEXT,
                map_url TEXT,
                destinations_covered TEXT, 
                inclusions TEXT,
                exclusions TEXT,
                important_notes TEXT,
                is_active BOOLEAN DEFAULT TRUE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Check for missing columns in packages and add them (Migration logic)
        const [pkgCols] = await pool.execute("SHOW COLUMNS FROM packages");
        const pkgColNames = pkgCols.map(c => c.Field);
        const newCols = ['short_description', 'map_url', 'destinations_covered', 'inclusions', 'exclusions', 'important_notes'];
        for (const col of newCols) {
            if (!pkgColNames.includes(col)) await pool.execute(`ALTER TABLE packages ADD COLUMN ${col} TEXT`);
        }

        // 7. Package Highlights
        await pool.execute(`
            CREATE TABLE IF NOT EXISTS package_highlights (
                highlight_id INT AUTO_INCREMENT PRIMARY KEY,
                package_id VARCHAR(50),
                highlight_text TEXT NOT NULL,
                order_index INT DEFAULT 0,
                FOREIGN KEY (package_id) REFERENCES packages(package_id) ON DELETE CASCADE
            )
        `);

        // 8. Package Itinerary
        await pool.execute(`
            CREATE TABLE IF NOT EXISTS package_itinerary (
                itinerary_id INT AUTO_INCREMENT PRIMARY KEY,
                package_id VARCHAR(50),
                day_number INT NOT NULL,
                title VARCHAR(255),
                description TEXT,
                hotel_id VARCHAR(50),
                activities TEXT,
                meals VARCHAR(255),
                FOREIGN KEY (package_id) REFERENCES packages(package_id) ON DELETE CASCADE
            )
        `);
        // Check for missing columns in itinerary
        const [itinCols] = await pool.execute("SHOW COLUMNS FROM package_itinerary");
        if (!itinCols.map(c => c.Field).includes('meals')) {
            await pool.execute("ALTER TABLE package_itinerary ADD COLUMN meals VARCHAR(255)");
        }

        // 9. Package Photos (NEW)
        await pool.execute(`
            CREATE TABLE IF NOT EXISTS package_photos (
                photo_id INT AUTO_INCREMENT PRIMARY KEY,
                package_id VARCHAR(50),
                photo_url TEXT NOT NULL,
                FOREIGN KEY (package_id) REFERENCES packages(package_id) ON DELETE CASCADE
            )
        `);
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
