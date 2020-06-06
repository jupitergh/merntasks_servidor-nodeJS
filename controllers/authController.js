const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.autenticarUsuario = async(req, res) => {
    // revisar si hay errores
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errores: errors.array() });
    }

    const { email, password } = req.body;

    try {
        //     revisar si está registrado
        let usuario = await Usuario.findOne({ email });
        if (!usuario)
            return res.status(400).json({ msg: 'El usuario no existe' });

        // revisar password

        const passCorrecto = await bcryptjs.compare(password, usuario.password);
        if (!passCorrecto)
            return res.status(400).json({ msg: 'Password incorrecto' });

        // crear y firmar el JWT
        const payload = {
            usuario: {
                id: usuario.id
            }
        };
        // firmar jwt
        const token = jwt.sign(payload, process.env.SECRET, {
            expiresIn: 3600 // 1hora
        });


        // mensaje de confirmacion
        res.json({ msg: 'Usuario firmado correctamente', token });


    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 500, msg: 'Error en servidor', error });
    }

};
// obtener usuario autenticado
exports.usuarioAutenticado = async(req, res) => {
    try {
        const usuario = await Usuario.findById(req.usuario.id).select('-password');
        res.json({ usuario });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 500, msg: 'Error en servidor', error });

    }
}