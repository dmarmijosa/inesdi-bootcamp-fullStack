const express = require('express');
const router = express.Router();
const itemService = require('../services/itemService');

/**
 * @swagger
 * components:
 *   schemas:
 *     Item:
 *       type: object
 *       required:
 *         - first_name
 *         - last_name
 *         - email
 *         - gender
 *         - address
 *         - card
 *         - married_status
 *       properties:
 *         first_name:
 *           type: string
 *         last_name:
 *           type: string
 *         email:
 *           type: string
 *         gender:
 *           type: string
 *         address:
 *           type: object
 *           properties:
 *             city:
 *               type: string
 *             state:
 *               type: string
 *             country:
 *               type: string
 *             country_code:
 *               type: string
 *         card:
 *           type: object
 *           properties:
 *             card_number:
 *               type: string
 *             card_type:
 *               type: string
 *             currency_code:
 *               type: string
 *             balance:
 *               type: string
 *         married_status:
 *           type: boolean
 *   responses:
 *     NotFound:
 *       description: The item was not found
 *     BadRequest:
 *       description: Invalid request
 *     Unauthorized:
 *       description: Authentication is needed to get requested response
 */

/**
 * @swagger
 * /items:
 *   get:
 *     summary: Get all items
 *     tags: [Items]
 *     responses:
 *       200:
 *         description: List of items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Item'
 */

/**
 * @swagger
 * /items/search:
 *   get:
 *     summary: Search items based on query parameters
 *     tags: [Items]
 *     parameters:
 *       - in: query
 *         name: first_name
 *         schema:
 *           type: string
 *         description: First name of the person to match
 *       - in: query
 *         name: last_name
 *         schema:
 *           type: string
 *         description: Last name of the person to match
 *     responses:
 *       200:
 *         description: An array of items that match the query
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Item'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /items:
 *   put:
 *     summary: Update an item
 *     tags: [Items]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Item'
 *     responses:
 *       200:
 *         description: The item was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /items:
 *   delete:
 *     summary: Delete items based on query parameters
 *     tags: [Items]
 *     parameters:
 *       - in: query
 *         name: first_name
 *         schema:
 *           type: string
 *         description: First name of the person to delete
 *     responses:
 *       200:
 *         description: The number of deleted items
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 deletedCount:
 *                   type: integer
 *       204:
 *         description: No items found to delete
 */

router.get('/items', async (req, res) => {
    try {
        const items = await itemService.getAllItems();
        res.json(items);
    } catch (error) {
        res.status(500).send(error.toString());
    }
});

router.get('/items/search', async (req, res) => {
    try {
        const query = req.query;
        const items = await itemService.searchItems(query);
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
        const result = await itemService.updateItem(query, update, options);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).send(error.toString());
    }
});

router.delete('/items', async (req, res) => {
    try {
        const query = req.query;
        const result = await itemService.deleteItems(query);
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
