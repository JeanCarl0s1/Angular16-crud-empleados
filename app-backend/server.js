const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Conexión a la base de datos MongoDB
mongoose.connect('mongodb://localhost:27017/empresa', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', function() {
  console.log('Conectado a la base de datos MongoDB');
});

// Definir un esquema para los empleados
const employeeSchema = new mongoose.Schema({
  nombre: String,
  identificacion: String,
  cargo: String,
  telefono: String,
  salario: String
});

const Employee = mongoose.model('empleados', employeeSchema);

app.use(cors()); // Habilitar CORS
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Rutas CRUD
app.post('/empleados', async (req, res) => {
  try {
    const { nombre, identificacion, cargo, telefono, salario } = req.body;
    const empleado = new Employee({ nombre, identificacion, cargo, telefono, salario });
    await empleado.save();
    res.status(201).json(empleado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get('/empleados', async (req, res) => {
  try {
    const empleados = await Employee.find();
    res.json(empleados);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put('/empleados/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, identificacion, cargo, telefono, salario } = req.body;
    const empleado = await Employee.findByIdAndUpdate(id, { nombre, identificacion, cargo, telefono, salario }, { new: true });
    res.json(empleado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete('/empleados/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Employee.findByIdAndDelete(id);
    res.json({ message: 'Empleado eliminado correctamente' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
