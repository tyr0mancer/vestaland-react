import React from "react";
import {Grid} from "@mui/material";
import {Utensil} from "../../../shared-types/models/Utensil";

interface ShowUtensilienProps {
  utensilien: Utensil[]
}

/**
 * TS Doc Info
 * @component ShowUtensilien
 */
export function ShowUtensilien({utensilien}: ShowUtensilienProps): React.ReactElement {

  return (<Grid container spacing={1}>
    {utensilien.map((utensil, index) => (
      <React.Fragment key={index}>
        <Grid item xs={4}></Grid>
        <Grid item xs={8}>{utensil.utensilName}</Grid>
      </React.Fragment>
    ))}
  </Grid>)
}
