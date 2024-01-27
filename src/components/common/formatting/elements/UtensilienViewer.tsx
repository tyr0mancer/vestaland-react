import React from "react";
import {Utensil} from "../../../../shared-types/models/Utensil";
import {Box} from "@mui/material";

type UtensilienViewerProps = {
  utensilien: Utensil[]
}

/**
 * Formatiert 'Utensil[]' zur Darstellung
 *
 * @see Utensil
 */
export function UtensilienViewer({utensilien}: UtensilienViewerProps): React.ReactElement {
  return (<Box mt={2}>
    {utensilien.map((utensil, index) => {
      return <div key={index}><b>{utensil.utensilName}</b></div>
    })}
  </Box>)
}
