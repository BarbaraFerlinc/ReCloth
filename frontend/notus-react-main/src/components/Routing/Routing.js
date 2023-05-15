import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";
import Index from "views/Index.js";
import Login from "views/auth/Login";
import { useState } from "react";
import ObjavaOglasa from "views/ObjavaOglasa";

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


    const handleAdd = (oglas) => {
        console.log(oglas);
        let posodobljeniOglasi = Array.from(seznamOglasov);
        posodobljeniOglasi.push(oglas);
        setSeznamOglasov(posodobljeniOglasi);
    }


    return (
        <Switch>
            <Route
                path="/"
                exact
                render={(props) => <Index {...props} seznamOglasov={seznamOglasov} />}
            />
            <Route path="/login" exact component={Login} />
            <Route
                path="/objavaOglasa"
                exact
                render={(props) => <ObjavaOglasa {...props} dodaj={handleAdd} />}
            />
            {/* add redirect for first page */}
            <Redirect from="*" to="/" />
        </Switch>

    )
}

export default Routing;