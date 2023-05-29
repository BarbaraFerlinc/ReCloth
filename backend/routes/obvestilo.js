var multer = require('multer');
var express = require('express');
var router = express.Router();
var knex = require('../knexConfig');
var path = require('path');


router.post('/dodaj', async (req, res) => {
    const { fk_oglas_id, fk_uporabnik_id, jeSprejeto } = req.body;

    if (!fk_oglas_id || !fk_uporabnik_id || !jeSprejeto) {
        return res.status(400).json({ error: 'Vsa polja morajo biti izpolnjena' });
    }

    console.log(req.body);

    try {
        const obvestilo = await knex.transaction(async (trx) => {
            const insertedObvestilo = await trx('obvestilo_zamenjava').insert({
                fk_oglas_id: fk_oglas_id,
                fk_uporabnik_id: fk_uporabnik_id,
                jeSprejeto: jeSprejeto
            });

            await trx('oglas').where('id', fk_oglas_id).update('jeZamenjan', 0);
            await trx('zamenjani').del();
            return insertedObvestilo;
        });

        res.status(200).json({ message: 'ok', obvestilo: obvestilo });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Napaka pri shranjevanju zamenjave' });
    }

});


router.get('/vsi', async (req, res) => {
    try {
        const obvestilo_zamenjava = await knex('obvestilo_zamenjava').select('*');
        res.status(200).json(obvestilo_zamenjava);
    }
    catch (error) {
        res.status(500).json({ error: 'Napaka pri pridobivanju obvestil iz baze', details: error.message });
    }
});


router.post('/dodaj2', async (req, res) => {
    const { fk_oglas_id, fk_uporabnik_id, jeSprejeto } = req.body;

    if (!fk_oglas_id || !fk_uporabnik_id || !jeSprejeto) {
        return res.status(400).json({ error: 'Vsa polja morajo biti izpolnjena' });
    }

    console.log(req.body);

    try {
        const obvestilo = await knex.transaction(async (trx) => {
            // Insert the new record into the 'obvestilo_zamenjava' table
            const insertedObvestilo = await trx('obvestilo_zamenjava').insert({
                fk_oglas_id: fk_oglas_id,
                fk_uporabnik_id: fk_uporabnik_id,
                jeSprejeto: jeSprejeto
            });

            await trx('zamenjani').del();
            return insertedObvestilo;
        });

        res.status(200).json({ message: 'ok', obvestilo: obvestilo });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Napaka pri shranjevanju zamenjave' });
    }

});


router.get('/vsi', async (req, res) => {
    try {
        const obvestilo_zamenjava = await knex('obvestilo_zamenjava').select('*');
        res.status(200).json(obvestilo_zamenjava);
    }
    catch (error) {
        res.status(500).json({ error: 'Napaka pri pridobivanju obvestil iz baze', details: error.message });
    }
});







module.exports = router;