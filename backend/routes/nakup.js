var express = require('express');
var router = express.Router();
var knex = require('../knexConfig')

router.post('/dodaj', async (req, res) => {
    const { osebni_prevzem, nacin_placila, fk_uporabnik_id, fk_oglas_id } = req.body;

    if (!nacin_placila) {
        return res.status(400).json({ error: 'Vsa polja morajo biti izpolnjena' });
    }

    try {
        const novNakup = await knex('nakup').insert({
            osebni_prevzem: osebni_prevzem,
            nacin_placila: nacin_placila,
            fk_uporabnik_id: fk_uporabnik_id,
            fk_oglas_id: fk_oglas_id,
        });

        await knex('oglas').where('id', fk_oglas_id).update('jeZamenjan', 1);
        await knex('zamenjani').where('fk_oglas_id', fk_oglas_id).update('jePotrjen', 1);



        res.status(200).json({ message: 'ok', nakup: novNakup });
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Napaka pri shranjevanju nakupa' });
    }
});

module.exports = router;