const mongoose = require('mongoose');

const mongoURI = 'mongodb://admin:password@mongodb:27017/testdb?authSource=admin';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("Connected successfully to MongoDB");
});

module.exports = mongoose;
