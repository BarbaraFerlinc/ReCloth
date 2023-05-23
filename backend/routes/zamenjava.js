var multer = require('multer');
var express = require('express');
var router = express.Router();
var knex = require('../knexConfig');
var path = require('path');
const maxSize = 30 * 1024 * 1024; // 1 MB

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../uploads'))
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

var upload = multer({ storage: storage });

router.post('/dodaj', upload.array('slika'), async (req, res) => {
    const { naslov, velikost, opis, fk_oglas_id, fk_uporabnik_id, fk_kategorija_id } = req.body;

    if (!naslov || !velikost || !opis) {
        return res.status(400).json({ error: 'Vsa polja morajo biti izpolnjena' });
    }

    if (req.files.length > 5) {
        return res.status(400).json({ error: 'Lahko naložite največ 5 slik.' });
    }

    if (req.files) {
        for (let i = 0; i < req.files.length; i++) {
            if (req.files[i].size > maxSize) {
                return res.status(400).json({ error: 'Vsaka slika mora biti manjša od 1MB' });
            }
        }
    }
    console.log(req.body)

    try {
        const novaZamenjava = await knex('zamenjani').insert({
            naslov: naslov,
            velikost: velikost,
            opis: opis,
            fk_oglas_id: fk_oglas_id,
            fk_uporabnik_id: fk_uporabnik_id,
            fk_kategorija_id: fk_kategorija_id
        });

        if (req.files) {
            console.log(req.files)
            console.log(novaZamenjava[0])
            for (let i = 0; i < req.files.length; i++) {
                console.log("sem pridem")
                await knex('slika_zamenjanih').insert({
                    pot: req.files[i].path,
                    fk_zamenjani_id: novaZamenjava[0]
                });
            }
        }

        res.status(200).json({ message: 'ok', zamenjani: novaZamenjava });
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Napaka pri shranjevanju zamenjave' });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const oglas = await knex('zamenjani').select('*').where('id', id);
        if (oglas.length === 0) {
            return res.status(404).json({ error: 'Oglas ne obstaja' });
        }
        res.status(200).json(oglas);
    }
    catch (error) {
        res.status(500).json({ error: 'Napaka pri pridobivanju oglasa iz baze', details: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const oglas = await knex('zamenjani').select('*').where('id', id);
        if (oglas.length === 0) {
            return res.status(404).json({ error: 'Oglas ne obstaja' });
        }
        await knex('zamenjani').where('id', id).del();
        res.status(200).json({ message: 'Oglas izbrisan' });
    }
    catch (error) {
        res.status(500).json({ error: 'Napaka pri brisanju oglasa iz baze', details: error.message });
    }
});

module.exports = router;