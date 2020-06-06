const express = require('express');
const { check } = require('express-validator');
const { autenticarUsuario, usuarioAutenticado } = require('../controllers/authController');
const auth = require('../middlewares/authMiddleware');

const router = express.Router();

//  api/auth , iniciar sesion
router.post('/', [
    check('email', 'Agrega un email válido').isEmail(),
    check('password', 'El password debe ser mínimo de 6 caracteres').isLength({ min: 6 })
], autenticarUsuario);

// obtiene usuario autenticado
router.get('/', [auth], usuarioAutenticado);



module.exports = router;