require('dotenv').config();

const express = require('express');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const gameRoutes = require('./routes/game.routes');
app.use('/games', gameRoutes);

app.get('/', (req, res) => {
  res.send('Hola Mundo — Lab17BDSupabase');
});

const pool = require('./util/database');

app.listen(3000, () => {
  console.log('Servidor en http://localhost:3000');
});