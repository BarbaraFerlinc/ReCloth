import React, { useState, useEffect } from "react";
import { UserAuth } from "context/AuthContext";
import api from "services/api";

import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footers/Footer.js";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const initialState = {
    za_dostavo: false,
    fk_uporabnik_id: 0,
    fk_prodajalec_id: 0,
    fk_oglas_id: 0,
}

const podatki_placila = {
}

// ce je za_dostavo == true, potem mora kupec poleg moznosti placila podati tudi naslov na katerega zeli dobiti posiljko
// ce je za_dostavo == false, potem mora kupec izpolniti samo podatke o placilu

export default function Nakup() {
    const { id } = useParams();
    let parsan_id;
    if (id !== undefined) {
        parsan_id = parseInt(id, 10);
    } else {
        parsan_id = undefined;
    }

    // iz id oglasa se more najt id prodajalca

    const [nakup, setNakup] = useState(initialState);
    const [errors, setErrors] = useState({ slika: [] });
    const [uporabnikovId, setUporabnikovId] = useState(0)

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
            });
    }, [user]);

    const validateForm = () => {
        let formErrors = {};
        let formIsValid = true;

        // treba se dodat

        setErrors(formErrors);
        return formIsValid;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            try {
                const formData = new FormData();
                formData.append("za_dostavo", nakup.za_dostavo);
                formData.append("fk_uporabnik_id", nakup.fk_uporabnik_id);
                formData.append("fk_prodajalec_id", nakup.fk_kategorija_id);
                formData.append("fk_oglas_id", parsan_id);

                // to se treba dodat na backendu

                const response = await api.post("/nakup/dodaj", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });

                if (response.status === 200) {
                    alert("Nakup uspešno shranjen!");
                } else {
                    alert("Napaka pri shranjevanju nakupa!");
                }

                setNakup(initialState);
                setErrors({})

                // more se poslat predlog prodajalcu

                navigate("/profile");
            } catch (error) {
                console.error("Napaka pri posredovanju zahteve POST", error);
            }
            //dodaj(oglas);
            setNakup(initialState);
        }
    };

    const handleChange = (e) => {
        const { value, name } = e.target;
        let valueToUse = value;

        setNakup((prevState) => {
            const nextState = {
                ...prevState,
                [name]: valueToUse,
                fk_uporabnik_id: uporabnikovId,
            };
            return nextState;
        });
    };

    return (
        <>
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
                                    <div className="relative w-full mb-3">
                                        <div class="w-full"><label class="inline-flex items-center cursor-pointer">
                                            <input type="checkbox" name="za_dostavo" id="za_dostavo" value={nakup.za_dostavo} onChange={handleChange} class="form-checkbox appearance-none ml-1 w-5 h-5 ease-linear transition-all duration-150 border border-blueGray-300 rounded checked:bg-blueGray-700 checked:border-blueGray-700 focus:border-blueGray-300" />
                                            <span class="ml-2 text-sm font-semibold text-blueGray-500">Dostava na dom</span></label></div>
                                    </div>
                                    <hr className="mt-6 border-b-1 border-blueGray-300" />
                                    <div className="text-blueGray-400 text-center mb-3 font-bold">
                                        <small>Vnesite podatke o placilu</small>
                                    </div>
                                    <br></br>
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
        </>
    )
}