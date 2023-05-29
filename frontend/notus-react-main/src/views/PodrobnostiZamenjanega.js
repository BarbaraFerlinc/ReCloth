import React, { useEffect, useState }  from "react";
import api from "services/api";
import { UserAuth } from "context/AuthContext";

import { useParams } from "react-router-dom";
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footers/Footer";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Slider from "react-slick"; // uvozite knjižnico "react-slick" za drsnik slik
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import { generatePdf } from "./Index";

export default function PodrobnostiZamenjanega({ izbris }) {
    const [izbira, setIzbira] = useState("");
    const [oglas, setOglas] = useState();
    const [error, setError] = useState(null);

    const [prodajalec, setProdajalec] = useState({});
    const [kupec,  setKupec] = useState({});

    const navigate = useNavigate();
    const [clicked, setClicked] = useState(null);
    const [uporabnikovEmail, setUporabnikovEmail] = useState("");
    const [errorIzBaze, setErrorIzBaze] = useState(null);

    const { user } = UserAuth();
    const { id } = useParams();
    let parsan_id;
    if (id !== undefined) {
        parsan_id = parseInt(id, 10);
    } else {
        parsan_id = undefined;
    }

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    useEffect(() => {
        api.get(`/zamenjava/${parsan_id}`)
            .then(res => {
                setIzbira(res.data)
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
    }, [parsan_id]);

    useEffect(() => {
        const uporabnikovEmail = user.email;
        console.log("Uporabnikov email je: ", uporabnikovEmail)

        api.post('uporabnik/prijavljen-profil', { email: uporabnikovEmail })
            .then(res => {
              const uporabnik_profil = res.data.user;
              setProdajalec(uporabnik_profil);
            })
            .catch(err => {
              console.error(err);
            });
    }, [user]);

    const dobiKupca = async () => {
        try {
            const response = await api.get(`/uporabnik/${izbira?.fk_uporabnik_id}`);
            setKupec(response.data[0])
        } catch (error) {
            console.error("Napaka pri pridobivanju kupca", error);
        }
    };

    useEffect(() => {
        api.get(`/artikel/${izbira?.fk_oglas_id}`)
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
        dobiKupca();
    }, [izbira]);

    const posljiPotrdilo = async (e) => {
        let kupecIme = kupec.ime + " " + kupec.priimek;
        let prodajalecIme = prodajalec.ime + " " + prodajalec.priimek;
        let stevilkaRacuna = 'oglas_' + oglas.id;

        console.log(kupec)
        console.log(prodajalec)

        const podatki = {
            subject: 'Potrdilo zamenjave',
            body: `Potrdilo zamenjave.\n\nKupec: ${kupecIme} (${kupec.email})\nProdajalec: ${prodajalecIme} (${prodajalec.email})\nŠtevilka nakupa: oglas_${oglas.id}\nNačin plačila: Zamenjava\nNacin prevzema: Po dogovoru`,
            to: [kupec.email, prodajalec.email],
        }

        const pdfDataUri = generatePdf(kupecIme, prodajalecIme, oglas.cena, stevilkaRacuna, oglas.naslov);
        podatki.pdfDataUri = pdfDataUri;
        
        const res = await api.post("/mail/poslji", podatki, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        });

        if (res.status === 200) {
            console.log(200);
        } else {
            console.log(res.status);
        }
    }

    const posljiZavrnitev = async () => {
        let kupecIme = kupec.ime + " " + kupec.priimek;
        let prodajalecIme = prodajalec.ime + " " + prodajalec.priimek;

        console.log(kupec)
        console.log(prodajalec)

        const podatki = {
            subject: 'Zavrnitev zamenjave',
            body: `Zamenjava je bila zavrnjena.\n\nKupec: ${kupecIme} (${kupec.email})\nProdajalec: ${prodajalecIme} (${prodajalec.email})\nŠtevilka oglasa: oglas_${oglas.id}`,
            to: [kupec.email, prodajalec.email],
        }
        
        const res = await api.post("/mail/poslji", podatki, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        });

        if (res.status === 200) {
            console.log(200);
        } else {
            console.log(res.status);
        }
    }

    const handleSprejmiClick = () => {
        api.post('obvestilo/dodaj', {
            fk_oglas_id: izbira?.fk_oglas_id,
            fk_uporabnik_id: izbira?.fk_uporabnik_id,
            jeSprejeto: 2
        })
            .then(response => {
                if (response.status === 200) {
                    izbris();
                    navigate('/');
                }
            })
            .catch(error => {
                // Handle the error
                console.error(error);  // You can customize this part based on your needs
            });
        posljiPotrdilo();
    };

    const handleZavrniClick = () => {
        api.post('obvestilo/dodaj2', {
            fk_oglas_id: izbira?.fk_oglas_id,
            fk_uporabnik_id: izbira?.fk_uporabnik_id,
            jeSprejeto: 1
        })
            .then(response => {
                if (response.status === 200) {
                    izbris();
                    navigate('/');
                }
            })
            .catch(error => {
                console.error(error);
            });
        posljiZavrnitev();
    };

    // useEffect(() => {
    //     const oglasId = parsan_id;
    //     console.log("Oglas Id je: ", oglasId)

    //     api.post('uporabnik/get-email-from-oglas-id', { id: oglasId })
    //         .then(res => {
    //             const uporabnikovEmailizOglasa = res.data.userEmail;
    //             console.log("Uporabnikov email iz oglasa je: ", uporabnikovEmailizOglasa);
    //             if (user.email !== uporabnikovEmailizOglasa) {
    //                 navigate("/");
    //             } else {
    //                 // Your handling code here if both emails are the same
    //                 console.log("User email and Uporabnikov email are the same");
    //             }
    //         })
    //         .catch(err => {
    //             console.error(err);
    //             if (err.response && err.response.data && err.response.data.error) {
    //                 console.log("error message:", err.response.data.error);
    //                 setErrorIzBaze(err.response.data.error);
    //             } else {
    //                 console.log("error message: Napaka pri pridobivanju podatkov");
    //                 setErrorIzBaze("Napaka pri pridobivanju podatkov");
    //             }
    //         });
    // }, [user]);

    return (
        <>
            {errorIzBaze ? (
                <div className="text-center mt-12">
                    <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                        Ta izmenjava ne obstaja
                    </h3>
                    <Link to="/">
                        <button className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                            Pojdi nazaj
                        </button>
                    </Link>
                </div>

            ) : (
                <div>
                    <IndexNavbar fixed={true} />
                    <section className="relative py-16 bg-blueGray-200">
                        <div className="container mx-auto px-4">
                            <div className="relative flex flex-col min-w-0 break-words bg-white w-full md:w-3/4 mx-auto mt-24 mb-4 shadow-xl rounded-lg">
                                <div className="px-6">
                                    <div className="text-center mt-12">
                                        <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                                            {izbira?.naslov}
                                        </h3>
                                        <div className="mb-2 text-blueGray-600 mt-4">
                                            <i className="fas fa-ruler-combined mr-2 text-lg text-blueGray-400"></i>
                                            Velikost: {izbira?.velikost}
                                        </div>
                                        <div className="mb-2 text-blueGray-600 mt-4">
                                            <i className="fas fa-info-circle mr-2 text-lg text-blueGray-400"></i>
                                            Opis: <br></br>{izbira?.opis}
                                        </div>
                                        <div className="mb-2 text-blueGray-900 mt-4">
                                            <i className="fas fa-user mr-2 text-lg text-blueGray-900"></i>
                                            Rad bi zamenjal: {izbira?.uporabnik?.ime} {izbira?.uporabnik?.priimek}
                                        </div>
                                        <br></br>
                                        <div className="relative flex flex-col min-w-0 break-words bg-blueGray-200 w-full md:w-3/4 mx-auto mb-20 shadow-xl rounded-lg">
                                            <div className="px-6">
                                                <section className="relative block" style={{ height: "70vh" }}>
                                                    <br></br>
                                                    {<Slider {...settings}>
                                                        {izbira?.slike?.map((slika, index) => {
                                                            const slikaPath = slika.split("\\uploads\\")[1];
                                                            return (
                                                                <div key={index} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                                    <img
                                                                        alt={`slika-${index}`}
                                                                        className="w-full align-middle rounded-lg"
                                                                        src={`http://localhost:9000/uploads/${slikaPath}`}
                                                                        style={{
                                                                            objectFit: "cover",
                                                                            height: "60vh",
                                                                            width: "60%",
                                                                            margin: "auto",
                                                                        }}
                                                                    />
                                                                </div>
                                                            );
                                                        })}
                                                    </Slider>}
                                                </section>
                                            </div>
                                        </div>
                                        <div className="flex justify-center mt-10 mb-8">
                                            <button
                                                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                type="button"
                                                onClick={handleSprejmiClick}

                                            >
                                                Sprejmi
                                            </button>
                                            <button
                                                className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                type="button"
                                                onClick={handleZavrniClick}

                                            >
                                                Zavrni
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section >
                    <Footer />
                </div>
            )}
        </>
    );

}




