import React, { useState } from "react";
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footers/Footer.js";


const initialState = {
    id: 0,
    naslov: "",
    opis: "",
    velikost: "",
    cena: 0,
    lokacija: "",
    kategorija: "",
    //prodajalec: "",
    slika: [],
    slika: "",

}


export default function ObjavaOglasa({ dodaj }) {
    const [oglas, setOglas] = useState(initialState);
    const [zamenjava, setZamenjava] = useState(false);


    const kategorija = [
        { naziv: 'Otroške majice' },
        { naziv: 'Otroške hlače' },
        { naziv: 'Kratke majice' },
        { naziv: 'Majice' },
        { naziv: 'Kratke hlače' },
        { naziv: 'Dolge hlače' },
        { naziv: 'Obleke' },
        { naziv: 'Dodatki' }
    ];

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



    const handleSubmit = (e) => {
        e.preventDefault();
        dodaj(oglas);
        setOglas(initialState);
    }

    const handleChange = (e) => {
        if (e.target.id === 'zamenjava') {
            setZamenjava(!zamenjava);
        }
        const { value, name } = e.target
        setOglas((prevState) => {
            const nextState = {
                ...prevState,
                id: prevState.id++,
                [name]: name === "zamenjava" ? true : value,
            };
            return nextState;
        })
    }

    const handleFileChange = (e) => {
        setOglas({
            ...oglas,
            slika: [...e.target.files]
        });
    }

    return (
        <>
            <IndexNavbar />

            <div className="container mx-auto px-4 h-full mt-20"> {/* Sprememba razmaka od vrha */}
                <div className="flex content-center items-center justify-center h-screen">
                    <div className="w-full lg:w-6/12 px-4">
                        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white border-0">
                            <div className="rounded-t mb-0 px-6 py-6">
                                <div className="text-center mb-3">
                                    <h1 className="text-blueGray-500 font-bold">
                                        Objava oglasa
                                    </h1>
                                </div>
                                <hr className="mt-6 border-b-1 border-blueGray-300" />
                            </div>
                            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                                <div className="text-blueGray-400 text-center mb-3 font-bold">
                                    <small>Vnesite podatke o oglasu</small>
                                </div>

                                <form onSubmit={handleSubmit}>
                                    <div className="relative w-full mb-3">
                                        <div class="w-full"><label class="inline-flex items-center cursor-pointer">
                                            <input type="checkbox" name="zamenjava" id="zamenjava" value={oglas.zamenjava} onChange={handleChange} class="form-checkbox appearance-none ml-1 w-5 h-5 ease-linear transition-all duration-150 border border-blueGray-300 rounded checked:bg-blueGray-700 checked:border-blueGray-700 focus:border-blueGray-300" />
                                            <span class="ml-2 text-sm font-semibold text-blueGray-500">Ponujam tudi zamenjavo</span></label></div>
                                    </div>

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
                                                    <option value="">Izberite velikost</option>
                                                    {velikosti.map((v, index) => (
                                                        <option key={index} value={v.naziv}>{v.naziv}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="w-1/2 px-2">
                                            <div className="relative w-full mb-3">
                                                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="kategorija">
                                                    Kategorija
                                                </label>
                                                <select
                                                    name="kategorija"
                                                    id="kategorija"
                                                    value={oglas.kategorija}
                                                    onChange={handleChange}
                                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                >
                                                    <option value="">Izberite kategorijo</option>
                                                    {kategorija.map((k, index) => (
                                                        <option key={index} value={k.naziv}>{k.naziv}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-between">
                                        < div className="w-1/2 px-2">
                                            <div className="relative w-full mb-3">
                                                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                                                    {zamenjava ? 'Okvirna cena' : 'Cena'}
                                                </label>
                                                <input
                                                    type="number"
                                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                    placeholder={zamenjava ? 'Okvirna cena' : 'Cena'}
                                                    name="cena" id="cena" value={oglas.cena} onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                        < div className="w-1/2 px-2">
                                            <div className="relative w-full mb-3">
                                                <label
                                                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                    htmlFor="grid-password"
                                                >
                                                    Lokacija
                                                </label>
                                                <input
                                                    type="text"
                                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                    placeholder="Lokacija"
                                                    name="lokacija" id="lokacija" value={oglas.lokacija} onChange={handleChange}
                                                />
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
                                    </div>


                                    <div className="text-center mt-6">
                                        <button
                                            className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                                            type="submit"
                                        >
                                            Objavi
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )

}