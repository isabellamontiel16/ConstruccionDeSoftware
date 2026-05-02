const express = require('express');
const path = require('path');
const session = require('express-session');
require('dotenv').config();

const app = express();

// Config
app.set('view engine', 'ejs');
app.set('views', 'views');

// Middlewares
app.use(express.urlencoded({ extended: false }));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

// Rutas
const usuarioRoutes = require('./routes/usuarios.routes.js');
app.use('/usuarios', usuarioRoutes);

// Inicio
app.get('/', (req, res) => {
    res.send('Inicio');
});

app.listen(3000, () => {
    console.log('Servidor en http://localhost:3000');
});