const express = require('express');
const router = express.Router();
const { crearTarea, obtenerTareas, actualizarTarea, eliminarTarea } = require('../controllers/tareaController');
const auth = require('../middlewares/authMiddleware');
const { check } = require('express-validator');


// api/tareas

// crear tareas

router.post('/', [auth], [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('proyecto', 'El proyecto es obligatorio').not().isEmpty()
], crearTarea);


// listar tareas por proyecto
router.get('/', [auth], obtenerTareas);

// actualizar tarea
router.put('/:id', [auth], actualizarTarea);

// eliminar tarea
router.delete('/:id', [auth], eliminarTarea);

module.exports = router;