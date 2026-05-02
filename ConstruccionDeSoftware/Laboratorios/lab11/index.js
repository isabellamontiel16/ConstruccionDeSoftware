const http    = require('http');
const express = require('express');
const path    = require('path');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Ruta principal
app.get('/', (req, res) => {
    res.send("Hola Mundo");
});

// Rutas de usuarios
const rutasUsuarios = require('./routes/usuarios.routes');
app.use('/usuarios', rutasUsuarios);

app.listen(3000, () => {
    console.log("http://localhost:3000");
});