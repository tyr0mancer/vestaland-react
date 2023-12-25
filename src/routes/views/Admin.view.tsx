import React from "react";
import {Container} from "react-bootstrap";

import {NavbarMain} from "../../components/layout/NavbarMain";
import {RestrictedArea} from "../../services/auth/RestricedArea";
import {NavbarAdmin} from "../../components/layout/NavbarAdmin";
import {Navigate, Route, Routes} from "react-router-dom";
import {UserAdmin} from "../../components/admin/UserAdmin";
import {LebensmittelAdmin} from "../../components/admin/LebensmittelAdmin";
import {HilfsmittelAdmin} from "../../components/admin/HilfsmittelAdmin";

export function AdminView() {
  return (<>
    <NavbarMain title="Einkaufsliste"/>
    <Container className="main-layout">
      <RestrictedArea>
        <NavbarAdmin/>
        <Routes>
          <Route path="/" element={<Navigate replace to="lebensmittel"/>}/>
          <Route path="user" element={<UserAdmin/>}/>
          <Route path="lebensmittel" element={<LebensmittelAdmin/>}/>
          <Route path="hilfsmittel" element={<HilfsmittelAdmin/>}/>
        </Routes>
      </RestrictedArea>
    </Container>
  </>);
}
