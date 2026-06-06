require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Department = require('../models/Department');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/tms_test';

async function seed() {
    await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to DB');

    const cseDept = await Department.findOne({ shortName: 'CSE' });
    const eceDept = await Department.findOne({ shortName: 'ECE' });

    const password = await bcrypt.hash('Passw0rd!', 10);

    const users = [
        {
            username: 'kumar_plumber',
            email: 'kumar@example.com',
            phone: '9876543210',
            password,
            role: 'Plumber',
            department: cseDept?._id
        },
        {
            username: 'selvam_elec',
            email: 'selvam@example.com',
            phone: '9876543211',
            password,
            role: 'Electrician',
            department: eceDept?._id
        },
        {
            username: 'rahul_network',
            email: 'rahul@example.com',
            phone: '9876543212',
            password,
            role: 'Networking Staff',
            department: cseDept?._id
        },
        {
            username: 'john_user',
            email: 'john@example.com',
            phone: '9876543213',
            password,
            role: 'User',
            department: cseDept?._id
        },
        {
            username: 'hardware_expert',
            email: 'hardware@example.com',
            phone: '9876543214',
            password,
            role: 'PC Hardware',
            department: eceDept?._id
        }
    ];

    for (const userData of users) {
        let user = await User.findOne({ email: userData.email });
        if (!user) {
            user = await User.create(userData);
            console.log(`Created User: ${user.username} (${user.role})`);
        } else {
            console.log(`User exists: ${user.username}`);
        }
    }

    console.log('User seeding complete!');
    mongoose.disconnect();
}

seed().catch(err => {
    console.error(err);
    process.exit(1);
});
