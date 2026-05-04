const express        = require('express');
const router         = express.Router();
const controller     = require('../controllers/notas.controller.js');
const isAuth         = require('../util/is-auth.js');
const hasPermission  = require('../util/has-permission.js');

// Ver lista de notas
router.get('/', isAuth, hasPermission('ver_notas'), controller.get_lista);

// Crear nueva nota (formulario + envío)
router.get('/crear',  isAuth, hasPermission('crear_nota'), controller.get_form_crear);
router.post('/crear', isAuth, hasPermission('crear_nota'), controller.post_crear);

// Editar nota existente
router.get('/:id/editar',  isAuth, hasPermission('editar_nota'), controller.get_form_editar);
router.post('/:id/editar', isAuth, hasPermission('editar_nota'), controller.post_editar);

// Eliminar nota
router.post('/:id/eliminar', isAuth, hasPermission('eliminar_nota'), controller.post_eliminar);

module.exports = router;