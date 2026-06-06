const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
require('dotenv').config();

async function addDocAdmin() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const email = 'superadmin@example.com';
        const password = 'SuperAdmin@123';
        
        let user = await User.findOne({ email });
        if (user) {
            console.log('User exists, updating password...');
            user.password = await bcrypt.hash(password, 10);
            await user.save();
        } else {
            console.log('Creating user superadmin@example.com...');
            const hashedPassword = await bcrypt.hash(password, 10);
            await User.create({
                username: 'superadmin_official',
                email,
                password: hashedPassword,
                phone: '1234567890',
                role: 'SuperAdmin'
            });
        }
        console.log('Done!');
        mongoose.disconnect();
    } catch (err) {
        console.error(err);
    }
}

addDocAdmin();
