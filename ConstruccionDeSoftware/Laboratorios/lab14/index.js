const express      = require('express');
const path         = require('path');
const cookieParser = require('cookie-parser');
const session      = require('express-session');
const cors         = require('cors');
const helmet       = require('helmet');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(helmet());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

app.use(session({
    secret: 'mi string secreto que debe ser un string aleatorio muy largo, no como éste',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        sameSite: 'lax'
    }
}));

// ---------------- ROUTES ----------------

app.get('/', (request, response) => {
    response.cookie('mi_cookie', '123', { httpOnly: true });
    response.type('text/plain');
    response.send('Hola Mundo');
});

app.get('/test_cookie', (request, response) => {
    const valor = request.cookies.mi_cookie;
    response.type('text/plain');
    response.send(valor || 'No hay cookie llamada mi_cookie');
});

app.get('/test_session', (request, response) => {
    request.session.mi_variable = 'valor';
    response.type('text/plain');
    response.send(request.session.mi_variable);
});

app.get('/test_session_variable', (request, response) => {
    const valor = request.session.mi_variable;
    response.type('text/plain');
    response.send(valor || 'No hay variable de sesión definida. Visita /test_session primero.');
});

app.get('/logout', (request, response) => {
    request.session.destroy(() => {
        response.redirect('/');
    });
});

app.get('/buscar', (request, response) => {
    response.render('buscar', {
        q: request.query.q || ''
    });
});

app.listen(3000, () => {
    console.log('Servidor en http://localhost:3000');
});