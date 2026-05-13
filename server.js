const express = require('express');
const cors = require('cors');
const db = require('./models');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Importar rutas
const studentRoutes = require('./routes/students');
const professorRoutes = require('./routes/professors');
const courseRoutes = require('./routes/courses');
const enrollmentRoutes = require('./routes/enrollments');

// Usar rutas
app.use('/api/students', studentRoutes);
app.use('/api/professors', professorRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/enrollments', enrollmentRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ message: 'API Universidad - Sequelize' });
});

// Sincronizar base de datos y levantar servidor
async function startServer() {
  try {
    await db.sequelize.authenticate();
    console.log('✓ Conexión a la base de datos establecida.');

    // Sincronizar modelos (alter: true actualiza sin borrar datos)
    await db.sequelize.sync({ alter: true });
    console.log('✓ Modelos sincronizados con la base de datos.');

    app.listen(PORT, () => {
      console.log(`✓ Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('✗ Error al iniciar el servidor:', error);
    process.exit(1);
  }
}

startServer();
