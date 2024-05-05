const express = require('express');
const Item = require('../models/itemModel');

const router = express.Router();


router.get('/items', async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (error) {
        res.status(500).send("Error del servidor: " + error.toString());
    }
});


router.post('/items', async (req, res) => {
    try {
        const newItem = new Item(req.body);
        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (error) {
        if (error.code === 11000) {
            res.status(409).send("Error: el correo electrónico ya está registrado.");
        } else if (error.name === 'ValidationError') {
            let errors = [];
            for (field in error.errors) {
                errors.push(error.errors[field].message);
            }
            res.status(400).send("Errores de validación: " + errors.join(', '));
        } else {
            res.status(500).send("Error del servidor: " + error.toString());
        }
    }
});


router.get('/items/search', async (req, res) => {
    const email = req.query.email;
    if (!email) {
        return res.status(400).send("Es necesario especificar un correo electrónico para la búsqueda.");
    }

    try {
        const items = await Item.find({ email: email });
        if (items.length > 0) {
            res.json(items);
        } else {
            res.status(404).send('No se encontraron documentos coincidentes con ese correo electrónico.');
        }
    } catch (error) {
        res.status(500).send("Error del servidor: " + error.toString());
    }
});


router.put('/items', async (req, res) => {
    const emailParam = req.query.email;
    const update = req.body;

    if (!emailParam) {
        return res.status(400).send("Es necesario especificar un correo electrónico.");
    }

    // Eliminar el campo de email del cuerpo del request para prevenir cambios no deseados
    if (update.email && update.email !== emailParam) {
        return res.status(400).send("No se puede cambiar el correo electrónico mediante esta operación.");
    }

    try {
        const options = { new: true };
        const result = await Item.findOneAndUpdate({ email: emailParam }, update, options);

        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).send("No se encontró ningún elemento con ese correo electrónico.");
        }
    } catch (error) {
        res.status(500).send("Error del servidor: " + error.toString());
    }
});



router.delete('/items', async (req, res) => {
    const email = req.query.email;
    if (!email) {
        return res.status(400).send("Es necesario especificar un correo electrónico para eliminar.");
    }

    try {
        const result = await Item.deleteMany({ email: email });
        if (result.deletedCount === 0) {
            res.status(204).send('No hay contenido para eliminar.');
        } else {
            res.status(200).send(`Se eliminaron ${result.deletedCount} elementos con el correo electrónico proporcionado.`);
        }
    } catch (error) {
        res.status(500).send("Error del servidor: " + error.toString());
    }
});

module.exports = router;
