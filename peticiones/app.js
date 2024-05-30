const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();

// Configuración de CORS
app.use(cors());
const PORT = 3000; // Puerto específico

// Configurar la conexión a la base de datos MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'persona'
});

// Conectar a la base de datos
connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log('Conexión a la base de datos MySQL establecida');
});

// Middleware para parsear JSON
app.use(express.json());

// Ruta para obtener los datos de personas desde la base de datos
app.get('/CRUDRepo/ConsultarPersonas', (req, res) => {
  // Realizar consulta SQL para obtener los datos de las personas
  connection.query('SELECT * FROM humano', (err, results) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
      return;
    }
    // Enviar los resultados como respuestaexpress en formato JSON
    res.json(results);
  });
});

// Ruta para agregar una nueva persona
app.post('/CRUDRepo/AgregarPersona', (req, res) => {
    const { nombre, apellido, email, edad} = req.body;
    connection.query('INSERT INTO humano (nombre, apellido, email, edad) VALUES (?, ?, ?, ?)', [nombre, apellido, email, edad], (err, results) => {
      if (err) {
        console.error('Error al agregar la persona:', err);
        res.status(500).json({ error: 'Error interno del servidor' });
        return;
      }
      res.status(201).json({ message: 'Persona agregada exitosamente' });
    });
  });

// Ruta para actualizar los datos de una persona
app.put('/CRUDRepo/ActualizarPersona/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, edad } = req.body;
  connection.query('UPDATE humano SET nombre = ?, edad = ? WHERE id = ?', [nombre, edad, id], (err, results) => {
    if (err) {
      console.error('Error al actualizar la persona:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
      return;
    }
    res.json({ message: 'Datos de la persona actualizados exitosamente' });
  });
});

// Ruta para eliminar una persona
app.delete('/CRUDRepo/EliminarPersona/:id', (req, res) => {
  const { id } = req.params;
  connection.query('DELETE FROM humano WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('Error al eliminar la persona:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
      return;
    }
    res.json({ message: 'Persona eliminada exitosamente' });
  });
});

// Manejo de errores para rutas no encontradas
app.use((req, res, next) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Manejador de errores genérico
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});

// Iniciar el servidor en el puerto específico
app.listen(PORT, ()=> {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});