const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

// Conexión a MongoDB
const mongoURI = `mongodb://admin:password@mongodb:27017/mydatabase?authSource=admin`;
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("Connected successfully to MongoDB");
});

// Esquema y modelo de MongoDB
const itemSchema = new mongoose.Schema({
    name: String,
    value: String
});
const Item = mongoose.model('Item', itemSchema);

// Definir rutas
app.get('/items', async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (error) {
        res.status(500).send(error.toString());
    }
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
