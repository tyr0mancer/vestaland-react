import React, {useContext, useEffect, useState} from "react";

import {BottomNavigationAction, Paper, SvgIconTypeMap} from "@mui/material";
import BottomNavigation from "@mui/material/BottomNavigation";
import RecipeIcon from "@mui/icons-material/MenuBook";
import ShoppingIcon from "@mui/icons-material/ShoppingCart";
import ScannerIcon from "@mui/icons-material/QrCodeScanner";
import EditIcon from "@mui/icons-material/EditNote";
import CookingIcon from "@mui/icons-material/Blender";
import {Link} from "react-router-dom";
import useLocalStorage from "use-local-storage";
import {Rezept} from "../../models/rezept.model";
import {OverridableComponent} from "@mui/material/OverridableComponent";
import {StateContext} from "../../services/contexts/StateProvider";
import {StateContextType} from "../../services/contexts/types";
import {useAuth} from "../../services/auth/AuthProvider";

interface FooterItem {
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string; }
  label: string
  to?: string
  disabled?: boolean
}

export function FooterMain() {
  const {state} = useContext(StateContext) as StateContextType
  const [footer, setFooter] = useState<FooterItem[]>([])
  const [rezeptCooking,] = useLocalStorage<Rezept | null>("rezept_cooking", null)
  const [rezeptEdit,] = useLocalStorage<Rezept | null>("rezept_editor", null)
  const {isAuthorized,} = useAuth()

  useEffect(() => {

    const newFooter: FooterItem[] = []

    state.rezeptViewing ? newFooter.push({
      label: state.rezeptViewing.name,
      icon: RecipeIcon,
      to: 'rezepte/' + state.rezeptViewing._id
    }) : newFooter.push({
      label: "Rezeptbuch",
      icon: RecipeIcon,
      to: 'rezepte'
    })

    newFooter.push({
      label: "Einkaufsliste",
      icon: ShoppingIcon,
      to: "einkaufsliste",
      disabled: !isAuthorized()
    })

    if (rezeptCooking !== null && isAuthorized()) {
      newFooter.push({
        label: "Kochen",
        icon: CookingIcon,
        to: 'rezept-cooking'
      })
    } else if (rezeptEdit !== null && isAuthorized()) {
      newFooter.push({
        label: "Editieren",
        icon: EditIcon,
        to: 'rezept-editor'
      })
    } else newFooter.push({
      label: "Scanner",
      icon: ScannerIcon,
      disabled: true
    })


    setFooter(newFooter)
  }, [rezeptEdit, setFooter, state, isAuthorized, rezeptCooking])

  return (
    <Paper sx={{position: 'fixed', bottom: 0, left: 0, right: 0}} elevation={3}>
      <BottomNavigation
        style={{backgroundColor: '#b4f7b7'}}
        showLabels
      >
        {footer.map((entry, index) => (
          <BottomNavigationAction
            key={index}
            component={Link} to={entry.to || ""}
            label={entry.label} icon={<entry.icon/>}
            disabled={entry.disabled}
            style={!entry.disabled ? {color: '#394d3a'} : {color: '#ccc'}}/>
        ))}
      </BottomNavigation>
    </Paper>)

}

