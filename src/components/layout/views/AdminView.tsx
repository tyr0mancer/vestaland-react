import React from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import {Box, Container} from "@mui/material";

import {CustomAlerts} from "../../common/ui/CustomAlerts";
import {NavbarAdmin} from "../navbar/NavbarAdmin";
import {FooterMain} from "../footer/FooterMain";
import {BilderAdmin, UserAdmin, UtensilAdmin} from "../../pages/admin";
import {BenutzerRolle} from "../../../shared-types/enum";
import {ConditionalDisplay} from "../ConditionalDisplay";

export function AdminView() {
  return (<ConditionalDisplay restricted={[BenutzerRolle.ADMIN]}>
    <NavbarAdmin/>
    <Container>
      <Box className={'main-content'}>
        <Routes>
          <Route path="/" element={<Navigate replace to="lebensmittel"/>}/>
          <Route path="utensil" element={<UtensilAdmin/>}/>
          <Route path="bilder" element={<BilderAdmin/>}/>
          <Route path="user" element={<UserAdmin/>}/>
        </Routes>
      </Box>
      <CustomAlerts/>
    </Container>
    <FooterMain/>
  </ConditionalDisplay>)
}
