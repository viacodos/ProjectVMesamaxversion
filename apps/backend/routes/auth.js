const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/admin/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(
                { email, role: 'admin' },
                process.env.JWT_SECRET,
                { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
            );

            res.json({
                success: true,
                token,
                user: { email, role: 'admin' }
            });
        } else {
            res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            error: 'Login failed'
        });
    }
});

// TODO: Secure Admin Authentication with Google OAuth
// 1. Install google-auth-library: `npm install google-auth-library`
// 2. Create a new route: router.post('/google', async (req, res) => { ... })
// 3. Verify ID Token:
//    const { OAuth2Client } = require('google-auth-library');
//    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
//    const ticket = await client.verifyIdToken({
//        idToken: req.body.token,
//        audience: process.env.GOOGLE_CLIENT_ID
//    });
//    const payload = ticket.getPayload();
// 4. Server-Side Whitelist Check:
//    if (payload.hd !== 'lankavacations.com') return res.status(401).send('Unauthorized Domain');
//    const adminUser = await pool.execute('SELECT * FROM admin_users WHERE email = ?', [payload.email]);
//    if (!adminUser.length) return res.status(401).send('Not an authorized admin');
// 5. Issue your own JWT session token if all checks pass.

module.exports = router;
