const express = require('express');
const app = express();
const port = 3000;

// Ruta de ejemplo
app.get('/', (req, res) => {
  res.send('¡Hola, este es un servidor Express básico!');
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`El servidor está escuchando en http://localhost:${port}`);
});