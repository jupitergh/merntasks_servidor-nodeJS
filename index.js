const express = require('express');
const conectarDB = require('./config/db');
const usuariosRoute = require('./routes/usuarios.routes');
const authRoute = require('./routes/auth.routes');
const proyectosRoute = require('./routes/proyectos.routes');
const tareasRoute = require('./routes/tareas.routes');
const cors = require('cors');

// crear server
const app = express();

// conectar base de datos
conectarDB();

// cors
app.use(cors());

// Parse body
// app.use(express.urlencoded());
app.use(express.json({ extended: true }));


// puerto
const PORT = process.env.PORT || 4000;

//rutas
app.use('/api/usuarios', usuariosRoute);
app.use('/api/auth', authRoute);
app.use('/api/proyectos', proyectosRoute);
app.use('/api/tareas', tareasRoute);




// start server 
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);

})