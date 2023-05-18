import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
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




const Routing = () => {

    const poljeOglasov = [
        {
            id: 1001,
            naslov: "Majica 1",
            opis: "Udobna majica z dolgimi rokavi",
            cena: "25,99",
            zamenjava: false,
            slika: require("assets/img/team-2-800x800.jpg").default,
        },
        {
            id: 1002,
            naslov: "Majica 2",
            opis: "Modna majica z kratkimi rokavi",
            cena: "19,99",
            zamenjava: false,
            slika: require("assets/img/team-3-800x800.jpg").default,
        },
        {
            id: 1003,
            naslov: "Hlače 1",
            opis: "Kavbojke slim fit",
            cena: "45,99",
            zamenjava: false,
            slika: require("assets/img/team-4-470x470.png").default,
        },
        {
            id: 1004,
            naslov: "Hlače 2",
            opis: "Eleganten videz s klasičnimi hlačami",
            cena: "39,99",
            zamenjava: true,
            slika: require("assets/img/team-1-800x800.jpg").default,
        },
        {
            id: 1005,
            naslov: "Obleka 1",
            opis: "Čudovita večerna obleka",
            cena: "89,99",
            zamenjava: false,
            slika: require("assets/img/team-2-800x800.jpg").default,
        },
        {
            id: 1006,
            naslov: "Obleka 2",
            opis: "Elegantna poslovna obleka",
            cena: "79,99",
            zamenjava: true,
            slika: require("assets/img/team-3-800x800.jpg").default,
        },
    ];



    const [seznamOglasov, setSeznamOglasov] = useState(poljeOglasov);
    const [seznam, setSeznam] = useState([]);
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
        fetchArtikle();
    }, []);




    const handleAdd = (oglas) => {
        console.log(oglas);
        let posodobljeniOglasi = Array.from(seznam);
        posodobljeniOglasi.push(oglas);
        setSeznam(posodobljeniOglasi);

        const fetchArtikle = async () => {
            try {
                const response = await api.get('/artikel/vsi');
                console.log(response.data)
                setSeznam(response.data);
            } catch (error) {
                console.error("Napaka pri pridobivanju oglasov", error);
            }
        };
        fetchArtikle();
    }


    return (<>
        <AuthContextProvider>
            <Switch>
                <Route
                    path="/"
                    exact
                    render={(props) => <Index {...props} seznamOglasov={seznam} />}
                />
                <Route
                    path="/oglas/:id"
                    exact
                    render={(props) => <Podrobnosti {...props} seznamOglasov={seznam} />}
                />
                <Route
                    path="/objavaOglasa"
                    exact
                    render={(props) => (
                        <div className="bg-blueGray-200 min-h-screen">
                            <ObjavaOglasa {...props} dodaj={handleAdd} />
                        </div>
                    )}
                />
                <Route
                    path="/login"
                    exact
                    render={(props) => (
                        <div className="bg-blueGray-200 min-h-screen">
                            <Login {...props} />
                        </div>
                    )}
                />
                <Route
                    path="/register"
                    exact
                    render={(props) => (
                        <div className="bg-blueGray-200 min-h-screen">
                            <Register {...props} />
                        </div>
                    )
                    }
                />
                < Redirect from="*" to="/" />
            </Switch >
        </AuthContextProvider>
    </> 
    );
}

export default Routing;