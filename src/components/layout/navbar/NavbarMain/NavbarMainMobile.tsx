import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import InventoryIcon from '@mui/icons-material/Inventory';
import LoginIcon from '@mui/icons-material/Login';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PersonIcon from '@mui/icons-material/Person';
import InfoIcon from '@mui/icons-material/Info';
import EditNoteIcon from '@mui/icons-material/EditNote';

import {Divider, Menu, MenuItem} from "@mui/material";
import {Link} from "react-router-dom";
import {useAuth} from "../../../../util/auth/AuthProvider";
import {BenutzerRolle} from "../../../../shared-types/enum";
import {KochstatusAnzeigeMobile} from "../../../pages/rezept-cooking";

export function NavbarMainMobile({controlBar}: { controlBar?: React.ReactNode }) {
  const {isAuthorized} = useAuth()

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
          <Typography className={'menu-item'} component={Link}
                      to={'/'}><InfoIcon/> <span>Über Vestaland</span>
          </Typography>
        </MenuItem>

        {isAuthorized() &&
            <MenuItem onClick={handleCloseNavMenu}>
                <Typography className={'menu-item'} component={Link}
                            to={'/lagerhaltung'}><InventoryIcon/> <span>Lagerhaltung</span>
                </Typography>
            </MenuItem>
        }

        {isAuthorized() &&
            <MenuItem onClick={handleCloseNavMenu}>
                <Typography className={'menu-item'} component={Link}
                            to={'/rezept-editor'}><EditNoteIcon/> <span>Rezept Editor</span>
                </Typography>
            </MenuItem>
        }

        <Divider/>


        {!isAuthorized() &&
            <MenuItem onClick={handleCloseNavMenu}>
                <Typography className={'menu-item'} component={Link}
                            to={'/login'}><LoginIcon/> <span>Anmelden</span>
                </Typography>
            </MenuItem>
        }

        {isAuthorized() &&
            <MenuItem onClick={handleCloseNavMenu}>
                <Typography className={'menu-item'} component={Link}
                            to={'/user'}><PersonIcon/> <span>Mein Vestaland</span></Typography>
            </MenuItem>
        }

        {isAuthorized(BenutzerRolle.ADMIN) &&
            <MenuItem onClick={handleCloseNavMenu}>
                <Typography className={'menu-item'} component={Link}
                            to={'/admin'}><AdminPanelSettingsIcon/> <span>Admin-Bereich</span></Typography>
            </MenuItem>
        }
      </Menu>

      <KochstatusAnzeigeMobile/>

      {controlBar && <>{controlBar}</>}
    </Toolbar>)
}

