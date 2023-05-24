const express = require("express");
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

// routerji
var artikelRouter = require('./routes/artikel');
var kategorijaRouter = require('./routes/kategorija');
var nakupRouter = require('./routes/nakup');
var pogovorRouter = require('./routes/pogovor');
var profilRouter = require('./routes/profil');
var uporabnikRouter = require('./routes/uporabnik');
var zamenjavaRouter = require('./routes/zamenjava');
var obvestiloRouter = require('./routes/obvestilo')

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// uporaba routerjev
app.use('/artikel/', artikelRouter);
app.use('/kategorija/', kategorijaRouter);
app.use('/nakup/', nakupRouter);
app.use('/pogovor/', pogovorRouter);
app.use('/profil/', profilRouter);
app.use('/uporabnik/', uporabnikRouter);
app.use('/zamenjava', zamenjavaRouter);
app.use('/obvestilo', obvestiloRouter);

// Dodajanje statične poti za dostop do slik
app.use('/uploads', express.static('uploads'));

app.listen(9000);
module.exports = app;