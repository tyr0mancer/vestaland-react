import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";

import {DefaultView} from "./views";
import {AdminView} from "./views";

import {Startseite, Impressum} from "../pages/static";
import {LoginForm, BenutzerInfo} from "../pages/benutzer";

import {RezeptSuche} from "../pages/rezept-suche";
import {RezeptEditor} from "../pages/rezept-editor";
import {RezeptDetail} from "../pages/rezept-detail";
import {KocheRezept} from "../pages/rezept-cooking";
import {EinkaufslisteView} from "../pages/einkaufsliste";


export function MainRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DefaultView children={<Startseite/>}/>}/>

        <Route path="/rezepte" element={<DefaultView children={<RezeptSuche/>}/>}/>
        <Route path="/rezepte/:rezeptId" element={<DefaultView children={<RezeptDetail/>}/>}/>
        <Route path="/rezept-editor" element={<DefaultView children={<RezeptEditor/>}/>}/>
        <Route path="/rezept-editor/:rezeptId" element={<DefaultView children={<RezeptEditor/>}/>}/>
        <Route path="/rezept-cooking" element={<DefaultView children={<KocheRezept/>}/>}/>


        <Route path="/einkaufsliste" element={<DefaultView children={<EinkaufslisteView/>}/>}/>
        <Route path="/einkaufsliste/:rezeptId" element={<DefaultView children={<EinkaufslisteView/>}/>}/>


        <Route path="/login" element={<DefaultView children={<LoginForm/>}/>}/>
        <Route path="/user/*" element={<DefaultView children={<BenutzerInfo/>}/>}/>
        <Route path="/admin/*" element={<AdminView/>}/>

        <Route path="/impressum" element={<DefaultView children={<Impressum/>}/>}/>

        <Route path="*" element={<DefaultView error={{code: 404, message: "Seite nicht gefunden."}}/>}/>
      </Routes>
    </BrowserRouter>
  );
}
