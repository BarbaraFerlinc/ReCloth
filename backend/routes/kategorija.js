var express = require('express');
var router = express.Router();
var knex = require('../knexConfig')


router.get('/vsi', async (req, res) => {
    try {
        const kategorije = await knex('kategorija').select('*');
        res.status(200).json(kategorije);
    }
    catch (error) {
        res.status(500).json({ error: 'Napaka pri pridobivanju kategorij iz baze', details: error.message });
    }
});






module.exports = router;