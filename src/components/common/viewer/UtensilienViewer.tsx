import React from "react";
import {Box} from "@mui/material";

import {UtensilienViewerProps, UtensilViewerProps} from "./types";


/**
 * Formatierte Visualisierung von 'Utensil[]'
 * @see Utensil
 */
export function UtensilienViewer({utensilien}: UtensilienViewerProps): React.ReactElement {
  return (<Box mt={2} className={'viewer-box'}>
    {(utensilien ?? []).map((utensil, index) => {
      return <UtensilViewer key={index} utensil={utensil}/>
    })}
  </Box>)
}


/**
 * Formatierte Visualisierung eines Utensils
 */
export function UtensilViewer({utensil}: UtensilViewerProps): React.ReactElement {
  if (!utensil) return <></>
  return <div><b>{utensil.utensilName}</b></div>
}
