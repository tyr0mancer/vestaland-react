import React from "react";
import {Paper} from "@mui/material";

import {useAuth} from "../../services/auth/AuthProvider";
import {BenutzerRolle} from "../../services/auth/types";
import {ErrorPageView} from "./ErrorPage.view";
import {FooterMain} from "./wrapper/FooterMain";
import {NavbarMain} from "./wrapper/NavbarMain";

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
      <Paper>
        {children}
      </Paper>
      <FooterMain/>
    </>
  );
};
