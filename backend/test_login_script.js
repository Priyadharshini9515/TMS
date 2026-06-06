const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
require('dotenv').config();

async function testLogin(email, password) {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            console.log('USER NOT FOUND');
        } else {
            const isMatch = await bcrypt.compare(password, user.password);
            console.log('LOGIN TEST FOR', email, 'WITH', password, ':', isMatch ? 'SUCCESS' : 'FAILURE');
        }
        mongoose.disconnect();
    } catch (err) {
        console.error(err);
    }
}

testLogin('admin@example.com', 'Admin@123');
