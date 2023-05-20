var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
var knex = require('../knexConfig')

router.post('/dodaj', async (req, res) => {
    const { ime, priimek, email, geslo, telefon, naslov, posta, drzava } = req.body;

    if (!ime || !priimek || !email || !geslo || !telefon || !naslov || !posta || !drzava) {
        return res.status(400).json({ error: 'Vsa polja morajo biti izpolnjena' });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(geslo, saltRounds);


    try {
        const newUser = await knex('uporabnik').insert({
            ime: ime,
            priimek: priimek,
            email: email,
            geslo: hashedPassword,
            telefon: telefon,
            naslov: naslov,
            posta: posta,
            drzava: drzava,
        });
        console.log(newUser)

        res.status(200).json({ message: 'Uspešna registracija', user: newUser });
    }
    catch (error) {
        res.status(500).json({ error: 'Napaka pri vstavljanju uporabnika v bazo', details: error.message });
    }

});

router.get('/vsi', async (req, res) => {
    try {
        const users = await knex('uporabnik').select('*');
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ error: 'Napaka pri pridobivanju uporabnikov iz baze', details: error.message });
    }
});

router.get('/:email', async (req, res) => {
    const { email } = req.params;
    try {
        const user = await knex('uporabnik').select('*').where('email', email);
        if (user.length === 0) {
            return res.status(404).json({ error: 'Uporabnik ne obstaja' });
        }
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ error: 'Napaka pri pridobivanju uporabnika iz baze', details: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await knex('uporabnik').select('*').where('id', id);
        if (user.length === 0) {
            return res.status(404).json({ error: 'Uporabnik ne obstaja' });
        }
        await knex('uporabnik').where('id', id).del();
        res.status(200).json({ message: 'Uporabnik izbrisan', user: user });
    }
    catch (error) {
        res.status(500).json({ error: 'Napaka pri brisanju uporabnika iz baze', details: error.message });
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { ime, priimek, email, geslo, telefon, naslov, posta, drzava } = req.body;

    if (!ime || !priimek || !email || !geslo || !telefon || !naslov || !posta || !drzava) {
        return res.status(400).json({ error: 'Vsa polja morajo biti izpolnjena' });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(geslo, saltRounds);

    const uporabnik = await knex('uporabnik').where({ id: id }).first();

    if (!uporabnik) {
        return res.status(404).json({ error: 'Uporabnik ne obstaja' });
    }

    try {
        await knex('uporabnik')
            .where({ id: id })
            .update({
                ime: ime,
                priimek: priimek,
                email: email,
                geslo: hashedPassword,
                telefon: telefon,
                naslov: naslov,
                posta: posta,
                drzava: drzava
            });

        res.status(200).json({ message: 'Uspešno posodobljen uporabnik.', user: req.body });
    } catch (error) {
        res.status(500).json({ error: 'Napaka pri posodabljanju uporabnika v bazi', details: error.message });
    }
});

router.post('/prijavljen-uporabnik', async (req, res) => {
    const email = req.body.email;
    console.log(email)
    if (!email) {
        return res.status(400).send({ error: 'Email is required' });
    }

    try {
        const user = await knex('uporabnik')
            .where('email', email)
            .first();

        if (!user) {
            return res.status(404).send({ error: 'No user found with this email' });
        }

        return res.status(200).send({ userId: user.id });

    } catch (err) {
        console.error(err);
        return res.status(500).send({ error: 'Something went wrong' });
    }
});
module.exports = router;

