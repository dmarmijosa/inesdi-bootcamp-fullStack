const express = require('express');
const Item = require('../models/itemModel');

const router = express.Router();

router.get('/items', async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (error) {
        res.status(500).send(error.toString());
    }
});

router.get('/items/search', async (req, res) => {
    try {
        const query = req.query;
        const items = await Item.find(query);
        res.json(items.length > 0 ? items : 'No matching documents.');
    } catch (error) {
        res.status(500).send(error.toString());
    }
});

router.put('/items', async (req, res) => {
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

router.delete('/items', async (req, res) => {
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

module.exports = router;
