const model = require('../models/notas.model.js');

exports.get_lista = async (req, res) => {
    try {
        const notas = await model.Nota.obtenerTodas();
        res.render('notas/lista', {
            notas: notas,
            permisos: req.session.permisos || [],
            username: req.session.username,
        });
    } catch (e) {
        console.error(e);
        res.status(500).send('Error al obtener notas');
    }
};

exports.get_form_crear = (req, res) => {
    res.render('notas/crear', {
        permisos: req.session.permisos || [],
    });
};

exports.post_crear = async (req, res) => {
    try {
        const nota = new model.Nota(
            req.body.titulo,
            req.body.contenido,
            req.session.username
        );
        await nota.crear();
        res.redirect('/notas');
    } catch (e) {
        console.error(e);
        res.status(500).send('Error al crear la nota');
    }
};

exports.get_form_editar = async (req, res) => {
    try {
        const nota = await model.Nota.obtenerPorId(req.params.id);
        if (!nota) return res.status(404).send('Nota no encontrada');
        res.render('notas/editar', {
            nota: nota,
            permisos: req.session.permisos || [],
        });
    } catch (e) {
        console.error(e);
        res.status(500).send('Error al obtener la nota');
    }
};

exports.post_editar = async (req, res) => {
    try {
        await model.Nota.actualizar(
            req.params.id,
            req.body.titulo,
            req.body.contenido
        );
        res.redirect('/notas');
    } catch (e) {
        console.error(e);
        res.status(500).send('Error al editar la nota');
    }
};

exports.post_eliminar = async (req, res) => {
    try {
        await model.Nota.eliminar(req.params.id);
        res.redirect('/notas');
    } catch (e) {
        console.error(e);
        res.status(500).send('Error al eliminar la nota');
    }
};