import React, {useContext} from "react";

import {BottomNavigationAction, Paper} from "@mui/material";
import BottomNavigation from "@mui/material/BottomNavigation";
import RecipeIcon from "@mui/icons-material/MenuBook";
import ShoppingIcon from "@mui/icons-material/ShoppingCart";
import ScannerIcon from "@mui/icons-material/QrCodeScanner";
import {useAuth} from "../../services/auth/AuthProvider";
import {Link} from "react-router-dom";
import {StateContext} from "../../services/contexts/StateProvider";
import {StateContextType} from "../../services/contexts/types";


export function FooterMain() {
  const {isAuthorized} = useAuth()
  const {state} = useContext(StateContext) as StateContextType
  const rezepteTarget = state.aktuelleRezeptId ? "rezepte/" + state.aktuelleRezeptId : "rezepte"

  return (
    <Paper sx={{position: 'fixed', bottom: 0, left: 0, right: 0}} elevation={3}>
      <BottomNavigation
        style={{backgroundColor: '#b4f7b7'}}
        showLabels
      >
        <BottomNavigationAction component={Link} to={rezepteTarget} label="Rezepte" icon={<RecipeIcon/>} style={{color: '#394d3a'}}/>
        <BottomNavigationAction component={Link} to={'einkaufsliste'} label="Einkaufsliste" icon={<ShoppingIcon/>} disabled={!isAuthorized()} style={{color: '#394d3a'}}/>
        <BottomNavigationAction label="Scanner" icon={<ScannerIcon/>} disabled={true} style={{color: '#394d3a'}}/>
      </BottomNavigation>
    </Paper>)

}

