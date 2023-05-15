module.exports = require('knex')({
    client: 'mysql2',
    connection: {
        host: '127.0.0.1',
        port: '3307',
        user: 'root',
        password: '',
        database: 'recloth_db'
    }
});