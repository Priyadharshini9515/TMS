const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

async function run() {
    try {
        console.log('Connecting to:', process.env.MONGODB_URI);
        await mongoose.connect(process.env.MONGODB_URI);
        const user = await User.findOne({ email: 'admin@example.com' });
        if (user) {
            console.log('FOUND:', user.email, user.role);
        } else {
            console.log('NOT FOUND: admin@example.com');
            const all = await User.find({}, 'email');
            console.log('ALL EMAILS:', all.map(u => u.email));
        }
        mongoose.disconnect();
    } catch (err) {
        console.error('ERROR:', err);
    }
}

run();
