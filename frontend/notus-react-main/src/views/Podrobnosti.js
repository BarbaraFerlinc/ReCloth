import React from "react";
import { useParams } from "react-router-dom";
import IndexNavbar from "components/Navbars/IndexNavbar.js";


export default function Podrobnosti({ seznamOglasov }) {

    const { id } = useParams();
    let parsan_id;
    if (id !== undefined) {
        parsan_id = parseInt(id, 10);
    } else {
        parsan_id = undefined;
    }

    let izbira = seznamOglasov.find((i) => i.id === parsan_id);

    return (
        <>
            <div className="card relative flex flex-col min-w-0 break-words w-full mb-8 shadow-lg rounded-lg" style={{ backgroundColor: "#F1F5F9" }}>
                <div className="px-4 py-5 flex-auto">
                    <div className="mt-4">
                        <h5 className="card-title text-xl font-bold">{izbira?.naslov}</h5>
                        <p className="card-text mt-2 text-gray-600">{izbira?.opis}</p>
                        <h6 className="card-subtitle mt-2 text-black">{izbira?.cena} €</h6>
                        {/* <h6 className="card-subtitle mt-2 text-black">{oglas.zamenjava === true ? "Zamenjava" : "Nakup po ceni"}</h6> */}
                    </div>
                </div>
            </div>
        </>
    );












}




