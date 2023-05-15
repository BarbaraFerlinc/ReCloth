const express = require("express");
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

// routerji
var artikelRouter = require('./routes/artikel');
var indexRouter = require('./routes/index');
var kategorijaRouter = require('./routes/kategorija');
var nakupRouter = require('./routes/nakup');
var pogovorRouter = require('./routes/pogovor');
var prijavaRouter = require('./routes/prijava');
var profilRouter = require('./routes/profil');
var registracijaRouter = require('./routes/registracija');
var uporabnikRouter = require('./routes/uporabnik');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// uporaba routerjev
app.use(cors());
app.use('/artikel/', artikelRouter);
app.use('/', indexRouter);
app.use('/kategorija/', kategorijaRouter);
app.use('/nakup/', nakupRouter);
app.use('/pogovor/', pogovorRouter);
app.use('/prijava', prijavaRouter);
app.use('/profil/', profilRouter);
app.use('/registracija/', registracijaRouter);
app.use('/uporabnik/', uporabnikRouter);

app.listen(9000);
module.exports = app;