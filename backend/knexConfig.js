/*module.exports = require('knex')({
    client: 'mysql2',
    connection: {
        host: 'studentdocker.informatika.uni-mb.si',
        port: '49164',
        user: 'root',
        password: 'praktikum2ReCloth',
        database: 'recloth'
    }
});*/

module.exports = require('knex')({
    client: 'mysql2',
    connection: {
        host: '127.0.0.1',
        port: '3306',
        user: 'root',
        password: 'root',
        database: 'recloth_db'
    }
});

// to je connection