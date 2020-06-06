const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.crearUsuario = async(req, res) => {

    // revisar si hay errores
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({ errores: errors.array() });


    const { email, password } = req.body;

    try {

        // revisar si email es unico
        let usuario = await Usuario.findOne({ email });

        if (usuario) {
            return res.status(400).json({ msg: 'El usuario ya existe' });
        }
        // crear nuevo usuario
        usuario = new Usuario(req.body);

        // hash password
        const salt = await bcryptjs.genSalt(10);
        usuario.password = await bcryptjs.hash(password, salt);


        // guardar usuario
        await usuario.save();

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
        res.json({ msg: 'Usuario creado correctamente', token });

    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 500, msg: 'Error en servidor', error });

    }

}