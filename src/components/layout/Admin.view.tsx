import React from "react";
import {RestrictedArea} from "../../services/auth/RestricedArea";
import {NavbarAdmin} from "./wrapper/NavbarAdmin";
import {Navigate, Route, Routes} from "react-router-dom";
import {UserAdmin} from "../pages/admin/UserAdmin";
import {LebensmittelAdmin} from "../pages/admin/LebensmittelAdmin";
import {UtensilAdmin} from "../pages/admin/UtensilAdmin";
import {BenutzerRolle} from "../../services/auth/types";

export function AdminView() {
  return (<RestrictedArea role={BenutzerRolle.ADMIN}>
    <NavbarAdmin/>
    <Routes>
      <Route path="/" element={<Navigate replace to="lebensmittel"/>}/>
      <Route path="user" element={<UserAdmin/>}/>
      <Route path="lebensmittel" element={<LebensmittelAdmin/>}/>
      <Route path="utensil" element={<UtensilAdmin/>}/>
    </Routes>
  </RestrictedArea>)
}
