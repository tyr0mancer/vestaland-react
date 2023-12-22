import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {LebensmittelSuche} from "../views/lebensmittelSuche.view";
import {RezeptDetailView} from "../views/RezeptDetailansicht.view";
import {RezepteSucheView} from "../views/RezepteSuche.view";
import {StartseiteView} from "../views/Startseite.view";
import {Login} from "../views/login.view";
import {BenutzerView} from "../views/Benutzer.view";
import {ErrorPageView} from "../views/ErrorPage.view";
import {ImpressumView} from "../views/Impressum.view";

export function MainRouter() {
  // <Route path="/" element={<Navigate replace to="/rezepte" />} />

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartseiteView/>}/>
        <Route path="/lebensmittel" element={<LebensmittelSuche/>}/>
        <Route path="/rezepte" element={<RezepteSucheView/>}/>
        <Route path="/rezept/:rezeptId" element={<RezeptDetailView/>}/>

        <Route path="/login" element={<Login/>}/>
        <Route path="/user" element={<BenutzerView/>}/>
        <Route path="/impressum" element={<ImpressumView/>}/>

        <Route path="*" element={<ErrorPageView error={{code: 404, message: "Seite nicht gefunden."}}/>}/>
      </Routes>
    </BrowserRouter>
  );
}



