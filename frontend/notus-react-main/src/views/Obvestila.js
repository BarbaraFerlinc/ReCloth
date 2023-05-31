import React from "react";
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footers/Footer";
import { UserAuth } from "context/AuthContext";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "services/api";

const Obvestilo = () => {
    const [uporabnikovId, setUporabnikovId] = useState("");
    const [obvestilaProdajalec, setObvestilaProdajalec] = useState([]);
    const [obvestilaKupca, setObvestilaKupca] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = UserAuth();

    useEffect(() => {

        const uporabnikovEmail = user.email;
        console.log("Uporabnikov email je: ", uporabnikovEmail)

        api.post('uporabnik/prijavljen-uporabnik', { email: uporabnikovEmail })
            .then(res => {
                const userId = res.data.userId;
                setUporabnikovId(userId);
                console.log("Uporabnikov ID je: ", userId);
            })
            .catch(err => {
                console.error(err);
            });
    }, [user]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log("Uporabnikov ID je: ", uporabnikovId)
                const responseProdajalec = await api.post('obvestilo/getVsaObvestila-zaProdajalca', { id: uporabnikovId });
                setObvestilaProdajalec(responseProdajalec.data);

                const responseKupca = await api.post('obvestilo/getVsaObvestila-zaKupca', { id: uporabnikovId });
                setObvestilaKupca(responseKupca.data);

                setLoading(false);
            } catch (error) {
                setError('Napaka pri pridobivanju obvestil');
                setLoading(false);
            }
        };

        fetchData();
    }, [uporabnikovId]);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await api.post('/obvestilo/preberi');
                console.log(response.data);
            } catch (error) {
                console.error("Napaka pri pridobivanju obvestil", error);
            }
        };

        if (user) {
            fetchNotifications();
        }
    }, [user]);

    if (loading) {
        return <div>Nalaganje...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <>
            <div>
                <IndexNavbar fixed={true} />
                <section className="relative py-16 bg-blueGray-200">
                    <div className="container mx-auto px-4">
                        <div className="relative flex flex-col min-w-0 break-words bg-white w-full md:w-3/4 mx-auto mt-24 mb-4 shadow-xl rounded-lg">
                            <div className="px-6">
                                <div className="text-center mt-4 mb-12">
                                    <h3 class="text-4xl font-normal leading-normal mt-0 mb-2 text-pink-800">
                                        Vaša obvestila
                                    </h3>
                                    {obvestilaProdajalec.length === 0 && obvestilaKupca.length === 0 && (
                                        <p>Nimate nobenih obvestil.</p>
                                    )}
                                    <div>
                                        {obvestilaProdajalec
                                            ?.sort((b, a) => new Date(b.datum) - new Date(a.datum)) // Razvrsti obvestila po padajočem vrstnem redu datuma
                                            .map((obvestilo) => (
                                                <div key={obvestilo.idObvestila}>
                                                    {obvestilo.jeSprejeto === 2 && (
                                                        <p>

                                                            ✅<b>Sprejeli</b> ste <Link to={`/obvestilo/${obvestilo.idObvestila}`} style={{ textDecoration: 'underline' }}>zamenjavo</Link> s strani osebe <b>{obvestilo.ime} {obvestilo.priimek}</b>. {new Date(obvestilo.datum).toLocaleString()}
                                                        </p>
                                                    )}
                                                    {obvestilo.jeSprejeto === 1 && (
                                                        <p>
                                                            ❌<b>Zavrnili</b> ste zamenjavo s strani osebe <b>{obvestilo.ime} {obvestilo.priimek}</b>. {new Date(obvestilo.datum).toLocaleString()}
                                                        </p>
                                                    )}
                                                </div>
                                            ))}

                                        {obvestilaKupca
                                            ?.sort((b, a) => new Date(b.datum) - new Date(a.datum)) // Razvrsti obvestila po padajočem vrstnem redu datuma
                                            .map((obvestilo) => (
                                                <div key={obvestilo.idObvestila}>
                                                    {obvestilo.jeSprejeto === 2 && (
                                                        <p>
                                                            ✅Oseba <b>{obvestilo.prodajalecIme} {obvestilo.prodajalecPriimek}</b> je <b>sprejel/a</b> vašo <Link to={`/obvestilo/${obvestilo.idObvestila}`} style={{ textDecoration: 'underline' }}>zamenjavo</Link>. {new Date(obvestilo.datum).toLocaleString()}
                                                        </p>
                                                    )}
                                                    {obvestilo.jeSprejeto === 1 && (
                                                        <p>
                                                            ❌Oseba <b>{obvestilo.prodajalecIme} {obvestilo.prodajalecPriimek}</b>je <b>zavrnil/a</b> vašo zamenjavo. {new Date(obvestilo.datum).toLocaleString()}
                                                        </p>
                                                    )}
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section >
                <Footer />
            </div >
        </>
    )
}

export default Obvestilo;