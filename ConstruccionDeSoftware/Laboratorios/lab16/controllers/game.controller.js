const model = require('../models/game.model');

exports.index = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const pageSize = 20;

        const [juegos, total] = await Promise.all([
            model.fetchAll(page, pageSize),
            model.count()
        ]);

        const totalPages = Math.ceil(total / pageSize);

        res.render('games', {
            juegos,
            page,
            totalPages,
            total
        });

    } catch (e) {
        console.log(e);
        res.status(500).send('Error al cargar juegos');
    }
};

// búsqueda segura
exports.buscarSeguro = async (req, res) => {
    const titulo = req.query.titulo || '';
    const resultados = await model.findByTitle(titulo);

    res.render('buscar', {
        titulo,
        resultados,
        modo: 'seguro'
    });
};

// búsqueda insegura
exports.buscarInseguro = async (req, res) => {
    const titulo = req.query.titulo || '';
    const resultados = await model.findByTitleInsegura(titulo);

    res.render('buscar', {
        titulo,
        resultados,
        modo: 'inseguro'
    });
};