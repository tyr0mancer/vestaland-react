import React, {useContext} from "react";
import {Link} from "react-router-dom";
import {BottomNavigationAction, Box, BottomNavigation} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {StateContext} from "../../../../services/contexts/global-state/StateProvider";
import {StateContextType} from "../../../../services/contexts/global-state/types";

export function FooterMainDesktop() {
  const {state: {rezeptCooking}} = useContext(StateContext) as StateContextType
  if (!rezeptCooking)
    return (<></>)

  return (
    <Box sx={{position: 'fixed', bottom: 0, left: 0, right: 0, display: {xs: 'none', md: 'block'}}}>
      <BottomNavigation className={'main-footer'}>
        <BottomNavigationAction
          component={Link} to={"/rezept-cooking"}
          label={"Kochbuch"}
          icon={<SearchIcon/>}
        />

      </BottomNavigation>
    </Box>


  )

}
