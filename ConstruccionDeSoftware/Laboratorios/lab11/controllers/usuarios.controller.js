const model = require('../models/usuarios.model');

module.exports.index = (req, res) => {
    const usuarios = model.ObtenerUsuarios();

    console.log(usuarios.length);

    res.render('./usuarios/obtener_usuarios', {
        usuarios: usuarios
    });
};