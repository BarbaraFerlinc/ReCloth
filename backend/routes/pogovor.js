var express = require('express');
var router = express.Router();

var knex = require('knex')({
    client: 'mysql2',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: 'root',
        database: 'recloth_db'
    }
});

// metode
// shrani sporočilo (post)

module.exports = router;