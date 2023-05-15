var knex = require('knex')({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: "root",
        database: 'recloth_db'
    }
});

async function baza(){
    await knex.schema.dropTableIfExists('ocena').catch((err) => {console.log(err); throw err});
    await knex.schema.dropTableIfExists('obvestilo').catch((err) => {console.log(err); throw err});
    await knex.schema.dropTableIfExists('nakup').catch((err) => {console.log(err); throw err});
    await knex.schema.dropTableIfExists('način_plačila').catch((err) => {console.log(err); throw err});
    await knex.schema.dropTableIfExists('oglas').catch((err) => {console.log(err); throw err});
    await knex.schema.dropTableIfExists('kategorija').catch((err) => {console.log(err); throw err});
    await knex.schema.dropTableIfExists('uporabnik').catch((err) => {console.log(err); throw err});

    await knex.schema.createTable('uporabnik', (table) => {
        table.increments('id');
        table.string('ime').notNullable();
        table.string('priimek').notNullable();
        table.string('email').notNullable();
        table.string('geslo').notNullable();
        table.string('telefon').notNullable();
        table.string('naslov').notNullable();
        table.string('pošta').notNullable();
        table.string('država').notNullable();
    }).then(() => console.log('Tabela uporabnik ustvarjena.'))
    .catch((err) => {console.log(err); throw err});

    await knex.schema.createTable('kategorija', (table) => {
        table.increments('id');
        table.string('naziv').notNullable();
    }).then(() => console.log('Tabela kategorija ustvarjena.'))
    .catch((err) => {console.log(err); throw err});

    await knex.schema.createTable('oglas', (table) => {
        table.increments('id');
        table.string('naslov').notNullable();
        table.string('velikost').notNullable();
        table.string('opis').notNullable();
        table.integer('cena').notNullable();
        table.string('lokacija').notNullable();
        table.boolean('za_zamenjavo').notNullable();
        table.blob('slika').notNullable();
        table.integer('id_prodajalca').references('id').inTable('uporabnik').notNullable();
        table.integer('id_kategorije').references('id').inTable('kategorija').notNullable();
    }).then(() => console.log('Tabela oglas ustvarjena.'))
    .catch((err) => {console.log(err); throw err});

    await knex.schema.createTable('način_plačila', (table) => {
        table.increments('id');
        table.string('naziv').notNullable();
    }).then(() => console.log('Tabela način_plačila ustvarjena.'))
    .catch((err) => {console.log(err); throw err});

    await knex.schema.createTable('nakup', (table) => {
        table.increments('id');
        table.integer('id_način_plačila').references('id').inTable('način_plačila').notNullable();
        table.integer('id_oglasa').references('id').inTable('oglas').notNullable();
        table.integer('id_prodajalca').references('id').inTable('uporabnik').notNullable();
    }).then(() => console.log('Tabela nakup ustvarjena.'))
    .catch((err) => {console.log(err); throw err});

    await knex.schema.createTable('obvestilo', (table) => {
        table.increments('id');
        table.integer('id_oglasa').references('id').inTable('oglas').notNullable();
        table.integer('id_uporabnika').references('id').inTable('uporabnik').notNullable();
    }).then(() => console.log('Tabela obvestilo ustvarjena.'))
    .catch((err) => {console.log(err); throw err});

    await knex.schema.createTable('ocena', (table) => {
        table.increments('id');
        table.integer('ocena').notNullable();
        table.string('komentar').notNullable();
        table.integer('id_nakupa').references('id').inTable('nakup').notNullable();
    }).then(() => console.log('Tabela ocena ustvarjena.'))
    .catch((err) => {console.log(err); throw err});

    const kategorija = [
        {naziv: 'Otroške majice'},
        {naziv: 'Otroške hlače'},
        {naziv: 'Kratke majice'},
        {naziv: 'Majice'},
        {naziv: 'Kratke hlače'},
        {naziv: 'Dolge hlače'},
        {naziv: 'Obleke'},
        {naziv: 'Dodatki'}
    ]

    const način_plačila = [
        {naziv: 'Skreditno kartico'},
        {naziv: 'Po prevzemu'}
    ]

    await knex('kategorija').insert(kategorija).then(() => console.log('Vstavljena kategorija.'))
    .catch((err) => {console.log(err); throw err});
    await knex('način_plačila').insert(način_plačila).then(() => console.log('Vstavljen način_plačila.'))
    .catch((err) => {console.log(err); throw err});

    knex.destroy();
}

baza();