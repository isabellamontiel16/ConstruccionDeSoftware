const http = require('http');
const fs = require('fs');

function promedio(arr) {
    let suma = 0;
    for (let num of arr) {
        suma += num;
    }
    return suma / arr.length;
}

function escribirArchivo(texto) {
    fs.writeFileSync('hola.txt', texto);
}

function factorial(n) {
    let resultado = 1;
    for (let i = 1; i <= n; i++) {
        resultado *= i;
    }
    return resultado;
}

console.log("=== PRUEBAS NODE ===");
console.log("Promedio:", promedio([10, 20, 30, 40]));
console.log("Factorial:", factorial(5));

escribirArchivo("Hola desde Node.js - archivo creado con fs");

const server = http.createServer((req, res) => {

    console.log(req.url);
    res.setHeader('Content-Type', 'text/html');

    if (req.url === "/") {

        res.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="utf-8">
            <title>App Node</title>
        </head>
        <body>
            <h1>Servidor en Node.js</h1>
            <p>Bienvenido a la página principal</p>
        </body>
        </html>
        `);

    } 
    
    else if (req.url === "/info") {

        res.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="utf-8">
            <title>Información</title>
        </head>
        <body>
            <h1>Información del servidor</h1>
            <p>Este servidor usa Node.js con el módulo http</p>
        </body>
        </html>
        `);

    } 
    
    else if (req.url === "/promedio") {

        const resultado = promedio([10, 20, 30, 40]);

        res.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="utf-8">
            <title>Promedio</title>
        </head>
        <body>
            <h1>Promedio</h1>
            <p>El promedio es: ${resultado}</p>
        </body>
        </html>
        `);

    } 
    
    else if (req.url === "/factorial") {

        const resultado = factorial(5);

        res.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="utf-8">
            <title>Factorial</title>
        </head>
        <body>
            <h1>Factorial</h1>
            <p>El factorial de 5 es: ${resultado}</p>
        </body>
        </html>
        `);

    } 
    
    else {

        res.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="utf-8">
            <title>Error 404</title>
        </head>
        <body>
            <h1>404</h1>
            <p>Página no encontrada: ${req.url}</p>
        </body>
        </html>
        `);

    }

    res.end();
});

server.listen(3001);

console.log("Servidor corriendo en http://localhost:3001");