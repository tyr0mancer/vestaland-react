import React from 'react';
import {Link} from 'react-router-dom';
import {AppBar, IconButton, Toolbar} from "@mui/material";
import SettingsIcon from '@mui/icons-material/Settings';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export function NavbarAdmin() {

  return (<AppBar position="static">
    <Toolbar variant="dense">
      <Link to={'/rezepte'}><IconButton sx={{mr: 2}} size="small" color="secondary"
                                        aria-label="Meine Rezepte"><ArrowBackIcon/> Zurück</IconButton></Link>
      <Link to={'lebensmittel'}><IconButton sx={{mr: 2}} size="small" color="secondary"
                                             aria-label="Meine Rezepte"><SettingsIcon/> Lebensmittel</IconButton></Link>
      <Link to={'utensil'}><IconButton sx={{mr: 2}} size="small" color="secondary"
                                         aria-label="Meine Rezepte"><SettingsIcon/> Utensilien</IconButton></Link>
      <Link to={'bilder'}><IconButton sx={{mr: 2}} size="small" color="secondary"
                                       aria-label="Meine Rezepte"><SettingsIcon/> Bilder</IconButton></Link>
      <Link to={'user'}><IconButton sx={{mr: 2}} size="small" color="secondary"
                                      aria-label="Meine Rezepte"><SettingsIcon/> Benutzer</IconButton></Link>
    </Toolbar>
  </AppBar>)
}
