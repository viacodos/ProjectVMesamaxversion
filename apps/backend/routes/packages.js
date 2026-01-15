const express = require('express');
// TODO: Implement POST /api/packages for Admin Tour Creation to allow adding new tours via CMS
const router = express.Router();
const pool = require('../config/database');
const PDFDocument = require('pdfkit');
const path = require('path');
const fs = require('fs');

// GET /api/packages - Get all packages
router.get('/', async (req, res) => {
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

// GET /api/packages/:id - Get package by ID
router.get('/:id', async (req, res) => {
    try {
        const [packageData] = await pool.execute('SELECT * FROM packages WHERE package_id = ?', [req.params.id]);
        if (packageData.length === 0) {
            return res.status(404).json({ success: false, error: 'Package not found' });
        }
        res.json(packageData[0]);
    } catch (error) {
        console.error('Error fetching package:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});

// POST /api/packages/calculate-price - Calculate package price
router.post('/calculate-price', async (req, res) => {
    try {
        const { package_id, adults, children } = req.body;
        const [packageData] = await pool.execute('SELECT per_person_cost FROM packages WHERE package_id = ?', [package_id]);
        if (packageData.length === 0) {
            return res.status(404).json({ error: 'Package not found' });
        }
        const perPersonCost = packageData[0].per_person_cost;
        const adultCost = adults * perPersonCost;
        const childCost = children * (perPersonCost / 2);
        const totalCost = adultCost + childCost;
        res.json({ adultCost, childCost, totalCost, perPersonCost, adults, children });
    } catch (error) {
        console.error('Error calculating price:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

const { pdfLimiter } = require('../middleware/security');

// GET /api/packages/generate-pdf/:packageId - Generate PDF itinerary
router.get('/generate-pdf/:packageId', pdfLimiter, async (req, res) => {
    try {
        const packageId = req.params.packageId;
        const [packageData] = await pool.execute('SELECT * FROM packages WHERE package_id = ?', [packageId]);
        if (packageData.length === 0) {
            return res.status(404).json({ error: 'Package not found' });
        }

        const packageItem = packageData[0];
        const doc = new PDFDocument({ size: 'A4', margin: 50 });

        if (!fs.existsSync('pdfs')) {
            fs.mkdirSync('pdfs');
        }

        const filename = `itinerary-${packageId}-${Date.now()}.pdf`;
        const filepath = path.join(__dirname, '..', 'pdfs', filename);
        const writeStream = fs.createWriteStream(filepath);
        doc.pipe(writeStream);

        // Header
        doc.fillColor('#f97a1f').rect(0, 0, 600, 100).fill();
        doc.fillColor('#ffffff').fontSize(24).font('Helvetica-Bold').text('LANKA VACATIONS', 50, 30);
        doc.fontSize(12).font('Helvetica').text('Your Trusted Travel Partner in Sri Lanka', 50, 60);

        // Package Title
        doc.fillColor('#000000').fontSize(20).font('Helvetica-Bold').text(packageItem.package_name.toUpperCase(), 50, 120);
        doc.strokeColor('#f97a1f').lineWidth(2).moveTo(50, 150).lineTo(550, 150).stroke();

        // Package Details
        doc.fontSize(12).fillColor('#333333').text('Package Details', 50, 170);
        const details = [
            { label: 'Package ID', value: packageItem.package_id },
            { label: 'Duration', value: `${packageItem.duration_days} Days` },
            { label: 'Package Type', value: packageItem.package_type },
            { label: 'Price Per Person', value: `$${packageItem.per_person_cost || packageItem.price_per_person_usd}` }
        ];
        details.forEach((detail, index) => {
            const yPos = 200 + (index * 25);
            doc.font('Helvetica-Bold').fillColor('#f97a1f').text(detail.label + ':', 50, yPos, { width: 150 });
            doc.font('Helvetica').fillColor('#333333').text(detail.value, 200, yPos);
        });

        // Itinerary
        doc.fontSize(14).font('Helvetica-Bold').fillColor('#f97a1f').text('DAILY ITINERARY', 50, doc.y + 40);
        let routes = [];
        try {
            if (packageItem.routes) {
                routes = typeof packageItem.routes === 'string' ? JSON.parse(packageItem.routes) : packageItem.routes;
            }
        } catch (error) {
            console.log('Error parsing routes:', error);
        }

        if (routes.length > 0) {
            routes.forEach((route, index) => {
                const yPos = doc.y + 20;
                doc.fontSize(12).font('Helvetica-Bold').fillColor('#ffffff').roundedRect(50, yPos, 500, 30, 5).fill('#f97a1f');
                doc.text(`Day ${route.day || index + 1}: ${route.location || 'Destination'}`, 70, yPos + 10);
                doc.fontSize(10).font('Helvetica').fillColor('#333333').text(route.description || 'No description available.', 70, yPos + 40, { width: 480, align: 'justify' });
                doc.moveDown(1.5);
            });
        }

        doc.end();

        writeStream.on('finish', () => {
            res.json({ pdfUrl: `/pdfs/${filename}`, message: 'PDF generated successfully' });
        });
    } catch (error) {
        console.error('Error generating PDF:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
