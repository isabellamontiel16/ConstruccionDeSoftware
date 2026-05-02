const express = require('express');
const router = express.Router();

const controller = require('../controllers/usuarios.controller');

// Ruta MVC
router.get('/obtener_usuarios', controller.index);

module.exports = router;