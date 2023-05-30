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

    try {
        const obvestilo = await knex.transaction(async (trx) => {
            const currentDate = new Date()
            const insertedObvestilo = await trx('obvestilo_zamenjava').insert({
                fk_oglas_id: fk_oglas_id,
                fk_uporabnik_id: fk_uporabnik_id,
                jeSprejeto: jeSprejeto,
                datum: currentDate
            });

            await trx('oglas').where('id', fk_oglas_id).update('jeZamenjan', 1);
            //await trx('zamenjani').del();
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
            const currentDate = new Date()
            // Insert the new record into the 'obvestilo_zamenjava' table
            const insertedObvestilo = await trx('obvestilo_zamenjava').insert({
                fk_oglas_id: fk_oglas_id,
                fk_uporabnik_id: fk_uporabnik_id,
                jeSprejeto: jeSprejeto,
                datum: currentDate
            });

            //(await trx('zamenjani').del();
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


router.post('/getVsaObvestila-zaProdajalca', async (req, res) => {
    try {
        const { id } = req.body;
        const obvestila = await knex('obvestilo_zamenjava')
            .select('obvestilo_zamenjava.*', 'oglas.*', "uporabnik.ime", "uporabnik.priimek")
            .join('oglas', 'obvestilo_zamenjava.fk_oglas_id', 'oglas.id')
            .join('uporabnik', 'obvestilo_zamenjava.fk_uporabnik_id', 'uporabnik.id')
            .where('oglas.fk_uporabnik_id', id);


        console.log(obvestila)
        res.status(200).json(obvestila);
    } catch (error) {
        res.status(500).json({ error: 'Napaka pri pridobivanju obvestil' });
    }
});

router.post('/getVsaObvestila-zaKupca', async (req, res) => {
    try {
        const { id } = req.body;
        const obvestila = await knex('obvestilo_zamenjava')
            .select('obvestilo_zamenjava.*', 'oglas.*', "uporabnik.ime as prodajalecIme", "uporabnik.priimek as prodajalecPriimek")
            .join('oglas', 'obvestilo_zamenjava.fk_oglas_id', 'oglas.id')
            .join('uporabnik', 'oglas.fk_uporabnik_id', 'uporabnik.id')
            .where('obvestilo_zamenjava.fk_uporabnik_id', id);

        res.status(200).json(obvestila);
    } catch (error) {
        res.status(500).json({ error: 'Napaka pri pridobivanju obvestil' });
    }
});

router.get('/prestej-neprebrane', async (req, res) => {
    try {
        const count = await knex('obvestilo_zamenjava')
            .count('id as count')
            .where('prebrano', false)
            .first();

        if (!count) {
            return res.status(404).json({ error: 'Obvestila ne obstajajo' });
        }
        res.status(200).json(count);
    } catch (error) {
        console.error('Napaka pri pridobivanju števila obvestil', error);
        res.status(500).json({ error: 'Napaka pri pridobivanju števila obvestil' });
    }
});

router.post('/preberi', async (req, res) => {
    try {
        await knex('obvestilo_zamenjava')
            .where('prebrano', false)
            .update({ prebrano: true });

        res.status(200).json({ message: 'Vsa obvestila so prebrana' });
      } catch (error) {
        console.error('Napaka pri označevanju vseh obvestil kot prebrana', error);
        res.status(500).json({ error: 'Napaka pri označevanju vseh obvestil kot prebrana' });
    }
});


//sepravi jaz mam id od obvestila, mogu bom pogledat kdo je prijavljen in pol primerjat z fk_uporabnik_id in uporabnikom v oglasu in dobim vse o uporabniku in oglasu
router.post('/getPodrobnostiObvestila'), async (req, res) => {
}







module.exports = router;