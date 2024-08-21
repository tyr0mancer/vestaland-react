import React from 'react';
import {AppBar} from "@mui/material";
import Box from "@mui/material/Box";
import {NavbarAdminDesktop} from "./NavbarAdminDesktop";

export function NavbarAdmin() {

    return (
        <>
            {/*Handy Bildschirm*/}
            <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                <AppBar position="fixed" color="primary" className={'main-nav'}>
                    <NavbarAdminDesktop/>
                </AppBar>
            </Box>

            {/*Desktop Bildschirm*/}
            <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                <AppBar position="fixed" color="primary">
                    <NavbarAdminDesktop/>
                </AppBar>
            </Box>
        </>);

}
