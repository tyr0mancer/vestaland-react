import {BenutzerRolle} from "../../services/auth/types";
import React from "react";
import {useAuth} from "../../services/auth/AuthProvider";
import {ErrorPageView} from "./ErrorPage.view";
import {Container} from "@mui/material";
import {NavBarRezeptEditor} from "../wrapper/NavBarRezeptEditor";

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
      <NavBarRezeptEditor/>
      <Container className="main-layout">
        {children}
      </Container>
    </>
  );
};
