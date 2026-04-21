const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {

    switch(req.url){

        case "/":
            res.setHeader("Content-Type", "text/plain");
            res.write("URL index /");
            res.end();
            break;

        case "/test_json":
            if(req.method === "GET"){
                res.setHeader("Content-Type", "application/json");
                res.write(JSON.stringify({code: 200, msg: "Ok GET"}));
                res.end();
            } else if(req.method === "POST"){
                res.setHeader("Content-Type", "application/json");
                res.write(JSON.stringify({code: 200, msg: "Ok POST"}));
                res.end();
            }
            break;

        case "/test_html":
            res.setHeader("Content-Type", "text/html");
            res.write(`
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="utf-8">
                    <title>HTML</title>
                </head>
                <body>
                    <h1>Hola mundo desde Node</h1>
                </body>
                </html>
            `);
            res.end();
            break;

        case "/form_method":

            if(req.method === "GET"){
                res.setHeader("Content-Type", "text/html");
                const html = fs.readFileSync(
                    path.resolve(__dirname, "./form.html"),
                    "utf8"
                );
                res.write(html);
                res.end();
            }

            else if(req.method === "POST"){

                let body = [];

                req.on("data", chunk => {
                    body.push(chunk);
                });

                req.on("end", () => {
                    body = Buffer.concat(body).toString();

                    console.log("BODY:", body);

                    const indice = Number(body.split("&")[0].split("=")[1]);
                    const imprimir = body.split("&")[1].split("=")[1];

                    console.log("Indice:", indice);
                    console.log("Texto:", imprimir);

                    for(let i = 1; i <= indice; i++){
                        console.log(imprimir);
                    }

                    fs.appendFileSync("datos.txt", `${indice} - ${imprimir}\n`);

                    res.setHeader("Content-Type", "application/json");
                    res.statusCode = 200;
                    res.write(JSON.stringify({code: 200, msg: "Datos guardados"}));
                    res.end();
                });
            }
            break;

        default:
            res.statusCode = 404;
            res.setHeader("Content-Type", "text/plain");
            res.write("404 Not Found");
            res.end();
            break;
    }
});

server.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000");
});