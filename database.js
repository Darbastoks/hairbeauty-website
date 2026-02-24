require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // We use MONGO_URI from the .env file, or fallback to a local MongoDB instance.
        // For deployment on Render/Heroku, you will set this MONGO_URI in their environment variables settings.
        const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/hairbeauty';

        await mongoose.connect(uri);
        console.log('Connected to MongoDB successfully.');
    } catch (err) {
        console.error('Could not connect to MongoDB:', err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
