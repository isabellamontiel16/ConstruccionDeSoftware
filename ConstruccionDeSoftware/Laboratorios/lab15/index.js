const express = require('express');
const session = require('express-session');
require('dotenv').config();

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded({ extended: false }));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

const usuarioRoutes = require('./routes/usuarios.routes.js');
app.use('/usuarios', usuarioRoutes);

app.get('/', (req, res) => {
    res.send('Inicio');
});

app.listen(3000, () => {
    console.log('Servidor en http://localhost:3000');
});