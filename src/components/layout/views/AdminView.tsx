import React from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import {Container, Paper} from "@mui/material";

import {CustomAlerts} from "../../common/ui/CustomAlerts";
import {NavbarAdmin} from "../navbar/NavbarAdmin";
import {FooterMain} from "../footer/FooterMain";
import {BilderAdmin, LebensmittelAdmin, UserAdmin, UtensilAdmin} from "../../pages/admin";
import {BenutzerRolle} from "../../../shared-types/enum";
import {ConditionalDisplay} from "../ConditionalDisplay";

export function AdminView() {
  return (<ConditionalDisplay restricted={[BenutzerRolle.ADMIN]}>
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
      <CustomAlerts/>
    </Container>
    <FooterMain/>
  </ConditionalDisplay>)
}
