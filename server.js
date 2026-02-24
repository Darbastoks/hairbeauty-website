require('dotenv').config();
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const path = require('path');
const connectDB = require('./database');
const Booking = require('./models/Booking');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static frontend files
app.use(express.static(path.join(__dirname, 'public')));

// Rate Limiting for API to prevent spam
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // Limit each IP to 10 requests per windowMs
    message: { error: 'Too many requests, please try again later.' }
});

// API Routes
app.post('/api/book', apiLimiter, async (req, res) => {
    try {
        const { name, phone, service, date, message } = req.body;

        if (!name || !phone || !service) {
            return res.status(400).json({ error: 'Name, phone, and service are required.' });
        }

        const newBooking = new Booking({
            name,
            phone,
            service,
            preferred_date: date,
            message
        });

        const savedBooking = await newBooking.save();

        res.status(201).json({
            success: true,
            message: 'Booking request received successfully!',
            bookingId: savedBooking._id
        });
    } catch (err) {
        console.error('Database error:', err.message);
        res.status(500).json({ error: 'Failed to submit booking request.' });
    }
});

// Admin Routes (Simple Authentication)
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'greta123';

app.get('/api/bookings', async (req, res) => {
    const { password } = req.query;
    if (password !== ADMIN_PASSWORD) {
        return res.status(401).json({ error: 'Neteisingas slaptažodis' });
    }
    try {
        const bookings = await Booking.find().sort({ createdAt: -1 });
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ error: 'Nepavyko užkrauti rezervacijų' });
    }
});

app.delete('/api/bookings/:id', async (req, res) => {
    const { password } = req.query;
    if (password !== ADMIN_PASSWORD) {
        return res.status(401).json({ error: 'Neteisingas slaptažodis' });
    }
    try {
        await Booking.findByIdAndDelete(req.params.id);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: 'Nepavyko ištrinti rezervacijos' });
    }
});

// Handle 404s (fallback to index.html for SPA-like behavior if needed)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
