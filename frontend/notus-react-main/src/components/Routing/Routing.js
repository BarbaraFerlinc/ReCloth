import React from "react";
import { Route, Routes, Redirect } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";
import Index from "views/Index.js";
import Login from "views/auth/Login";
import ObjavaOglasa from "views/ObjavaOglasa";
import Profile from "views/Profile";
import Register from "views/auth/Register";
import { useEffect, useState } from "react";
import api from "services/api";
import Podrobnosti from "views/Podrobnosti";
import { AuthContextProvider } from "context/AuthContext";
import ProdajalecProfil from "views/ProdajalecProfil";
import Zamenjava from "views/Zamenjava";
import Nakup from "views/Nakup";
import { UserAuth } from "context/AuthContext";
import PrivateRouting from "./PrivateRouting";
import UrejanjeOglasa from "views/UrejanjeOglasa";
import { Navigate } from "react-router-dom";
import PodrobnostiZamenjanega from "views/PodrobnostiZamenjanega";


const Routing = () => {
    const [seznam, setSeznam] = useState([]);
    const [seznamZamenjanih, setSeznamZamenjanih] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArtikle = async () => {
            try {
                const response = await api.get('/artikel/vsi');
                setSeznam(response.data);
            } catch (error) {
                console.error("Napaka pri pridobivanju oglasov", error);
            }
        };
        const fetchZamenjani = async () => {
            try {
                const response = await api.get('/zamenjava/vsi');
                setSeznamZamenjanih(response.data);
            } catch (error) {
                console.error("Napaka pri pridobivanju oglasov", error);
            }
        };

        fetchArtikle();
        fetchZamenjani();
    }, []);

    const fetchArtikle = async () => {
        try {
            const response = await api.get('/artikel/vsi');
            console.log(response.data)
            setSeznam(response.data);
        } catch (error) {
            console.error("Napaka pri pridobivanju oglasov", error);
        }
    };


    const handleAdd = () => {
        fetchArtikle();
    }

    const handleEdit = () => {
        fetchArtikle();
    }

    const izbris = (id) => {
        setSeznam(seznam.filter((oglas) => oglas.id !== id));
    };

    return (<>
        <AuthContextProvider>
            <Routes>
                <Route path="/" element={<Index seznamOglasov={seznam} />} />
                <Route path="/oglas/:id" element={<Podrobnosti seznamOglasov={seznam} />} />
                <Route path="/oglas-zamenjan/:id" element={<PodrobnostiZamenjanega seznamZamenjanih={seznamZamenjanih} />} />
                <Route path="/prodajalec/:id" element={<ProdajalecProfil />} />
                <Route path="/login" element={<div className="bg-blueGray-200 min-h-screen"><Login /></div>} />
                <Route path="/register" element={<div className="bg-blueGray-200 min-h-screen"><Register /></div>} />
                <Route path="" element={<PrivateRouting />}>
                    <Route path="/objavaOglasa" element={<div className="bg-blueGray-200 min-h-screen"><ObjavaOglasa dodaj={handleAdd} /></div>} />
                    <Route path="/profile" element={<Profile izbris={izbris} />} />
                    <Route path="/urejanje-oglasa/:id" element={<div className="bg-blueGray-200 min-h-screen"><UrejanjeOglasa seznamOglasov={seznam} onEdit={handleEdit} /></div>} />
                    <Route path="/zamenjava/:id" element={<Zamenjava />} />
                    <Route path="/nakup/:id" element={<Nakup />} />
                </Route>
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </AuthContextProvider>
    </>
    );
}

export default Routing;