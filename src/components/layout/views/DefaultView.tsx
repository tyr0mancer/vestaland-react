import React from "react";
import {Container, Paper} from "@mui/material";

import {useAuth} from "../../../util/auth/AuthProvider";
import {ErrorScreen} from "../../common/ui/ErrorScreen";
import {FooterMain} from "../footer";
import {NavbarMain} from "../navbar";
import {CustomAlerts} from "../../common/ui/CustomAlerts";
import {BenutzerRolle} from "../../../shared-types/enum";

interface DefaultViewProps {
  roleRequired?: BenutzerRolle;
  loginRequired?: boolean;
  children?: React.ReactNode;
  error?: any
}

export const DefaultView: React.FC<DefaultViewProps> = ({children, roleRequired, loginRequired, error}) => {
  const {isAuthorized} = useAuth();

  if (!error && loginRequired && !isAuthorized(roleRequired)) error = {code: 403, message: "Zugriff nicht gestattet"}

  if (error || (loginRequired && !isAuthorized(roleRequired)))
    return (<>
      <NavbarMain/>
      <Container>
        <Paper className={'main-content'}>
          <ErrorScreen error={error || {code: 403, message: "Zugriff nicht gestattet"}}/>
        </Paper>
      </Container>
      <FooterMain/>
    </>)


  return (
    <>
      <NavbarMain/>
      <Container>
        {error && <ErrorScreen error={error}/>}
        {!error && <Paper className={'main-content'}>
          {children}
        </Paper>}
        <CustomAlerts/>
      </Container>
      <FooterMain/>
    </>
  );
};
