const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const Admin = require('./models/Admin');
const connectDB = require('./config/db');

dotenv.config({ path: path.join(__dirname, '../.env') });

const importData = async () => {
    try {
        await Admin.deleteMany();

        const adminUser = {
            name: 'System Admin',
            email: 'admin@gmail.com',
            phoneNumber: '1234567890',
            password: 'admin123'
        };

        await Admin.create(adminUser);

        console.log('Admin User Created!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

const runSeeder = async () => {
    try {
        await connectDB();
        await importData();
    } catch (error) {
        console.error(`\x1b[31m✘ Seeder Failed: ${error.message}\x1b[0m`);
        process.exit(1);
    }
};

runSeeder();
