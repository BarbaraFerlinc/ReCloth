import React, { useState, useEffect } from "react";
import { UserAuth } from "context/AuthContext";
import api from "services/api";

import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footers/Footer.js";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const initialState = {
    za_dostavo: 0,
    nacin_placila: "",
    fk_uporabnik_id: 0,
    fk_prodajalec_id: 0,
    fk_oglas_id: 0,
}

// fk_prodajalec_id mogoce ni potreben - se dobi iz oglasa
// namesto fk_oglas_id mogoce fk_kupljeni_id -> nova tabela v bazi (iz tabele oglas se zbrise in shrani v tabelo kupljeni)

const podatki_kartice = {
    stevilka: "",
    ime: "",
    datum_poteka: "",
    varnostna_koda: ""
}

export default function Nakup() {
    const { id } = useParams();
    let parsan_id;
    if (id !== undefined) {
        parsan_id = parseInt(id, 10);
    } else {
        parsan_id = undefined;
    }

    const [nakup, setNakup] = useState(initialState);
    const [kartica, setKartica] = useState(podatki_kartice);
    const [errors, setErrors] = useState({ slika: [] });
    const [uporabnikovId, setUporabnikovId] = useState(0)
    const [uporabnikovEmailizOglasa, setUporabnikovEmailizOglasa] = useState("")
    const [errorIzBaze, setErrorIzBaze] = useState(null);
    const [oglas, setOglas] = useState();
    const [nacinPlacila, setNacinPlacila] = useState("");

    const [dostava, setDostava] = useState(false);

    const { user } = UserAuth();

    const navigate = useNavigate();

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
                if (err.response && err.response.data && err.response.data.error) {
                    console.log("error message:", err.response.data.error);
                    setErrorIzBaze(err.response.data.error);
                } else {
                    console.log("error message: Napaka pri pridobivanju podatkov");
                    setErrorIzBaze("Napaka pri pridobivanju podatkov");
                }
            });
    }, [user]);

    useEffect(() => {
        const oglasId = parsan_id;
        console.log("Oglas Id je: ", oglasId)

        api.post('uporabnik/get-email-from-oglas-id', { id: oglasId })
            .then(res => {
                const uporabnikovEmailizOglasa = res.data.userEmail;
                setUporabnikovEmailizOglasa(uporabnikovEmailizOglasa);
                console.log("Uporabnikov email iz oglasa je: ", uporabnikovEmailizOglasa);
            })
            .catch(err => {
                console.error(err);
                if (err.response && err.response.data && err.response.data.error) {
                    console.log("error message:", err.response.data.error);
                    setErrorIzBaze(err.response.data.error);
                } else {
                    console.log("error message: Napaka pri pridobivanju podatkov");
                    setErrorIzBaze("Napaka pri pridobivanju podatkov");
                }
            });
    }, [user]);

    useEffect(() => {
        api.get(`/artikel/${parsan_id}`)
            .then(res => {
                console.log("Oglas je: ", res.data)
                setOglas(res.data);
            })

            .catch(err => {
                console.error(err);
                if (err.response && err.response.data && err.response.data.error) {
                    console.log("error message:", err.response.data.error);
                } else {
                    console.log("error message: Napaka pri pridobivanju podatkov");
                }
            });
    }, [parsan_id]);

    const nacini_placila = [
        { naziv: 'Nacin placila' },
        { naziv: 'Kreditna kartica' },
        { naziv: 'PayPal' },
        { naziv: 'Po povzetju' }
    ];

    const validateForm = () => {
        let formErrors = {};
        let formIsValid = true;

        if (!nakup.nacin_placila) {
            formIsValid = false;
            formErrors["nacin_placila"] = "Prosimo, izberite nacin placila.";
        }

        if (!kartica.stevilka) {
            formIsValid = false;
            formErrors["stevilka"] = "Prosimo, vnesite stevilko kartice.";
        }

        if (!kartica.ime) {
            formIsValid = false;
            formErrors["ime"] = "Prosimo, vnesite ime na kartici.";
        }

        if (!kartica.datum_poteka) {
            formIsValid = false;
            formErrors["datum_poteka"] = "Prosimo, vnesite datum poteka kartice.";
        }

        if (!kartica.varnostna_koda) {
            formIsValid = false;
            formErrors["varnostna_koda"] = "Prosimo, vnesite varnostno kodo kartice.";
        }

        setErrors(formErrors);
        return formIsValid;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            try {
                console.log(nakup);

                const response = await api.post("/nakup/dodaj", nakup, {
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                });

                if (response.status === 200) {
                    alert("Nakup uspešno shranjen!");
                } else {
                    alert("Napaka pri shranjevanju nakupa!");
                }

                setNakup(initialState);
                setErrors({});

                navigate("/profile");
            } catch (error) {
                console.error("Napaka pri posredovanju zahteve POST", error);
            }
            setNakup(initialState);
        }
    };

    const handleChange = (e) => {
        if (e.target.id === 'za_dostavo') {
            setDostava(!dostava);
        }

        const { value, name, type, checked } = e.target;
        let valueToUse = value;

        if (type === "checkbox" && name === "za_dostavo") {
            valueToUse = checked ? 1 : 0;
        }

        if (name === 'nacin_placila') {
            setNacinPlacila(valueToUse);
        }

        setNakup((prevState) => {
            const nextState = {
                ...prevState,
                [name]: valueToUse,
                fk_uporabnik_id: uporabnikovId,
                fk_oglas_id: parsan_id,
            };
            return nextState;
        });
    };

    const handleKartica = (e) => {
        const { value, name } = e.target;
        let valueToUse = value;

        setKartica((prevState) => {
            const nextState = {
                ...prevState,
                [name]: valueToUse,
            };
            return nextState;
        });
    };

    if (user.email == uporabnikovEmailizOglasa) {
        navigate("/");
    }

    return (
        <>
            {errorIzBaze ? (
                <div className="text-center mt-12">
                    <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                        Ta nakup ne obstaja!
                    </h3>
                    <Link to="/">
                        <button className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                            Pojdi nazaj
                        </button>
                    </Link>
                </div>

            ) : (
                <div>
                    <IndexNavbar />
                    <br></br>
                    <div className="container mx-auto px-4 pt-20">
                        <div className="flex content-center items-center justify-center h-screen">
                            <div className="w-full lg:w-6/12 px-4">
                                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white border-0">
                                    <div className="rounded-t mb-0 px-6 py-6">
                                        <div className="text-center mb-3">
                                            <h1 className="text-blueGray-500 font-bold">
                                                Nakup
                                            </h1>
                                        </div>
                                        <hr className="mt-6 border-b-1 border-blueGray-300" />
                                    </div>
                                    <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                                        <form onSubmit={handleSubmit}>
                                            {oglas ? oglas.osebni_prevzem ? 
                                                <div className="relative w-full mb-3">
                                                    <div class="w-full"><label class="inline-flex items-center cursor-pointer">
                                                        <input type="checkbox" name="za_dostavo" id="za_dostavo" value={nakup.za_dostavo} onChange={handleChange} class="form-checkbox appearance-none ml-1 w-5 h-5 ease-linear transition-all duration-150 border border-blueGray-300 rounded checked:bg-blueGray-700 checked:border-blueGray-700 focus:border-blueGray-300" />
                                                        <span class="ml-2 text-sm font-semibold text-blueGray-500">Dostava na dom</span></label></div>
                                                </div>: <></> : "Ni oglasa."
                                            }
                                            <div className="w-1/2 px-2">
                                                <div className="relative w-full mb-3">
                                                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="velikost">
                                                        Nacin placila
                                                    </label>
                                                    <select
                                                        name="nacin_placila"
                                                        id="nacin_placila"
                                                        value={nacinPlacila}
                                                        onChange={handleChange}
                                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                    >
                                                        {nacini_placila.map((v, index) => (
                                                            <option key={index} value={v.naziv}>{v.naziv}</option>
                                                        ))}
                                                    </select>
                                                    <small className="text-red-500">{errors.nacin_placila}</small>
                                                </div>
                                            </div>
                                            <hr className="mt-6 border-b-1 border-blueGray-300" />
                                            
                                            {nacinPlacila=="Kreditna kartica" ?
                                                <>
                                                    <div className="text-blueGray-400 text-center mb-3 font-bold">
                                                        <small>Vnesite podatke o kartici</small>
                                                    </div>
                                                    <div className="relative w-full mb-3">
                                                        <label
                                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                            htmlFor="grid-password"
                                                        >
                                                            Številka kartice
                                                        </label>
                                                        <input type="text" placeholder="0000 0000 0000 0000" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-base shadow outline-none focus:outline-none focus:shadow-outline w-full" ž
                                                            name="stevilka" id="stevilka" value={kartica.stevilka} onChange={handleKartica}
                                                        />
                                                        <small className="text-red-500">{errors.stevilka}</small>
                                                    </div>
                                                    <div className="relative w-full mb-3">
                                                        <label
                                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                            htmlFor="grid-password"
                                                        >
                                                            Ime na kartici
                                                        </label>
                                                        <input type="text" placeholder="Ime na kartici" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-base shadow outline-none focus:outline-none focus:shadow-outline w-full" ž
                                                            name="ime" id="ime" value={kartica.ime} onChange={handleKartica}
                                                        />
                                                        <small className="text-red-500">{errors.ime}</small>
                                                    </div>
                                                    <div className="relative w-full mb-3">
                                                        <label
                                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                            htmlFor="grid-password"
                                                        >
                                                            Datum poteka veljavnosti
                                                        </label>
                                                        <input type="text" placeholder="Datum poteka veljavnosti (MM/LL)" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-base shadow outline-none focus:outline-none focus:shadow-outline w-full" ž
                                                            name="datum_poteka" id="datum_poteka" value={kartica.datum_poteka} onChange={handleKartica}
                                                        />
                                                        <small className="text-red-500">{errors.datum_poteka}</small>
                                                    </div>
                                                    <div className="relative w-full mb-3">
                                                        <label
                                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                            htmlFor="grid-password"
                                                        >
                                                            Varnostna koda
                                                        </label>
                                                        <input type="text" placeholder="Varnostna koda (CVC)" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-base shadow outline-none focus:outline-none focus:shadow-outline w-full" ž
                                                            name="varnostna_koda" id="varnostna_koda" value={kartica.varnostna_koda} onChange={handleKartica}
                                                        />
                                                        <small className="text-red-500">{errors.varnostna_koda}</small>
                                                    </div>
                                                </> : <></>
                                            }

                                            {nacinPlacila=="PayPal" ?
                                                "S klikom na KUPI boste preusmerjeni na PayPal za varno dokončanje vašega nakupa" : <></>
                                            }

                                            {nacinPlacila=="Po povzetju" ?
                                                "Plačilo po povzetju" : <></>
                                            }                                            

                                            <br></br>
                                            <div className="text-center mt-6">
                                                <button
                                                    className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                                                    type="submit"
                                                >
                                                    Kupi
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br></br>
                    <Footer />
                </div>
            )}
        </>
    )
}