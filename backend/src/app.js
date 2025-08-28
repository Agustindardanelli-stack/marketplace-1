const express = require('express');
const cors = require('cors');
const { syncDatabase } = require('./models');

const app = express();

// Middlewares básicos
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sincronizar BD (crear tablas)
syncDatabase(true); // force: true para recrear

// Ruta de prueba
app.get('/api/test', (req, res) => {
  res.json({ 
    message: '🎉 Backend funcionando!', 
    timestamp: new Date().toISOString() 
  });
});

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

module.exports = app;