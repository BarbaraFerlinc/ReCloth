var express = require('express');
var router = express.Router();
var knex = require('../knexConfig')

router.get('/artikli/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const oglas = await knex('oglas').select('*').where('fk_uporabnik_id', id);
        if (oglas.length === 0) {
            return res.status(404).json({ error: 'Oglas ne obstaja' });
        }
        res.status(200).json(oglas);
    }
    catch (error) {
        res.status(500).json({ error: 'Napaka pri pridobivanju oglasa iz baze', details: error.message });
    }
});

module.exports = router;