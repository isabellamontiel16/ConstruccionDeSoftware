const express = require('express');
const path = require('path');
const app = express();
const cookieParser = require('cookie-parser');
const session = require("express-session");
const cors = require('cors');
const { doubleCsrf } = require('csrf-csrf');
const helmet = require('helmet');


app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            "script-src":  ["'self'", "https://cdn.jsdelivr.net"],
            "style-src":   ["'self'", "https://fonts.googleapis.com", "'unsafe-inline'"],
            "font-src":    ["'self'", "https://fonts.gstatic.com"],
            "img-src":     ["'self'", "data:", "https:"]
        }
    }
}));

const {
    generateCsrfToken,
    doubleCsrfProtection,
} = doubleCsrf({
    getSecret: () => process.env.CSRF_SECRET || 'cambia-esto-en-desarrollo',
    getSessionIdentifier: (req) => req.session.id,
    cookieName: 'x-csrf-token',
    cookieOptions: { httpOnly: true, sameSite: 'lax', secure: false },
    getCsrfTokenFromRequest: (req) =>
        req.body['x-csrf-token'] || req.headers['x-csrf-token']
});

app.use(cors({
    origin: [
        "https://miapp.com",
        "https://www.miapp.com",
        "http://localhost:3000",
        "http://google.fonts.com",
        "http://cdn.jsdelivr.net",
        "https://cdn.jsdelivr.net"
    ],
    credentials: true
}));

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(cookieParser());

app.use(session({
    secret: 'mi string secreto que debe ser un string aleatorio muy largo, no como éste',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        sameSite: "lax",
        secure: false
    }
}));

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(doubleCsrfProtection);

app.use((req, res, next) => {
    res.locals.csrfToken = generateCsrfToken(req, res);
    next();
});

function sameOriginOnly(req, res, next) {
    const origen = req.headers.origin || req.headers.referer || '';
    if (!origen.startsWith('http://localhost:3000')) {
        return res.status(403).send('Origen no permitido');
    }
    next();
}

app.get('/', (req, res) => {
    res.cookie("mi_cookie", "123", {
        httpOnly: true,
        sameSite: "lax",
        secure: false
    });
    res.type('text/plain');
    res.send('Hola Mundo');
});

app.get("/test_cookie", (req, res) => {
    const valor = req.cookies.mi_cookie;
    res.type('text/plain');
    res.send(valor || "No hay cookie llamada mi_cookie");
});

app.get("/test_session", (req, res) => {
    req.session.mi_variable = "valor";
    res.type('text/plain');
    res.send(req.session.mi_variable);
});

app.get("/test_session_variable", (req, res) => {
    const valor = req.session.mi_variable;
    res.type('text/plain');
    res.send(valor || "No hay variable de sesión llamada mi_variable");
});

app.get("/logout", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/");
    });
});

app.get("/buscar", (req, res) => {
    res.render("buscar", { q: req.query.q || "" });
});

app.get('/transferir', (req, res) => {
    res.render('transferir');
});

app.post('/transferir', sameOriginOnly, (req, res) => {
    const { monto } = req.body;
    res.send(`Transferencia realizada: $${monto}`);
});

app.listen(3000, () => {
    console.log('Servidor en http://localhost:3000');
});