import React from "react";
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import {LebensmittelSuche} from "../views/lebensmittelSuche.view";
import {RezeptDetailansicht} from "../views/rezeptDetailansicht.view";
import {RezepteSuche} from "../views/rezepteSuche.view";

export function MainRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate replace to="/rezepte" />} />
        <Route path="/lebensmittel" element={<LebensmittelSuche/>}/>
        <Route path="/rezepte" element={<RezepteSuche/>}/>
        <Route path="/rezept/:rezeptId" element={<RezeptDetailansicht/>}/>
      </Routes>
    </BrowserRouter>
  );
}
