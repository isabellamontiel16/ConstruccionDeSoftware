const http    = require('http');
const express = require('express');
const path    = require('path');
const fs      = require('fs');

const app     = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

// Middleware
app.use((request, response, next) => {
    console.log('Middleware!');
    next();
});

// Rutas
app.get('/', (request, response, next) => {
    response.setHeader('Content-Type', 'text/plain');
    response.send("URL index /");
    response.end();
});

app.get('/test_json', (request, response, next) => {
    response.setHeader('Content-Type', 'application/json');
    response.json({code:200, msg:"Ok GET"});
    response.end();
});

app.post('/test_json', (request, response, next) => {
    response.setHeader('Content-Type', 'application/json');
    response.json({code:200, msg:"Ok POST"});
    response.end();
});

app.get('/test_html', (request, response, next) => {
    response.setHeader('Content-Type', 'text/html');
    response.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="utf-8">
            <title>Código en HTML</title>
        </head>
        <body>
            <h1>hola mundo desde express</h1>
        </body>
        </html>
    `);
    response.end();
});

// Rutas externas (formulario)
const rutasFormulario = require('./routes/formulario.routes');
app.use('/formulario', rutasFormulario);

// Middleware 404
app.use((request, response, next) => {
    console.log('Otro middleware!');
    response.status(404);
    response.send('¡Page Not Found!');
});

// Servidor (como en la práctica)
const server = http.createServer((request, response) => {
    console.log(request.url);
});

app.listen(3000);