import React from "react";

import {MainMenu} from "../components/layout/Navbar";
import {RezeptSuche} from "../components/rezept/RezeptSuche";

export function RezepteSucheView() {
  return (<>
    <MainMenu/>
    <RezeptSuche/>
  </>);
}
