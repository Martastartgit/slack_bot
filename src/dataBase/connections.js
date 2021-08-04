const mongoose = require('mongoose');

const { MONGO_URL } = require('../config/config');

const connectDB = async () => {
    await mongoose.connect(MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    });
    console.log('DB connect!');
};

module.exports = connectDB;
