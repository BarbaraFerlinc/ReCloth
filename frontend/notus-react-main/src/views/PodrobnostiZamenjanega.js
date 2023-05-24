import React from "react";
import { useParams } from "react-router-dom";
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footers/Footer";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Slider from "react-slick"; // uvozite knjižnico "react-slick" za drsnik slik
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import api from "services/api";
import { useEffect, useState } from "react";
import { UserAuth } from "context/AuthContext";
import { useNavigate } from "react-router-dom"



export default function PodrobnostiZamenjanega({ izbris }) {
    const [izbira, setIzbira] = useState("");
    const [error, setError] = useState(null);


    const navigate = useNavigate();


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
                setIzbira(res.data);
            })
            .catch(err => {
                console.error(err);
                if (err.response && err.response.data && err.response.data.error) {
                    setError(err.response.data.error);
                } else {
                    setError("Napaka pri pridobivanju podatkov");
                }
            });
    }, [parsan_id]);


    const handleSprejmiClick = () => {
        api.post('obvestilo/dodaj', {
            fk_oglas_id: izbira?.fk_oglas_id,
            fk_uporabnik_id: izbira?.fk_uporabnik_id,
            jeSprejeto: 2
        })
            .then(response => {
                if(response.status === 200) {
                    izbris();
                    navigate('/');      
                }
            })
            .catch(error => {
                // Handle the error
                console.error(error);  // You can customize this part based on your needs
            });
    };

    const handleZavrniClick = () => {
        api.post('obvestilo/dodaj2', {
            fk_oglas_id: izbira?.fk_oglas_id,
            fk_uporabnik_id: izbira?.fk_uporabnik_id,
            jeSprejeto: 2
        })
            .then(response => {
                if(response.status === 200) {
                    izbris();
                    navigate('/');      
                }
            })
            .catch(error => {
                // Handle the error
                console.error(error);  // You can customize this part based on your needs
            });
    };




    return (
        <>
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
        </>
    );
}




