import * as React from 'react';
import {useContext} from "react";
import {Link} from "react-router-dom";
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InfoIcon from "@mui/icons-material/Info";
import {Menu, MenuItem} from "@mui/material";

import Logo from "../../../assets/images/logo.png";
import {useAuth} from "../../../services/auth/AuthProvider";
import {StateContext} from "../../../services/contexts/StateProvider";
import {StateContextType} from "../../../services/contexts/types";
import MenuIcon from "@mui/icons-material/Menu";
import {BenutzerRolle} from "../../../services/auth/types";

export function NavbarMainDesktop() {
  const {isAuthorized} = useAuth()
  const {state: {rezeptCooking}} = useContext(StateContext) as StateContextType

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  }
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  }

  return (<Toolbar>
    <IconButton
      size="large"
      edge="start"
      color="inherit"
      aria-label="menu"
      sx={{mr: 2}}
    >
      <Link to={'/'}><img src={Logo} alt="Vestaland Logo" style={{height: 48}}/></Link>
    </IconButton>
    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
      <Button component={Link} to={'/rezepte'} color="inherit">Kochbuch</Button>
      {isAuthorized() && <>
          <Button component={Link} to={'/einkaufsliste'} color="inherit">Einkaufsliste</Button>
          <Button component={Link} to={'/essensplan'} color="inherit">Essensplan</Button>
          <Button component={Link} to={'/lagerhaltung'} color="inherit">Lagerhaltung</Button>
        {isAuthorized(BenutzerRolle.BENUTZER) &&
            <Button component={Link} to={'/rezept-editor'} color="inherit">Rezept Editor</Button>
        }
      </>
      }
    </Typography>

    {rezeptCooking &&
        <Link to={'/rezept-cooking'}>{rezeptCooking?.name}</Link>
    }

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
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElNav)}
        onClose={handleCloseNavMenu}
      >

        <MenuItem onClick={handleCloseNavMenu}>
          {!isAuthorized(BenutzerRolle.BENUTZER) &&
              <Typography component={Link}
                          to={'/'}
                          textAlign="center"><InfoIcon/> Anmelden</Typography>
          }
        </MenuItem>

      </Menu>
    </Toolbar>

  </Toolbar>)
}

