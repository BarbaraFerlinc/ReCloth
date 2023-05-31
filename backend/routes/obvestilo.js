var multer = require('multer');
var express = require('express');
var router = express.Router();
var knex = require('../knexConfig');
var path = require('path');


router.post('/dodaj', async (req, res) => {
    const { fk_oglas_id, fk_uporabnik_id, jeSprejeto, potrjenaZamenjava } = req.body;

    if (!fk_oglas_id || !fk_uporabnik_id || !jeSprejeto || !potrjenaZamenjava) {
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
            await trx('zamenjani').where('fk_oglas_id', fk_oglas_id).update('jePotrjen', 1);
            await trx('zamenjani').where('id', potrjenaZamenjava).update('potrjenaZamenjava', 1);
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
            .select('obvestilo_zamenjava.*', 'oglas.*', "uporabnik.ime", "uporabnik.priimek", 'obvestilo_zamenjava.id as idObvestila')
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
            .select('obvestilo_zamenjava.*', 'oglas.*', "uporabnik.ime as prodajalecIme", "uporabnik.priimek as prodajalecPriimek", 'obvestilo_zamenjava.id as idObvestila')
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
router.post('/podrobnostiObvestila', async (req, res) => {
    const { id } = req.body;
    try {
        const obvestilo1 = await knex('obvestilo_zamenjava')
            .select('oglas.*', 'uporabnik.*', 'oglas.naslov as naslovOglasa', 'oglas.id as idOglasa')
            .join('oglas', 'obvestilo_zamenjava.fk_oglas_id', 'oglas.id')
            .join('uporabnik', 'oglas.fk_uporabnik_id', 'uporabnik.id')
            .where('obvestilo_zamenjava.id', id)
            .first();
        const slike = await knex('slika')
            .select('pot')
            .where('fk_oglas_id', '=', obvestilo1.id);
        obvestilo1.slike = slike.map(slika => slika.pot);

        if (!obvestilo1) {
            return res.status(404).json({ error: 'Obvestilo ne obstaja' });
        }
        const obvestilo2 = await knex('obvestilo_zamenjava')
            .select('uporabnik.ime', 'uporabnik.*', 'zamenjani.*', 'zamenjani.id as idZamenjanih')
            .join('zamenjani', 'obvestilo_zamenjava.fk_oglas_id', 'zamenjani.fk_oglas_id')
            .join('uporabnik', 'zamenjani.fk_uporabnik_id', 'uporabnik.id')
            .where('zamenjani.potrjenaZamenjava', 1)
            .where('obvestilo_zamenjava.id', id)
            .first();

        const slike2 = await knex('slika_zamenjanih')
            .select('pot')
            .where('fk_zamenjani_id', '=', obvestilo2.id);
        obvestilo2.slike = slike2.map(slika => slika.pot);


        if (!obvestilo2) {
            return res.status(404).json({ error: 'Obvestilo ne obstaja' });
        }

        console.log("tukaj smo")
        console.log({obvestilo1, obvestilo2})

        res.status(200).json({ obvestilo1, obvestilo2 });
    }
    catch (error) {
        res.status(500).json({ error: 'Napaka pri pridobivanju obvestila iz baze', details: error.message });
    }
});

router.post('/dodaj/obvestilo-nakupa', async (req, res) => {
    const { fk_oglas_id, fk_uporabnik_id} = req.body;
    console.log(req.body);
    if (!fk_oglas_id || !fk_uporabnik_id) {
        return res.status(400).json({ error: 'Vsa polja morajo biti izpolnjena' });
    }



    try {
        const obvestilo = await knex.transaction(async (trx) => {
            const currentDate = new Date()
            // Insert the new record into the 'obvestilo_zamenjava' table
            const insertedObvestilo = await trx('obvestilo_nakupa').insert({
                fk_oglas_id: fk_oglas_id,
                fk_uporabnik_id: fk_uporabnik_id,
                datum: currentDate
            });

            if(!insertedObvestilo){
                return res.status(400).json({ error: 'Napaka pri shranjevanju obvestila' });
            }
            
            return insertedObvestilo;
        });
        

        res.status(200).json({ message: 'ok', obvestilo: obvestilo });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Napaka pri shranjevanju zamenjave' });
    }

});


router.post('/getVsaObvestilaNakupa-zaProdajalca', async (req, res) => {
    try {
        const { id } = req.body;
        const obvestila = await knex('obvestilo_nakupa')
            .select('obvestilo_nakupa.*', 'oglas.*', "uporabnik.ime", "uporabnik.priimek", 'obvestilo_nakupa.id as idObvestila')
            .join('oglas', 'obvestilo_nakupa.fk_oglas_id', 'oglas.id')
            .join('uporabnik', 'obvestilo_nakupa.fk_uporabnik_id', 'uporabnik.id')
            .where('oglas.fk_uporabnik_id', id);


        console.log(obvestila)
        res.status(200).json(obvestila);
    } catch (error) {
        res.status(500).json({ error: 'Napaka pri pridobivanju obvestil' });
    }
});

router.post('/getVsaObvestilaNakupa-zaKupca', async (req, res) => {
    try {
        const { id } = req.body;
        const obvestila = await knex('obvestilo_nakupa')
            .select('obvestilo_nakupa.*', 'oglas.*', "uporabnik.ime as prodajalecIme", "uporabnik.priimek as prodajalecPriimek", 'obvestilo_nakupa.id as idObvestila')
            .join('oglas', 'obvestilo_nakupa.fk_oglas_id', 'oglas.id')
            .join('uporabnik', 'oglas.fk_uporabnik_id', 'uporabnik.id')
            .where('obvestilo_nakupa.fk_uporabnik_id', id);

        res.status(200).json(obvestila);
    } catch (error) {
        res.status(500).json({ error: 'Napaka pri pridobivanju obvestil' });
    }
});








module.exports = router;