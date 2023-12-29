import React from "react";
import {useAuth} from "../../services/auth/AuthProvider";
import {ErrorPageView} from "./ErrorPage.view";
import {NavbarMain} from "../wrapper/NavBarMain";
import {Container} from "react-bootstrap";
import {FooterMain} from "../wrapper/FooterMain";
import {BenutzerRolle} from "../../services/auth/types";

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
      <NavbarMain />
      <Container className="main-layout">
        {children}
      </Container>
      <FooterMain/>
    </>
  );
};
