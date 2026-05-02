const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

// EJS
app.set('view engine', 'ejs');
app.set('views', 'views');

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
const mainRoutes = require('./routes/main');
const formRoutes = require('./routes/form');

app.use(mainRoutes);
app.use(formRoutes);

// 404
app.use((req, res) => {
    res.status(404).render('404');
});

app.listen(3000);