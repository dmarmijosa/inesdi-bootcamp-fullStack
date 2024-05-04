const express = require('express');
const connectDB = require('./config/db');
const itemRoutes = require('./routes/itemRoutes');

const app = express();
app.use(express.json());
connectDB();

app.use('/api', itemRoutes); // Configurar las rutas bajo el prefijo /api

module.exports = app;
