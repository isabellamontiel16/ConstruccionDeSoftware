const express = require('express');
const fs = require('fs');
const router = express.Router();

// FORM
router.get('/form', (req, res) => {
    res.render('form');
});

// POST
router.post('/add', (req, res) => {
    const dato = req.body.nombre;
    fs.appendFileSync('data.txt', dato + '\n');
    res.redirect('/list');
});

module.exports = router;