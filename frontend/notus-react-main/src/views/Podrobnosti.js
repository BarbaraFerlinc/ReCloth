import React from "react";
import { useParams } from "react-router-dom";
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footers/Footer";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Slider from "react-slick"; // uvozite knjižnico "react-slick" za drsnik slik
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { Route } from "react-router-dom/cjs/react-router-dom.min";


export default function Podrobnosti({ seznamOglasov }) {

    const { id } = useParams();
    let parsan_id;
    if (id !== undefined) {
        parsan_id = parseInt(id, 10);
    } else {
        parsan_id = undefined;
    }

    let izbira = seznamOglasov.find((i) => i.id === parsan_id);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    console.log(izbira);
    //console.log(izbira?.slike)


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
                                    <i className="fas fa-map-marker mr-2 text-lg text-blueGray-400"></i>
                                    {izbira?.lokacija}
                                </div>
                                <div className="mb-2 text-blueGray-600 mt-4">
                                    <i className="fas fa-ruler-combined mr-2 text-lg text-blueGray-400"></i>
                                    Velikost: {izbira?.velikost}
                                </div>
                                <div className="mb-2 text-blueGray-600 mt-4">
                                    <i className="fas fa-euro-sign mr-2 text-lg text-blueGray-400"></i>
                                    {izbira?.cena}
                                </div>
                                <div className="mb-2 text-blueGray-600 mt-4">
                                    <i className="fas fa-info-circle mr-2 text-lg text-blueGray-400"></i>
                                    Opis: {izbira?.opis}
                                </div>
                                <Link to={`/prodajalec/${izbira?.prodajalecID}`}>
                                    <div className="mb-2 text-blueGray-600 mt-4">
                                        <i className="fas fa-user mr-2 text-lg text-blueGray-400"></i>
                                        {izbira?.ime} {izbira?.priimek}
                                    </div>
                                </Link>
                                <div className="relative flex flex-col min-w-0 break-words bg-blueGray-200 w-full md:w-3/4 mx-auto mb-24 shadow-xl rounded-lg">
                                    <div className="px-6">
                                        <section className="relative block" style={{ height: "70vh" }}>
                          <br></br>
                                            <Slider {...settings}>
                                                {izbira?.slike.map((slika, index) => {
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
                                                                    width: "40%",
                                                                    margin: "auto",
                                                                }}
                                                            />
                                                        </div>
                                                    );
                                                })}
                                            </Slider>
                                        </section>
                                    </div>
                                </div>
                                <div className="flex justify-center mt-10 mb-8">
                                    <button
                                        className="bg-teal-500 text-white active:bg-teal-600 font-bold uppercase text-sm px-6 py-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                    >
                                        Kupi
                                    </button>
                                    {izbira?.za_zamenjavo === 1 && (
                                        <button
                                            className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                        >
                                            Zamenjaj
                                        </button>
                                    )}
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




