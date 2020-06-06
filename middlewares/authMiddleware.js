const jwt = require('jsonwebtoken');



module.exports = (req, res, next) => {

    // leer token de header
    const token = req.header('x-auth-token');

    // revisar si no hay token
    if (!token)
        return res.status(401).json({ msg: 'No hay token, permiso no válido.' });


    try {
        const cifrado = jwt.verify(token, process.env.SECRET);
        req.usuario = cifrado.usuario;
        next();
    } catch (error) {
        res.status(401).json({ msg: 'Token no válido.', error })
    }

}