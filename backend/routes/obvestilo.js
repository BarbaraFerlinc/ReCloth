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

    console.log(req.body)

    try {
        const obvestilo = await knex('obvestilo_zamenjava').insert({
            fk_oglas_id: fk_oglas_id,
            fk_uporabnik_id: fk_uporabnik_id,
            jeSprejeto: jeSprejeto
        });

        res.status(200).json({ message: 'ok', obvestilo: obvestilo });
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Napaka pri shranjevanju zamenjave' });
    }
});





module.exports = router;