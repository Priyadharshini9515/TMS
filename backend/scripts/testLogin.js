require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/tms_test';

async function testLogin() {
    await mongoose.connect(MONGODB_URI);
    console.log('Testing login for kumar@example.com...');

    const user = await User.findOne({ email: 'kumar@example.com' }).select('+password');
    if (!user) {
        console.log('User kumar@example.com not found in DB');
        const all = await User.find({}, 'email');
        console.log('Existing emails:', all.map(u => u.email).join(', '));
        mongoose.disconnect();
        return;
    }

    const isMatch = await bcrypt.compare('Passw0rd!', user.password);
    console.log('Login Result:', isMatch ? 'SUCCESS ✅' : 'FAILURE ❌');

    mongoose.disconnect();
}

testLogin().catch(console.error);
