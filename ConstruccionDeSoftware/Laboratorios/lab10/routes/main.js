const express = require('express');
const fs = require('fs');
const router = express.Router();

router.get('/', (req, res) => {

    let frases = ["Frase 1", "Frase 2", "Frase 3"];

    res.render('index', { frases: frases });
});

// ABOUT
router.get('/about', (req, res) => {
    res.render('about');
});

// LIST
router.get('/list', (req, res) => {

    let datos = [];

    if (fs.existsSync('data.txt')) {
        const contenido = fs.readFileSync('data.txt', 'utf8');
        datos = contenido.split('\n').filter(d => d);
    }

    res.render('list', { datos: datos });
});

module.exports = router;