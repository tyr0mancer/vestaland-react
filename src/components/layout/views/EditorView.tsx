import React from "react";
import {Box, Container, Paper} from "@mui/material";

import {FooterMain} from "../footer/FooterMain";
import {NavbarMain} from "../navbar/NavbarMain";
import {CustomAlerts} from "../../common/ui/CustomAlerts";

interface EditorViewProps {
  children?: React.ReactNode;
  controlBar?: React.ReactNode;
}

export const EditorView: React.FC<EditorViewProps> = ({children, controlBar}) => {
  return (
    <>
      <NavbarMain controlBar={controlBar}/>
      <Container style={{padding: "0 3px"}}>
        <Box className={'main-content'}>
          {children}
        </Box>
        <CustomAlerts/>
      </Container>
      <FooterMain/>
    </>
  );
};
