const express = require("express");

// routerji
var artikelRouter = require('./routes/artikel');
var indexRouter = require('./routes/index');
var nakupRouter = require('./routes/nakup');
var pogovorRouter = require('./routes/pogovor');
var prijavaRouter = require('./routes/prijava');
var profilRouter = require('./routes/profil');
var registracijaRouter = require('./routes/registracija');
var uporabnikRouter = require('./routes/uporabnik');

const app = express();

// uporaba routerjev
app.use('/artikel/', artikelRouter);
app.use('/', indexRouter);
app.use('/nakup/', nakupRouter);
app.use('/pogovor/', pogovorRouter);
app.use('/prijava', prijavaRouter);
app.use('/profil/', profilRouter);
app.use('/registracija/', registracijaRouter);
app.use('/uporabnik/', uporabnikRouter);

app.listen(9000);
module.exports = app;