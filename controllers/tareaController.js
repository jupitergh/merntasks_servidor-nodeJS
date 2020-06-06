const Tarea = require('../models/Tarea');
const Proyecto = require('../models/Proyecto');
const { validationResult } = require('express-validator');


// crear tarea

exports.crearTarea = async(req, res) => {
    // revisar si hay errores
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({ errores: errors.array() });


    try {
        const { proyecto } = req.body;
        const existeProyecto = await Proyecto.findById(proyecto);
        if (!existeProyecto)
            return res.status(404).json({ msg: 'Proyecto no encontrado' });

        // revisar si el proyecto actual pertenece al usuario
        if (existeProyecto.creador.toString() !== req.usuario.id)
            return res.status(401).json({ msg: 'No autorizado' });

        //   crear tarea
        const tarea = new Tarea(req.body);
        await tarea.save()
        res.json({ tarea });



    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 500, msg: 'Error en servidor', error });
    }

}

// listar tareas por proyecto

exports.obtenerTareas = async(req, res) => {
    try {
        const { proyecto } = req.query;
        const existeProyecto = await Proyecto.findById(proyecto);
        if (!existeProyecto)
            return res.status(404).json({ msg: 'Proyecto no encontrado' });

        // revisar si el proyecto actual pertenece al usuario
        if (existeProyecto.creador.toString() !== req.usuario.id)
            return res.status(401).json({ msg: 'No autorizado' });

        const tareas = await Tarea.find({ proyecto }).sort({ creado: -1 });

        res.json({ tareas });

    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 500, msg: 'Error en servidor', error });
    }
}

// actualizar tarea
exports.actualizarTarea = async(req, res) => {
    try {
        const { proyecto, nombre, estado } = req.body;

        // revisar si tarea existe
        let tareaExiste = await Tarea.findById(req.params.id);
        if (!tareaExiste)
            return res.status(404).json({ msg: 'No existe tarea.' });

        const existeProyecto = await Proyecto.findById(proyecto);

        // revisar si el proyecto actual pertenece al usuario
        if (existeProyecto.creador.toString() !== req.usuario.id)
            return res.status(401).json({ msg: 'No autorizado' });

        const nuevaTarea = {};

        nuevaTarea.nombre = nombre;
        nuevaTarea.estado = estado;

        tareaExiste = await Tarea.findOneAndUpdate({ _id: req.params.id }, nuevaTarea, { new: true });
        res.json({ tareaExiste });


    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 500, msg: 'Error en servidor', error });
    }
}

exports.eliminarTarea = async(req, res) => {
    try {
        const { proyecto } = req.query;


        // revisar si tarea existe
        let tareaExiste = await Tarea.findById(req.params.id);
        if (!tareaExiste)
            return res.status(404).json({ msg: 'No existe tarea.' });

        const existeProyecto = await Proyecto.findById(proyecto);

        // revisar si el proyecto actual pertenece al usuario
        if (existeProyecto.creador.toString() !== req.usuario.id)
            return res.status(401).json({ msg: 'No autorizado' });

        //   eliminar

        await Tarea.findOneAndRemove({ _id: req.params.id });
        res.json({ msg: 'Tarea eliminada' });

    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 500, msg: 'Error en servidor', error });
    }
}