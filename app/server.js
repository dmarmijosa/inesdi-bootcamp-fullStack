const express = require('express');
const mongoose = require('mongoose');

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Configuración de Swagger
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Node MongoDB API for INESDI',
      version: '1.0.0',
      description: 'This is a simple CRUD API application made with Express and documented with Swagger',
      contact: {
        name: "INESDI",
        url: "https://www.inesdi.com",
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development Server'
      }
    ],
  },
  apis: ['./server.js'], // Path to the API docs
};



const app = express();

const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

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



const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
