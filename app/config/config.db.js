const mongoose = require('mongoose');

const mongoURI = 'mongodb://admin:password@mongodb:27017/testdb?authSource=admin';

const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected successfully to MongoDB");
    } catch (error) {
        console.error("connection error:", error);
    }
};

module.exports = connectDB;
