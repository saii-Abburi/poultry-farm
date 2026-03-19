const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const fallbackLocal = 'mongodb://127.0.0.1:27017/poultry_farm';
        const uri = (process.env.MONGO_URI || fallbackLocal).trim();
        
        // Log connection attempt (safely mask the password)
        const maskedUri = uri.replace(/\/\/([^:]+):([^@]+)@/, '//\$1:****@');
        console.log(`\x1b[36mℹ Attempting to connect to MongoDB: ${maskedUri}\x1b[0m`);

        // Removed explicit dbName option here because it's already in the URI
        // Mongoose handles it better when it's just in the string
        const conn = await mongoose.connect(uri);
        
        // Very explicit log to prove where it's connected
        const isAtlas = conn.connection.host.includes('.mongodb.net');
        const dbSource = isAtlas ? '\x1b[35m[Atlas Cloud]\x1b[0m' : '\x1b[33m[Local Database]\x1b[0m';
        
        console.log(`\x1b[32m✔ MongoDB Connected: ${dbSource} ${conn.connection.host}\x1b[0m`);
        console.log(`\x1b[32m✔ Database Name: ${conn.connection.name}\x1b[0m`);
    } catch (error) {
        console.error(`\x1b[31m✘ Database Connection Error: ${error.message}\x1b[0m`);
        throw error;
    }
};

module.exports = connectDB;
