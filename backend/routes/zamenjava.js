var multer = require('multer');
var express = require('express');
var router = express.Router();
var knex = require('../knexConfig');
var path = require('path');

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
    const { naslov, velikost, opis, fk_uporabnik_id, fk_kategorija_id } = req.body;

    if (!naslov || !velikost || !opis) {
        return res.status(400).json({ error: 'Vsa polja morajo biti izpolnjena' });
    }

    try {
        const novaZamenjava = await knex('zamenjava').insert({
            naslov: naslov,
            velikost: velikost,
            opis: opis,
            fk_uporabnik_id: fk_uporabnik_id,
            fk_kategorija_id: fk_kategorija_id
        });
        console.log(novOglas)

        if (req.files) {
            console.log(req.files)
            console.log(novaZamenjava[0])
            for (let i = 0; i < req.files.length; i++) {
                console.log("sem pridem")
                await knex('slika').insert({
                    pot: req.files[i].path,
                    fk_oglas_id: novaZamenjava[0]
                });
            }
        }

        res.status(200).json({ message: 'ok', zamenjava: novaZamenjava });
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Napaka pri shranjevanju zamenjave' });
    }
});

module.exports = router;