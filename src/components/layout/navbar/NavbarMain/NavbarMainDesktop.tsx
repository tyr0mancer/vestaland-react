import * as React from 'react';
import {Link} from "react-router-dom";

import {
  Menu,
  Container,
  Toolbar,
  Typography,
  Button,
  IconButton,
  MenuItem
} from "@mui/material";


import {
  AdminPanelSettings as AdminIcon,
  Person as UserIcon,
  AccountCircle as AccountIcon,
  Login as LoginIcon,
  EditNote as EditorIcon
} from '@mui/icons-material';


import Logo from "../../../../assets/images/logo.png";

import {useAuth} from "../../../../util/auth/AuthProvider";
import {LocalStorageKey} from "../../../../util/config/enums";
import {useLocalStorage} from "../../../../util/hooks/useLocalStorage";

import {BenutzerRolle} from "../../../../shared-types/enum";
import {Rezept} from "../../../../shared-types/models/Rezept";


export function NavbarMainDesktop() {
  const {isAuthorized} = useAuth()

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  }
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  }

  const [localStorageData] = useLocalStorage<Rezept>(LocalStorageKey.REZEPT_EDIT)

  return (<Container style={{padding: 0}}>
    <Toolbar style={{padding: 0}}>
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
          {isAuthorized() && localStorageData &&
              <Button component={Link} to={'/rezept-editor'} color="inherit">{localStorageData.name} editieren</Button>
          }
        </>
        }
      </Typography>

      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={handleOpenNavMenu}
        >
          <AccountIcon/>
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

          {!isAuthorized() &&
              <MenuItem onClick={handleCloseNavMenu}>
                  <Typography className={'menu-item'} component={Link}
                              to={'/login'}> <LoginIcon/> <span>Anmelden</span></Typography>
              </MenuItem>
          }

          {isAuthorized() &&
              <MenuItem onClick={handleCloseNavMenu}>
                  <Typography className={'menu-item'} component={Link}
                              to={'/user'}><UserIcon/> <span>Mein Vestaland</span></Typography>
              </MenuItem>
          }

          {isAuthorized() &&
              <MenuItem onClick={handleCloseNavMenu}>
                  <Typography className={'menu-item'} component={Link}
                              to={'/rezept-editor'}><EditorIcon/> <span>Rezept erfassen</span></Typography>
              </MenuItem>
          }


          {isAuthorized(BenutzerRolle.ADMIN) &&
              <MenuItem onClick={handleCloseNavMenu}>
                  <Typography className={'menu-item'} component={Link}
                              to={'/admin'}><AdminIcon/> <span>Admin-Bereich</span></Typography>
              </MenuItem>
          }


        </Menu>
      </Toolbar>

    </Toolbar></Container>)
}

