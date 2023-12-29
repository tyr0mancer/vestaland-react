import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";

import {ErrorPageView} from "./components/layout/ErrorPage.view";
import {EditorView} from "./components/layout/Editor.view";
import {DefaultView} from "./components/layout/Default.view";

import {RezepteSuche} from "./components/pages/RezepteSuche";
import {Impressum} from "./components/pages/Impressum";
import {AdminView} from "./components/layout/Admin.view";
import {Startseite} from "./components/pages/Startseite";
import {KocheRezept} from "./components/pages/KocheRezept";


import {RezeptForm} from "./components/pages/rezept/RezeptForm";
import {EinkaufsListe} from "./components/pages/EinkaufsListe";
import {BenutzerInfo} from "./components/pages/BenuzterInfo";
import {LoginForm} from "./components/pages/benutzer/LoginForm";
import {RezeptDetail} from "./components/pages/rezept/RezeptDetail";

export function MainRouter() {
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
    <Routes>
      <Route path="/" element={<DefaultView children={<Startseite/>}/>}/>

      <Route path="/rezepte" element={<DefaultView children={<RezepteSuche/>}/>}/>
      <Route path="/rezepte/:rezeptId" element={<DefaultView children={<RezeptDetail/>}/>}/>

      <Route path="/rezept-editor" element={<EditorView children={<RezeptForm/>}/>}/>

      <Route path="/rezept-cooking" element={<DefaultView children={<KocheRezept/>}/>}/>
      <Route path="/einkaufsliste" element={<DefaultView children={<EinkaufsListe/>} loginRequired={true}/>}/>

      <Route path="/login" element={<DefaultView children={<LoginForm/>}/>}/>
      <Route path="/user" element={<DefaultView children={<BenutzerInfo/>}/>}/>
      <Route path="/impressum" element={<DefaultView children={<Impressum/>}/>}/>

      <Route path="/admin/*" element={<AdminView/>}/>

      <Route path="*" element={<ErrorPageView error={{code: 404, message: "Seite nicht gefunden."}}/>}/>
    </Routes>
  </>);
}



