require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');
const User = require('../models/User');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/tms_test';

async function listUsers() {
    await mongoose.connect(MONGODB_URI);
    const users = await User.find({}, 'username email role');
    console.log('Total Users:', users.length);
    users.forEach(u => console.log(`- ${u.username} (${u.email}) [${u.role}]`));
    mongoose.disconnect();
}

listUsers();
