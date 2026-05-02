const model = require('../models/usuarios.model.js');
const bcrypt = require('bcryptjs');

exports.render_login = (req, res) => {
    res.render('usuarios/registro', { registro: false });
};

exports.do_login = async (req, res) => {
    try {
        const usuario = await model.User.findByUsername(req.body.username);
        if (!usuario) {
            return res.redirect('/usuarios/login');
        }

        const doMatch = await bcrypt.compare(req.body.password, usuario.password);
        if (!doMatch) {
            return res.redirect('/usuarios/login');
        }

        req.session.username   = usuario.username;
        req.session.isLoggedIn = true;
        res.redirect('/usuarios/logged');

    } catch (e) {
        console.error(e);
        res.redirect('/usuarios/login');
    }
};

exports.get_logged = async (req, res) => {
    const usuario = await model.User.findByUsername(req.session.username);
    if (!usuario) return res.redirect('/usuarios/login');
    res.render('usuarios/logged', { user: usuario });
};


exports.get_registro = (req, res) => {
    res.render('usuarios/registro', { registro: true });
};

exports.post_registro = async (req, res) => {
    try {
        const { username, name, password } = req.body;
        const user = new model.User(username, name, password);
        await user.save();
        res.status(201).redirect('/usuarios/login');
    } catch (e) {
        console.error(e);
        res.status(500).send('Error registrando usuario');
    }
};

