var express = require('express');
var router = express.Router();
var knex = require('../knexConfig')
// metode
// shrani (post)/uredi (post - shrani)/zbrisi (delete) oceno

// to se spremeni
router.post('/dodaj', async (req, res) => {
    const { za_dostavo,fk_prodajalec_id, fk_uporabnik_id, fk_kategorija_id } = req.body;

    if (!za_dostavo) {
        return res.status(400).json({ error: 'Vsa polja morajo biti izpolnjena' });
    }

    try {
        const novNakup = await knex('nakup').insert({
            za_dostavo: za_dostavo,
            fk_uporabnik_id: fk_uporabnik_id,
            fk_prodajalec_id: fk_prodajalec_id,
            fk_kategorija_id: fk_kategorija_id
        });
        console.log(novNakup)

        res.status(200).json({ message: 'ok', nakup: novNakup });
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Napaka pri shranjevanju nakupa' });
    }
});

module.exports = router;