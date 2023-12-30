import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import {NavbarMainMobile} from "./NavbarMainMobile";
import {NavbarMainDesktop} from "./NavbarMainDesktop";

export function NavbarMain() {

  return (
    <>
      {/*Handy Bildschirm*/}
      <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
        <AppBar position="fixed" color="secondary" className={'main-nav'}>
          <NavbarMainMobile/>
        </AppBar>
      </Box>

      {/*Desktop Bildschirm*/}
      <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
        <AppBar position="fixed" color="secondary">
          <NavbarMainDesktop/>
        </AppBar>
      </Box>
    </>);
}
