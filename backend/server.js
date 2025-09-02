require('dotenv').config();
const app = require('./src/app');
const { syncDatabase } = require('./src/models/index');

const PORT = process.env.PORT || 3001;

// Función para iniciar servidor
const startServer = async () => {
  try {
    // Recrear tablas con nueva estructura
    await syncDatabase(false);
    
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Error iniciando servidor:', error);
  }
};

startServer();