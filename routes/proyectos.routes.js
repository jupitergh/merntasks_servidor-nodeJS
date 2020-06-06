const express = require('express');
const router = express.Router();
const { crearProyecto, obtieneProyectos, actualizarProyecto, eliminarProyecto } = require('../controllers/proyectoController');
const auth = require('../middlewares/authMiddleware');
const { check } = require('express-validator');
// api/proyectos

// crear proyecto
router.post('/', [auth], [
    check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()
], crearProyecto);


// listar proyectos
router.get('/', [auth], obtieneProyectos);

// actualizar proyecto por ID
router.put('/:id', [auth], actualizarProyecto);

// eliminar proyecto por ID
router.delete('/:id', [auth], eliminarProyecto);











module.exports = router;