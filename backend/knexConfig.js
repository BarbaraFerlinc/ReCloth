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

/*module.exports = require('knex')({
    client: 'mysql2',
    connection: {
        host: '127.0.0.1',
        port: '3306',
        user: 'root',
        password: 'root',
        database: 'recloth_db'
    }
});*/

require('dotenv').config();

module.exports = require('knex')({
    client: 'mysql2',
    connection: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    }
});

//mysql://bf70ab75dc186b:bec248a3@eu-cdbr-west-03.cleardb.net/heroku_ce49f0125021101?reconnect=true

// to je connection