const express = require('express');
const router  = express.Router();
const controller = require('../controllers/usuarios.controller.js');

const isAuth = require('../util/is-auth.js');

router.get('/logged', isAuth, controller.get_logged);

router.get('/registro',  controller.get_registro);
router.post('/registro', controller.post_registro);
router.get('/login',  controller.render_login);
router.post('/login', controller.do_login);
router.get('/logged', controller.get_logged);

module.exports = router;