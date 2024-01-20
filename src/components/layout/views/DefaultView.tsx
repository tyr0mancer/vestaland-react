import React from "react";
import {Box, Container} from "@mui/material";

import {FooterMain} from "../footer/FooterMain";
import {NavbarMain} from "../navbar/NavbarMain";
import {CustomAlerts} from "../../common/ui/CustomAlerts";
import {BenutzerRolle} from "../../../shared-types/enum";

interface DefaultViewProps {
  roleRequired?: BenutzerRolle;
  loginRequired?: boolean;
  children?: React.ReactNode;
  error?: any
}

export const DefaultView: React.FC<DefaultViewProps> = ({children}) => {
  return (
    <>
      <NavbarMain/>
      <Container style={{padding:"0 3px"}}>
        <Box className={'main-content'}>
          {children}
        </Box>
        <CustomAlerts/>
      </Container>
      <FooterMain/>
    </>
  );
};
