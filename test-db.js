const mongoose = require('mongoose');

const testConnection = async () => {
    try {
        const uri = 'mongodb+srv://admin:XuKLZDK712eepji5@admin.dstbasd.mongodb.net/?appName=admin';
        await mongoose.connect(uri);
        console.log('Connected to MongoDB successfully.');
        process.exit(0);
    } catch (err) {
        console.error('Could not connect to MongoDB:', err.message);
        process.exit(1);
    }
};

testConnection();
