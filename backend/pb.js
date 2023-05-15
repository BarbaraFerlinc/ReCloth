var knex = require('./knexConfig');

async function baza(){
    await knex.schema.dropTableIfExists('ocena').catch((err) => {console.log(err); throw err});
    await knex.schema.dropTableIfExists('obvestilo').catch((err) => {console.log(err); throw err});
    await knex.schema.dropTableIfExists('nakup').catch((err) => {console.log(err); throw err});
    await knex.schema.dropTableIfExists('nacin_placila').catch((err) => {console.log(err); throw err});
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
        table.string('posta').notNullable();
        table.string('drzava').notNullable();
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
        table.varchar('slika').notNullable();
        table.integer('fk_uporabnik_id').references('id').inTable('uporabnik').notNullable().unsigned().onDelete('CASCADE');
        table.integer('fk_kategorija_id').references('id').inTable('kategorija').notNullable().unsigned().onDelete('CASCADE');
    }).then(() => console.log('Tabela oglas ustvarjena.'))
    .catch((err) => {console.log(err); throw err});

    await knex.schema.createTable('nacin_placila', (table) => {
        table.increments('id');
        table.string('naziv').notNullable();
    }).then(() => console.log('Tabela nacin_placila ustvarjena.'))
    .catch((err) => {console.log(err); throw err});

    await knex.schema.createTable('nakup', (table) => {
        table.increments('id');
        table.integer('fk_nacin_placila_id').references('id').inTable('nacin_placila').notNullable().unsigned().onDelete('CASCADE');
        table.integer('fk_oglas_id').references('id').inTable('oglas').notNullable().unsigned().onDelete('CASCADE');
        table.integer('fk_uporabni_id').references('id').inTable('uporabnik').notNullable().unsigned().onDelete('CASCADE');
    }).then(() => console.log('Tabela nakup ustvarjena.'))
    .catch((err) => {console.log(err); throw err});

    await knex.schema.createTable('obvestilo', (table) => {
        table.increments('id');
        table.integer('fk_oglas_id').references('id').inTable('oglas').notNullable().unsigned().onDelete('CASCADE');
        table.integer('fk_uporabnik_id').references('id').inTable('uporabnik').notNullable().unsigned().onDelete('CASCADE');
    }).then(() => console.log('Tabela obvestilo ustvarjena.'))
    .catch((err) => {console.log(err); throw err});

    await knex.schema.createTable('ocena', (table) => {
        table.increments('id');
        table.integer('ocena').notNullable();
        table.string('komentar').notNullable();
        table.integer('fk_nakup_id').references('id').inTable('nakup').notNullable().unsigned().onDelete('CASCADE');
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