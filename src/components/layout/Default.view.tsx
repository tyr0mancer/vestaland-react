import React from "react";
import {Container, Paper} from "@mui/material";

import {useAuth} from "../../services/auth/AuthProvider";
import {BenutzerRolle} from "../../services/auth/types";
import {ErrorPageView} from "./ErrorPage.view";
import {FooterMain} from "./wrapper/footer-main/FooterMain";
import {NavbarMain} from "./wrapper/navbar-main/NavbarMain";

interface DefaultViewProps {
  roleRequired?: BenutzerRolle;
  loginRequired?: boolean;
  children?: React.ReactNode;
}

export const DefaultView: React.FC<DefaultViewProps> = ({children, roleRequired, loginRequired}) => {
  const {isAuthorized} = useAuth();

  if (loginRequired && !isAuthorized(roleRequired))
    return <ErrorPageView error={{code: 403, message: "Zugriff nicht gestattet"}}/>

  return (
    <>
      <NavbarMain/>
      <Container >
        <Paper className={'main-content'}>
          {children}
        </Paper>
      </Container>
      <FooterMain/>
    </>
  );
};
