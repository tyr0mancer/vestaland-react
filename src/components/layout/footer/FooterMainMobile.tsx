import React from "react";
import {Link, useLocation} from "react-router-dom";

import {BottomNavigationAction, Box} from "@mui/material";
import BottomNavigation from "@mui/material/BottomNavigation";

import SearchIcon from '@mui/icons-material/Search';
import ShoppingIcon from "@mui/icons-material/ShoppingCart";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import {useAuth} from "../../../util/auth/AuthProvider";


export function FooterMainMobile() {
  const {isAuthorized} = useAuth()

  return (
    <Box sx={{position: 'fixed', bottom: 0, left: 0, right: 0, display: {xs: 'block', md: 'none'}}}>
      <BottomNavigation value={useLocation().pathname} className={'main-footer'}>
        <BottomNavigationAction
          component={Link} to={"/rezepte"}
          label={"Kochbuch"}
          value={'/rezepte'}
          icon={<SearchIcon color={'primary'}/>}
        />
        <BottomNavigationAction
          component={Link} to={"/einkaufsliste"}
          label={"Einkaufsliste"}
          value={'/einkaufsliste'}
          icon={<ShoppingIcon color={'primary'}/>}
          disabled={!isAuthorized()}
        />
        <BottomNavigationAction
          component={Link} to={"/essensplan"}
          label={"Essensplan"}
          value={'/essensplan'}
          icon={<CalendarMonthIcon color={'primary'}/>}
          disabled={!isAuthorized()}
        />
      </BottomNavigation>
    </Box>)

}
