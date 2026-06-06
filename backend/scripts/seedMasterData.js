require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');
const Department = require('../models/Department');
const Programme = require('../models/Programme');
const Block = require('../models/Block');
const Room = require('../models/Room');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/tms_test';

async function seed() {
    await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to DB');

    // Clear existing data (optional, but good for a fresh seed)
    // await Department.deleteMany({});
    // await Programme.deleteMany({});
    // await Block.deleteMany({});
    // await Room.deleteMany({});

    const departments = [
        { name: 'Computer Science & Engineering', shortName: 'CSE', description: 'Department of CSE' },
        { name: 'Electronics & Communication', shortName: 'ECE', description: 'Department of ECE' },
        { name: 'Electrical & Electronics', shortName: 'EEE', description: 'Department of EEE' }
    ];

    for (const deptData of departments) {
        let dept = await Department.findOne({ shortName: deptData.shortName });
        if (!dept) {
            dept = await Department.create(deptData);
            console.log(`Created Dept: ${dept.shortName}`);
        }

        const programmes = [
            { name: 'B.E. ' + dept.shortName, shortName: 'BE' + dept.shortName, department: dept._id },
            { name: 'M.E. ' + dept.shortName, shortName: 'ME' + dept.shortName, department: dept._id }
        ];

        for (const progData of programmes) {
            let prog = await Programme.findOne({ shortName: progData.shortName });
            if (!prog) {
                prog = await Programme.create(progData);
                console.log(`  Created Prog: ${prog.shortName}`);
            }

            const blocks = [
                { name: dept.shortName + ' Main Block', department: dept._id, programme: prog._id },
                { name: dept.shortName + ' Lab Block', department: dept._id, programme: prog._id }
            ];

            for (const blockData of blocks) {
                let block = await Block.findOne({ name: blockData.name });
                if (!block) {
                    block = await Block.create(blockData);
                    console.log(`    Created Block: ${block.name}`);
                }

                const rooms = [
                    { roomNumber: block.name[0] + '101', department: dept._id, programme: prog._id, block: block._id, floor: 1 },
                    { roomNumber: block.name[0] + '205', department: dept._id, programme: prog._id, block: block._id, floor: 2 }
                ];

                for (const roomData of rooms) {
                    let room = await Room.findOne({ roomNumber: roomData.roomNumber, block: block._id });
                    if (!room) {
                        room = await Room.create(roomData);
                        console.log(`      Created Room: ${room.roomNumber}`);
                    }
                }
            }
        }
    }

    console.log('Seeding complete!');
    mongoose.disconnect();
}

seed().catch(err => {
    console.error(err);
    process.exit(1);
});
