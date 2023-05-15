var express = require('express');
var router = express.Router();

var knex = require('knex')({
    client: 'mysql2',
    connection: {
        host: '127.0.0.1',
        port: 3307,
        user: 'root',
        password: '',
        database: 'recloth_db'
    }
});

router.post('/dodaj', async (req, res) => {
    const { naslov, velikost, opis, cena, lokacija, za_zamenjavo, slika, fk_uporabnik_id, fk_kategorija_id } = req.body;

    if (!naslov || !velikost || !opis || !cena || !lokacija || !za_zamenjavo || !slika) {
        return res.status(400).json({ error: 'Vsa polja morajo biti izpolnjena' });
    }

    try {
        const novOglas = await knex('oglas').insert({
            naslov: naslov,
            velikost: velikost,
            opis: opis,
            cena: cena,
            lokacija: lokacija,
            za_zamenjavo: za_zamenjavo,
            slika: slika,
            fk_uporabnik_id: fk_uporabnik_id,
            fk_kategorija_id: fk_kategorija_id
        });
        res.status(200).json({ message: 'ok', oglas: novOglas });
    } catch (error) {
        res.status(500).json({ error: 'Napaka pri vstavljanju oglasa v bazo', details: error.message });
    }
});



router.get('/vsi', async (req, res) => {
    try {
        const oglasi = await knex('oglas').select('*');
        res.status(200).json(oglasi);
    }
    catch (error) {
        res.status(500).json({ error: 'Napaka pri pridobivanju oglasov iz baze', details: error.message });
    }
});



router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const oglas = await knex('oglas').select('*').where('id', id);
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
        const oglas = await knex('oglas').select('*').where('id', id);
        if (oglas.length === 0) {
            return res.status(404).json({ error: 'Oglas ne obstaja' });
        }
        await knex('oglas').where('id', id).del();
        res.status(200).json({ message: 'Oglas izbrisan' });
    }
    catch (error) {
        res.status(500).json({ error: 'Napaka pri brisanju oglasa iz baze', details: error.message });
    }
});



router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { naslov, velikost, opis, cena, lokacija, za_zamenjavo, slika, fk_uporabnik_id, fk_kategorija_id } = req.body;


    if (!naslov || !velikost || !opis || !cena || !lokacija || !za_zamenjavo || !slika) {
        return res.status(400).json({ error: 'Vsa polja morajo biti izpolnjena'});
    }

    const oglas = await knex('oglas').where({ id: id }).first();

    if (!oglas) {
        return res.status(404).json({ error: 'oglas ne obstaja' });
    }



    try {
        await knex('oglas')
            .where({ id: id })
            .update({
                naslov: naslov,
                velikost: velikost,
                opis: opis,
                cena: cena,
                lokacija: lokacija,
                za_zamenjavo: za_zamenjavo,
                slika: slika,
                fk_uporabnik_id: fk_uporabnik_id,
                fk_kategorija_id: fk_kategorija_id
            });

            
        res.status(200).json({ message: 'Uspešno posodobljen oglas.', oglas: req.body });
    } catch (error) {
        res.status(500).json({ error: 'Napaka pri posodabljanju oglasa v bazi', details: error.message });
    }
});






module.exports = router;