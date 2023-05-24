import React, { useState, useEffect } from "react";
import { UserAuth } from "context/AuthContext";
import api from "services/api";

import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footers/Footer.js";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";

const initialState = {
    naslov: "",
    velikost: "XS",
    opis: "",
    slika: [],
    fk_uporabnik_id: 0,
    fk_kategorija_id: 1,
    fk_oglas_id: 0,
}

export default function Zamenjava() {
    const { id } = useParams();
    let parsan_id;
    if (id !== undefined) {
        parsan_id = parseInt(id, 10);
    } else {
        parsan_id = undefined;
    }

    const [oglas, setOglas] = useState(initialState);
    const [errors, setErrors] = useState({ slika: [] });
    const [kategorija, setKategorija] = useState([]);
    const [uporabnikovId, setUporabnikovId] = useState(0)
    const [uporabnikovEmail, setUporabnikovEmail] = useState("");
    const [errorIzBaze, setErrorIzBaze] = useState(null);

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
        const fetchKategorije = async () => {
            try {
                const response = await api.get('/kategorija/vsi');
                console.log(response)
                setKategorija(response.data);
            } catch (error) {
                console.error("Napaka pri pridobivanju kategorij", error);
            }
        };

        fetchKategorije();
    }, []);

    useEffect(() => {
        const oglasId = parsan_id;
        console.log("Oglas Id je: ", oglasId)

        api.post('uporabnik/get-email-from-oglas-id', { id: oglasId })
            .then(res => {
                const uporabnikovEmailizOglasa = res.data.userEmail;
                setUporabnikovEmail(uporabnikovEmailizOglasa);
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



    if (user.email == uporabnikovEmail) {
        navigate("/");
    }

    const velikosti = [
        { naziv: 'XS' },
        { naziv: 'S' },
        { naziv: 'M' },
        { naziv: 'L' },
        { naziv: 'XL' },
        { naziv: 'XXL' },
        { naziv: '110' },
        { naziv: '116' },
        { naziv: '122' },
        { naziv: '128' },
        { naziv: '134' },
        { naziv: '140' },
        { naziv: '146' },
        { naziv: '152' },
        { naziv: '158' },
        { naziv: '164' },
    ];

    const validateForm = () => {
        let formErrors = {};
        let formIsValid = true;

        if (!oglas.naslov) {
            formIsValid = false;
            formErrors["naslov"] = "Prosimo, vnesite naslov oglasa.";
        }

        if (!oglas.opis) {
            formIsValid = false;
            formErrors["opis"] = "Prosimo, vnesite opis oglasa.";
        }

        if (!oglas.velikost) {
            formIsValid = false;
            formErrors["velikost"] = "Prosimo, izberite velikost.";
        }

        if (!oglas.fk_kategorija_id) {
            formIsValid = false;
            formErrors["fk_kategorija_id"] = "Prosimo, izberite kategorijo.";
        }

        if (!oglas.slika || oglas.slika.length === 0) {
            formIsValid = false;
            formErrors["slika"] = "Prosimo, dodajte vsaj eno sliko.";
        }
        setErrors(formErrors);
        return formIsValid;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            try {
                const formData = new FormData();
                formData.append("naslov", oglas.naslov);
                formData.append("velikost", oglas.velikost);
                formData.append("opis", oglas.opis);
                formData.append("fk_uporabnik_id", oglas.fk_uporabnik_id);
                formData.append("fk_kategorija_id", oglas.fk_kategorija_id);
                formData.append("fk_oglas_id", oglas.fk_oglas_id);

                if (oglas.slika) {
                    if (Array.isArray(oglas.slika)) {
                        oglas.slika.forEach((slika) => {
                            formData.append("slika", slika);
                        });
                    } else {
                        formData.append("slika", oglas.slika);
                    }
                }

                const response = await api.post("/zamenjava/dodaj", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });

                if (response.status === 200) {
                    alert("Oglas uspešno poslan!");
                } else {
                    alert("Napaka pri posiljanju oglasa!");
                }

                setOglas(initialState);
                setErrors({})

                navigate("/profile");
            } catch (error) {
                console.error("Napaka pri posredovanju zahteve POST", error);
            }
            //dodaj(oglas);
            setOglas(initialState);
        }
    };

    const handleChange = (e) => {
        const { value, name } = e.target;
        let valueToUse = value;

        if (name === "fk_kategorija_id") {
            const selectedKategorija = kategorija.find((k) => k.id === value);
            if (selectedKategorija) {
                valueToUse = selectedKategorija.id;
            }
        }

        setOglas((prevState) => {
            const nextState = {
                ...prevState,
                [name]: valueToUse,
                fk_oglas_id: parsan_id,
                fk_uporabnik_id: uporabnikovId,
            };
            return nextState;
        });
    };

    const handleFileChange = (e) => {
        let fileErrors = [];
        let files = Array.from(e.target.files);

        files.forEach(file => {
            if (!file.type.startsWith('image/')) {
                fileErrors.push(`Datoteka "${file.name}" ni veljavna slika.`);
            }
        });

        if (fileErrors.length > 0) {
            setErrors(prevState => ({ ...prevState, slika: fileErrors }));
        } else {
            setOglas({
                ...oglas,
                slika: files
            });
            setErrors(prevState => ({ ...prevState, slika: [] }));
        }
    }

    return (
        <>
            {errorIzBaze ? (
                <div className="text-center mt-12">
                    <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                        Ta zamenjava ne obstaja!
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
                                                Zamenjava
                                            </h1>
                                        </div>
                                        <hr className="mt-6 border-b-1 border-blueGray-300" />
                                    </div>
                                    <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                                        <div className="text-blueGray-400 text-center mb-3 font-bold">
                                            <small>Vnesite podatke o artiklu za zamenjavo</small>
                                        </div>

                                        <form onSubmit={handleSubmit}>
                                            <div className="relative w-full mb-3">
                                                <label
                                                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                    htmlFor="naslov"
                                                >
                                                    Naslov
                                                </label>
                                                <input
                                                    type="text"
                                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                    placeholder="Naslov"
                                                    name="naslov" id="naslov" value={oglas.naslov} onChange={handleChange}
                                                />
                                                <small className="text-red-500">{errors.naslov}</small>
                                            </div>
                                            <div className="relative w-full mb-3">
                                                <label
                                                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                    htmlFor="grid-password"
                                                >
                                                    Opis
                                                </label>
                                                <input type="text" placeholder="Opis" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-base shadow outline-none focus:outline-none focus:shadow-outline w-full" ž
                                                    name="opis" id="opis" value={oglas.opis} onChange={handleChange}
                                                />
                                                <small className="text-red-500">{errors.opis}</small>
                                            </div>
                                            <br></br>
                                            <div className="flex justify-between">
                                                <div className="w-1/2 px-2">
                                                    <div className="relative w-full mb-3">
                                                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="velikost">
                                                            Velikost
                                                        </label>
                                                        <select
                                                            name="velikost"
                                                            id="velikost"
                                                            value={oglas.velikost}
                                                            onChange={handleChange}
                                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                        >
                                                            {velikosti.map((v, index) => (
                                                                <option key={index} value={v.naziv}>{v.naziv}</option>
                                                            ))}
                                                        </select>
                                                        <small className="text-red-500">{errors.velikost}</small>
                                                    </div>
                                                </div>
                                                <div className="w-1/2 px-2">
                                                    <div className="relative w-full mb-3">
                                                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="kategorija">
                                                            Kategorija
                                                        </label>
                                                        <select
                                                            name="fk_kategorija_id"
                                                            id="fk_kategorija_id"
                                                            value={oglas.fk_kategorija_id}
                                                            onChange={handleChange}
                                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                        >
                                                            {kategorija.map((k, index) => (
                                                                <option key={index} value={k.id}>{k.naziv}</option>
                                                            ))}
                                                        </select>
                                                        <small className="text-red-500">{errors.kategorija}</small>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="relative w-full mb-3">
                                                <label
                                                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                    htmlFor="slike"
                                                >
                                                    Slike
                                                </label>
                                                <input
                                                    type="file"
                                                    multiple
                                                    id="slika"
                                                    name="slika"
                                                    onChange={handleFileChange}
                                                    className="border-0 px-3 py-3 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                />
                                                <small className="text-red-500">
                                                    {Array.isArray(errors.slika) ? errors.slika[0] : errors.slika}
                                                </small>
                                            </div>
                                            <div className="text-center mt-6">
                                                <button
                                                    className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                                                    type="submit"
                                                >
                                                    Poslji
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