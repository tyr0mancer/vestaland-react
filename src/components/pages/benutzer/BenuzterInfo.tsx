import React from "react";
import {Link, Navigate, Route, Routes} from "react-router-dom";
import {AppBar, IconButton, Toolbar} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import {MeineRezepte} from "./MeineRezepte";
import {Account} from "./Account";
import {Favoriten} from "./Favoriten";
import GradeIcon from '@mui/icons-material/Grade';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import {ConditionalDisplay} from "../../layout/ConditionalDisplay";

export function BenutzerInfo() {
  return (<ConditionalDisplay restricted>
    <AppBar position="static">
      <Toolbar variant="dense">
        <Link to={'meine-rezepte'}><IconButton sx={{mr: 2}} size="small" color="secondary"
                                               aria-label="Meine Rezepte"><AutoStoriesIcon/> . Meine
          Rezepte</IconButton></Link>
        <Link to={'favoriten'}><IconButton sx={{mr: 2}} size="small" color="secondary"
                                           aria-label="Meine Rezepte"><GradeIcon/> Favoriten</IconButton></Link>
        <Link to={'account'}><IconButton sx={{mr: 2}} size="small" color="secondary"
                                         aria-label="Meine Rezepte"><PersonIcon/> Account</IconButton></Link>
      </Toolbar>
    </AppBar>
    <Routes>
      <Route path="/" element={<Navigate replace to="account"/>}/>
      <Route path="meine-rezepte" element={<MeineRezepte/>}/>
      <Route path="favoriten" element={<Favoriten/>}/>
      <Route path="account" element={<Account/>}/>
    </Routes>
  </ConditionalDisplay>);
}



