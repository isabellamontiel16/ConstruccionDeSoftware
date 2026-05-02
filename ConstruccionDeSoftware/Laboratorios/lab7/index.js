const http = require('http');

const server = http.createServer((req, res) => {

    console.log(req.url);

    res.setHeader('Content-Type', 'text/html');

    if (req.url === "/") {

        res.write(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="utf-8">
                <title>Lab 6</title>
            </head>
            <body>
                <h1>Hola mundo desde Node.js</h1>
                <p>Servidor básico funcionando</p>
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
                <p>Este servidor fue creado con Node.js usando el módulo http</p>
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

server.listen(3000);

console.log("Servidor corriendo en http://localhost:3000");