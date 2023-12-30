import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import StorageIcon from '@mui/icons-material/Warehouse';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PersonIcon from '@mui/icons-material/Person';
import InfoIcon from '@mui/icons-material/Info';
import LoginIcon from '@mui/icons-material/Login';
import BlenderIcon from '@mui/icons-material/Blender';

import {Divider, Menu, MenuItem} from "@mui/material";
import {Link} from "react-router-dom";
import {useAuth} from "../../../services/auth/AuthProvider";
import {BenutzerRolle} from "../../../services/auth/types";
import {useContext} from "react";
import {StateContext} from "../../../services/contexts/StateProvider";
import {StateContextType} from "../../../services/contexts/types";


export function NavbarMainMobile() {
  const {isAuthorized} = useAuth()
  const {state: {rezeptCooking}} = useContext(StateContext) as StateContextType

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  }
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  }

  return (
    <Toolbar>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{mr: 2}}
        onClick={handleOpenNavMenu}
      >
        <MenuIcon/>
      </IconButton>

      <Menu
        id="menu-appbar"
        anchorEl={anchorElNav}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        open={Boolean(anchorElNav)}
        onClose={handleCloseNavMenu}
      >
        <MenuItem onClick={handleCloseNavMenu}>
          <Typography component={Link}
                      to={'/'}
                      textAlign="center"><InfoIcon/> Über Vestaland</Typography>
        </MenuItem>

        {isAuthorized() &&
            <MenuItem onClick={handleCloseNavMenu}>
                <Typography component={Link}
                            to={'/lagerhaltung'}
                            textAlign="center"><StorageIcon/> Lagerhaltung</Typography>
            </MenuItem>
        }
        {isAuthorized() &&
            <MenuItem onClick={handleCloseNavMenu}>
                <Typography component={Link}
                            to={'/rezept-editor'}
                            textAlign="center"><NoteAddIcon/> Rezept Editor</Typography>
            </MenuItem>
        }

        <Divider/>


        {!isAuthorized() &&
            <MenuItem onClick={handleCloseNavMenu}>
                <Typography component={Link}
                            to={'/login'}
                            textAlign="center"><LoginIcon/> Anmelden</Typography>
            </MenuItem>
        }

        {isAuthorized() &&
            <MenuItem onClick={handleCloseNavMenu}>
                <Typography component={Link}
                            to={'/user'}
                            textAlign="center"><PersonIcon/> Mein Vestaland</Typography>
            </MenuItem>
        }

        {isAuthorized(BenutzerRolle.ADMIN) &&
            <MenuItem onClick={handleCloseNavMenu}>
                <Typography component={Link}
                            to={'/admin'}
                            textAlign="center"><AdminPanelSettingsIcon/> Admin-Bereich</Typography>
            </MenuItem>
        }
      </Menu>


      {rezeptCooking && <>
          <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
            {rezeptCooking.name}
          </Typography>
          <Button color="secondary" variant="contained" component={Link}
                  to={'/rezept-cooking'}><BlenderIcon/>25:43</Button>
      </>}
    </Toolbar>)
}

