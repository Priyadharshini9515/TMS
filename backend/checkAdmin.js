const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/tms_test';

async function checkAdmin() {
    await mongoose.connect(MONGODB_URI);
    const admins = await User.find({ role: 'SuperAdmin' }, 'username email');
    console.log('---ADMIN USERS---');
    admins.forEach(a => console.log(`Username: ${a.username}, Email: ${a.email}`));
    console.log('-----------------');
    mongoose.disconnect();
}

checkAdmin();
