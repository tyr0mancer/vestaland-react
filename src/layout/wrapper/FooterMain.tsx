import React, {useEffect, useState} from "react";

import {BottomNavigationAction, Paper, SvgIconTypeMap} from "@mui/material";
import BottomNavigation from "@mui/material/BottomNavigation";
import RecipeIcon from "@mui/icons-material/MenuBook";
import ShoppingIcon from "@mui/icons-material/ShoppingCart";
import ScannerIcon from "@mui/icons-material/QrCodeScanner";
import {Link} from "react-router-dom";
import useLocalStorage from "use-local-storage";
import {Rezept} from "../../models/rezept.model";
import {OverridableComponent} from "@mui/material/OverridableComponent";

interface FooterState {
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string; }
  label: string
  to?: string
  disabled?: boolean
}

export function FooterMain() {

  const [footerState, setFooterState] = useState<FooterState[]>([])
  const [rezeptCache,] = useLocalStorage<Rezept | null>("rezept_editor", null)

  useEffect(() => {

    let rezeptTarget = "rezepte"
    if (rezeptCache !== null) {
      rezeptTarget += rezeptCache._id ? `/${rezeptCache._id}` : '/editor'
    }

    setFooterState([{
      label: "Rezepte",
      icon: RecipeIcon,
      to: rezeptTarget
    }, {
      label: "Einkaufsliste",
      icon: ShoppingIcon,
      to: "einkaufsliste"
    }, {
      label: "Scanner (tbc)",
      icon: ScannerIcon,
      disabled: true
    }
    ])
  }, [])

  return (
    <Paper sx={{position: 'fixed', bottom: 0, left: 0, right: 0}} elevation={3}>
      <BottomNavigation
        style={{backgroundColor: '#b4f7b7'}}
        showLabels
      >
        {footerState.map((entry, index) => (
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

