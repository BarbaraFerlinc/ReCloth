var express = require('express');
var router = express.Router();

var knex = require('knex')({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: "root",
        database: 'recloth_db'
    }
});

// metode
// get enega uporabnika
// filtriranje artiklov glede na uporabnika

module.exports = router;