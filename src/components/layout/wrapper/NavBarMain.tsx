import * as React from 'react';
import {Link} from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Menu from '@mui/material/Menu';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';

import AccountIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import LoginIcon from '@mui/icons-material/Login';


import logo from "../../../assets/images/logo.png";
import {BenutzerRolle} from "../../../services/auth/types";
import {useAuth} from "../../../services/auth/AuthProvider";


type Page = {
  name: string,
  target: string,
  restricted?: boolean,
  requiredRole?: BenutzerRolle
}


export function NavbarMain() {

  const {isAuthorized} = useAuth()

  const pages: Page[] = [
    {
      name: 'Rezepte',
      target: 'rezepte'
    },
    {
      name: 'Einkaufslisten',
      target: 'einkaufsliste',
      restricted: true
    },
    {
      name: 'Essensplan',
      target: 'essensplan',
      restricted: true
    },
    {
      name: 'Lagerhaltung',
      target: 'lagerhaltung',
      restricted: true
    }
  ];

  const settings: Page[] = [
    {
      name: 'Benutzerkonto',
      target: '/user'
    },
    {
      name: 'Adminbereich',
      target: '/admin',
      requiredRole: BenutzerRolle.ADMIN
    }
  ]


  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <div>
      <AppBar position="static" style={{width: "100%", backgroundColor: '#f00'}}>
        <Container maxWidth="xl" className={'main-nav'}>
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component={Link}
              to="/"
              sx={{
                mr: 2,
                display: {xs: 'none', md: 'flex'},
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
            </Typography>

            <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon style={{color: "#394d3a"}}/>
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
                sx={{
                  display: {xs: 'block', md: 'none'},
                }}
              >
                {pages.filter(page => !page.restricted || isAuthorized()).map((page) => (
                  <MenuItem key={page.target} onClick={handleCloseNavMenu}>
                    <Typography
                      component={Link}
                      to={`/${page.target}`}
                      style={{color: '#394d3a'}}
                      textAlign="center">{page.name}</Typography>
                  </MenuItem>)
                )}
              </Menu>
            </Box>
            <Link to={'/'}><img src={logo} alt="Vestaland Logo" style={{height: 48}}/></Link>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: {xs: 'flex', md: 'none'},
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
            </Typography>
            <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
              {pages.filter(page => !page.restricted || isAuthorized()).map((page) => (
                <Button
                  key={page.target}
                  className={'main-nav-button'}
                  component={Link}
                  to={`/${page.target}`}
                  onClick={handleCloseNavMenu}
                  sx={{my: 2, color: '#394d3a', display: 'block'}}
                >
                  {page.name}
                </Button>
              ))}
            </Box>

            <Box sx={{flexGrow: 0}}>
              {!isAuthorized() && <Tooltip title="Anmelden">
                  <IconButton sx={{p: 0}}>
                      <Link to="/login"><LoginIcon style={{color: "#394d3a"}}/></Link>
                  </IconButton>
              </Tooltip>}

              {isAuthorized() && <Tooltip title="Benutzerbereich">
                  <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                      <AccountIcon style={{color: "#394d3a"}}/>
                  </IconButton>
              </Tooltip>}
              <Menu
                sx={{mt: '45px'}}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.filter(setting => isAuthorized(setting.requiredRole)).map((setting) => (
                  <MenuItem key={setting.target} onClick={handleCloseUserMenu}>
                    <Typography component={Link} to={setting.target}
                                textAlign="center">{setting.name}</Typography>
                  </MenuItem>))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}
