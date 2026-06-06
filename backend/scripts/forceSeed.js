require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/tms_test';

async function resetAndSeed() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to DB');

        // Delete existing users to avoid confusion
        await User.deleteMany({});
        console.log('Cleared all existing users');

        const hashedPassword = await bcrypt.hash('Passw0rd!', 10);

        const users = [
            {
                username: 'superadmin',
                email: 'admin@example.com',
                phone: '1234567890',
                password: hashedPassword,
                role: 'SuperAdmin',
            },
            {
                username: 'john_user',
                email: 'user@example.com',
                phone: '1234567891',
                password: hashedPassword,
                role: 'User',
            },
            {
                username: 'kumar_plumber',
                email: 'plumber@example.com',
                phone: '1234567892',
                password: hashedPassword,
                role: 'Plumber',
            },
            {
                username: 'selvam_electrician',
                email: 'electrician@example.com',
                phone: '1234567893',
                password: hashedPassword,
                role: 'Electrician',
            },
            {
                username: 'rahul_network',
                email: 'network@example.com',
                phone: '1234567894',
                password: hashedPassword,
                role: 'Networking Staff',
            }
        ];

        await User.insertMany(users);
        console.log('Successfully seeded 5 users with password: Passw0rd!');

        mongoose.disconnect();
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

resetAndSeed();
