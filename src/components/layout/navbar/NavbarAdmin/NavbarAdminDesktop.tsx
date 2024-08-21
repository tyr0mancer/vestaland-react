import * as React from 'react';
import {Link} from "react-router-dom";

import {
    Container,
    Toolbar,
    Typography,
    Button,
    IconButton
} from "@mui/material";

import {
    ExitToApp as ExitIcon
} from '@mui/icons-material';


import Logo from "../../../../assets/images/logo.png";


export function NavbarAdminDesktop() {

    return (<Container style={{padding: 0}}>
        <Toolbar style={{padding: 0}}>
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{mr: 2}}
            >
                <Link to={'/admin'}><img src={Logo} alt="Vestaland Logo" style={{height: 48}}/></Link>
            </IconButton>
            <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                <Button component={Link} to={'lebensmittel'} color="inherit">Lebensmittel</Button>
                <Button component={Link} to={'utensil'} color="inherit">Utensilien</Button>
                <Button component={Link} to={'bilder'} color="inherit">Bilder</Button>
                <Button component={Link} to={'user'} color="inherit">Benutzer</Button>
            </Typography>

            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                >
                    <Link to={'/'}><ExitIcon/></Link>
                </IconButton>
            </Toolbar>

        </Toolbar></Container>)
}

