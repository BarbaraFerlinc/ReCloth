import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";
import Index from "views/Index.js";
import Login from "views/auth/Login";
import { useState } from "react";

const Routing = () => {

    const poljeOglasov = [
        {
            id: 1,
            name: "Majica 1",
            description: "Udobna majica z dolgimi rokavi",
            price: "25,99 €",
            image: require("assets/img/team-2-800x800.jpg").default,
        },
        {
            id: 2,
            name: "Majica 2",
            description: "Modna majica z kratkimi rokavi",
            price: "19,99 €",
            image: require("assets/img/team-3-800x800.jpg").default,
        },
        {
            id: 3,
            name: "Hlače 1",
            description: "Kavbojke slim fit",
            price: "45,99 €",
            image: require("assets/img/team-4-470x470.png").default,
        },
        {
            id: 4,
            name: "Hlače 2",
            description: "Eleganten videz s klasičnimi hlačami",
            price: "39,99 €",
            image: require("assets/img/team-1-800x800.jpg").default,
        },
        {
            id: 5,
            name: "Obleka 1",
            description: "Čudovita večerna obleka",
            price: "89,99 €",
            image: require("assets/img/team-2-800x800.jpg").default,
        },
        {
            id: 6,
            name: "Obleka 2",
            description: "Elegantna poslovna obleka",
            price: "79,99 €",
            image: require("assets/img/team-3-800x800.jpg").default,
        },
    ];
    const [seznamOglasov, setSeznamOglasov] = useState(poljeOglasov);

    return (
        <Switch>
            <Route
                path="/"
                exact
                render={(props) => <Index {...props} seznamOglasov={seznamOglasov} />}
            />
            <Route path="/login" exact component={Login} />
            {/* add redirect for first page */}
            <Redirect from="*" to="/" />
        </Switch>

    )
}

export default Routing;