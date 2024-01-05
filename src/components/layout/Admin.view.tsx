import React from "react";
import {RestrictedArea} from "../../services/auth/RestricedArea";
import {NavbarAdmin} from "./wrapper/NavbarAdmin";
import {Navigate, Route, Routes} from "react-router-dom";
import {UserAdmin} from "../pages/admin/UserAdmin";
import {LebensmittelAdmin} from "../pages/admin/LebensmittelAdmin";
import {UtensilAdmin} from "../pages/admin/UtensilAdmin";
import {BenutzerRolle} from "../../services/auth/types";
import {Container, Paper} from "@mui/material";
import {CustomAlerts} from "../pages/service-pages/CustomAlerts";
import {FooterMain} from "./wrapper/footer-main/FooterMain";
import {BilderAdmin} from "../pages/admin/BilderAdmin";

export function AdminView() {
  return (<RestrictedArea role={BenutzerRolle.ADMIN}>
    <NavbarAdmin/>
    <Container>
      <Paper className={'main-content'}>
        <Routes>
          <Route path="/" element={<Navigate replace to="lebensmittel"/>}/>
          <Route path="lebensmittel" element={<LebensmittelAdmin/>}/>
          <Route path="utensil" element={<UtensilAdmin/>}/>
          <Route path="bilder" element={<BilderAdmin/>}/>
          <Route path="user" element={<UserAdmin/>}/>
        </Routes>
      </Paper>
    </Container>
    <CustomAlerts/>
    <FooterMain/>
  </RestrictedArea>)
}
