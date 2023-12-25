import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {RezeptDetailView} from "./views/RezeptDetailansicht.view";
import {RezepteSucheView} from "./views/RezepteSuche.view";
import {Login} from "./views/login.view";
import {BenutzerView} from "./views/Benutzer.view";
import {ErrorPageView} from "./views/ErrorPage.view";
import {ImpressumView} from "./views/Impressum.view";
import {EinkaufsListeView} from "./views/EinkaufsListe.view";
import {AdminView} from "./views/Admin.view";
import {NavbarMain} from "./wrapper/NavBarNew";
import {Container} from "react-bootstrap";
import {StartseiteView} from "./views/StartseiteView";
import {FooterMain} from "./wrapper/FooterMain";

export function MainRouter() {
  // <Route path="/" element={<Navigate replace to="/rezepte" />} />

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<MainLayout/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export function MainLayout() {

  return (<>
    <NavbarMain/>

    <Container className="main-layout">
      <Routes>
        <Route path="/" element={<StartseiteView/>}/>
        <Route path="/rezepte" element={<RezepteSucheView/>}/>
        <Route path="/rezepte/:rezeptId" element={<RezeptDetailView/>}/>
        <Route path="/einkaufsliste" element={<EinkaufsListeView/>}/>

        <Route path="/login" element={<Login/>}/>
        <Route path="/user" element={<BenutzerView/>}/>

        <Route path="/impressum" element={<ImpressumView/>}/>
        <Route path="/admin/*" element={<AdminView/>}/>

        <Route path="*" element={<ErrorPageView error={{code: 404, message: "Seite nicht gefunden."}}/>}/>
      </Routes>
    </Container>

    <FooterMain/>
  </>);
}

