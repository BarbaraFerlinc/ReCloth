import React from "react";
import { useParams } from "react-router-dom";
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footers/Footer";
import { useEffect, useState } from "react";
import api from "services/api";

export default function ProdajalecProfil() {
    const [prodajalec, setProdajalec] = useState({});
    const [oglasiProdajalca, setOglasiProdajalca] = useState([]);

    const { id } = useParams();
    let parsan_id;
    if (id !== undefined) {
        parsan_id = parseInt(id, 10);
    } else {
        parsan_id = undefined;
    }

    //console.log(id);

    useEffect(() => {
        const fetchProdajalec = async () => {
            try {
                const response = await api.get(`/uporabnik/${parsan_id}`);
                //console.log(response.data[0]);
                setProdajalec(response.data[0])
            } catch (error) {
                console.error("Napaka pri pridobivanju prodajalca", error);
            }
        };
        fetchProdajalec();

        const fetchOglasiProdajalca = async () => {
            try {
                const response = await api.get(`/artikel/profil/${parsan_id}`);
                //console.log(response.data);
                setOglasiProdajalca(response.data);
            } catch (error) {
                console.error("Napaka pri pridobivanju prodajalca", error);
            }
        };
        fetchOglasiProdajalca();
    }, []);

    //console.log(prodajalec);
    //console.log(oglasiProdajalca);



    return (
        <>
            <IndexNavbar fixed={true} />
            <section className="relative py-16 bg-blueGray-200">
                <div className="container mx-auto px-4">
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full md:w-3/4 mx-auto mt-24 mb-4 shadow-xl rounded-lg">
                        <div className="px-6">
                            <div className="text-center mt-12">
                                {prodajalec && (
                                    <>
                                        <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                                            {prodajalec.ime} {prodajalec.priimek}
                                        </h3>
                                        <div className="mb-2 text-blueGray-600 mt-4">
                                            <i className="fas fa-info-circle mr-2 text-lg text-blueGray-400"></i>
                                            {prodajalec.email}
                                        </div>
                                        <div className="mb-2 text-blueGray-600 mt-4">
                                            <i className="fas fa-phone mr-2 text-lg text-blueGray-400"></i>
                                            {prodajalec.telefon}
                                        </div>
                                        <div className="mb-2 text-blueGray-600 mt-4">
                                            <i className="fas fa-map-marker mr-2 text-lg text-blueGray-400"></i>
                                            {prodajalec.naslov}, {prodajalec.posta}
                                        </div>
                                        <div className="mb-2 text-blueGray-600 mt-4">
                                            <i className="fas fa-flag mr-2 text-lg text-blueGray-400"></i>
                                            {prodajalec.drzava}
                                        </div>
                                        <h6 className="text-xl font-semibold leading-normal text-blueGray-700 mb-4 mt-20">Ostali oglasi prodajalca</h6>
                                        <div className="flex justify-center">
                                            <table className="min-w-full divide-y divide-blueGray-400">
                                                <thead className="bg-blueGray-400">
                                                </thead>
                                                <tbody className="bg-blueGray-100 divide-y divide-blueGray-300">
                                                    {oglasiProdajalca?.map((oglas, index) => (
                                                        <tr key={oglas.id} className="bg-blueGray-200">
                                                            <td className="py-4 px-4">{oglas?.naslov}</td>
                                                            <td className="py-4 px-4">{oglas?.cena} €</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>


                                        </div>
                                        <br></br><br></br>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section >
            <Footer />

        </>
    );





}