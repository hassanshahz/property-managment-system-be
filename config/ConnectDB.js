const mongoose = require('mongoose');

const connectDb = async () => {
try {
    await mongoose.connect(process.env.CONNECTION_STRING);
    console.log('Database connected successfully');
} catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
};
};

module.exports = connectDb;