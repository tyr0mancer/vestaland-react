import {BenutzerRolle} from "../../services/auth/types";
import React from "react";
import {useAuth} from "../../services/auth/AuthProvider";
import {ErrorPageView} from "./ErrorPage.view";
import {Container} from "@mui/material";
import {NavbarMain} from "./wrapper/navbar-main/NavbarMain";

interface EditorViewProps {
  roleRequired?: BenutzerRolle;
  loginRequired?: boolean;
  children?: React.ReactNode;
}

export const EditorView: React.FC<EditorViewProps> = ({children, roleRequired, loginRequired}) => {
  const {isAuthorized} = useAuth();

  if (loginRequired && !isAuthorized(roleRequired))
    return <ErrorPageView error={{code: 403, message: "Zugriff nicht gestattet"}}/>

  return (
    <>
      <NavbarMain/>
      <Container className="main-layout">
        {children}
      </Container>
    </>
  );
};
