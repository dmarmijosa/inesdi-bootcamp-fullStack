const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

// Configuración de Mongoose
const mongoURI = 'mongodb://admin:password@mongodb:27017/testdb?authSource=admin';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("Connected successfully to MongoDB");
});

// Definir el esquema y modelo
const itemSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    gender: String,
    address: {
        city: String,
        state: String,
        country: String,
        country_code: String
    },
    card: {
        card_number: String,
        card_type: String,
        currency_code: String,
        balance: String
    },
    married_status: Boolean
}, { collection: 'mycollection' });

const Item = mongoose.model('Item', itemSchema);

// Ruta para obtener todos los documentos
app.get('/items', async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (error) {
        res.status(500).send(error.toString());
    }
});

// Ruta para obtener documentos basados en un query específico
app.get('/items/search', async (req, res) => {
    try {
        const query = req.query;
        const items = await Item.find(query);
        res.json(items.length > 0 ? items : 'No matching documents.');
    } catch (error) {
        res.status(500).send(error.toString());
    }
});

// Ruta para actualizar documentos
app.put('/items', async (req, res) => {
    try {
        const query = req.query;
        const update = req.body;
        const options = { new: true, upsert: true };
        const result = await Item.findOneAndUpdate(query, update, options);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).send(error.toString());
    }
});

// Ruta para eliminar documentos
app.delete('/items', async (req, res) => {
    try {
        const query = req.query;
        const result = await Item.deleteMany(query);
        if (result.deletedCount === 0) {
            res.status(204).send('No content to delete.');
        } else {
            res.status(200).send(`Deleted ${result.deletedCount} items.`);
        }
    } catch (error) {
        res.status(500).send(error.toString());
    }
});

// Definir el puerto y poner a escuchar al servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
