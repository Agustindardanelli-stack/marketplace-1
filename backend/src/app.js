const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products')); 
app.use('/api/categories', require('./routes/categories'));

// Ruta de prueba
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running!' });
});

module.exports = app;