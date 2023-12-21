import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {LebensmittelSuche} from "../views/lebensmittelSuche.view";
import {RezeptDetailansicht} from "../views/rezeptDetailansicht.view";
import {RezepteSuche} from "../views/rezepteSuche.view";
import {Startseite} from "../views/home.view";
import {Login} from "../views/login.view";
import {Benutzer} from "../views/user.view";

export function MainRouter() {
  // <Route path="/" element={<Navigate replace to="/rezepte" />} />

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Startseite/>}/>
        <Route path="/lebensmittel" element={<LebensmittelSuche/>}/>
        <Route path="/rezepte" element={<RezepteSuche/>}/>
        <Route path="/rezept/:rezeptId" element={<RezeptDetailansicht/>}/>

        <Route path="/login" element={<Login/>}/>
        <Route path="/user" element={<Benutzer/>}/>
      </Routes>
    </BrowserRouter>
  );
}



