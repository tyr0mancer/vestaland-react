import React from "react";
import {Nutrients} from "../../../shared-types/models/Nutrients";
import {Grid} from "@mui/material";

interface ShowNutrientsProps {
  nutrients?: Nutrients
}

/**
 * TS Doc Info
 * @component ShowNutrients
 */
export function ShowNutrients({nutrients}: ShowNutrientsProps): React.ReactElement {
  if (!nutrients) return (<></>)

  return (<Grid container spacing={2}>
    <Grid item xs={4} md={2} textAlign={'center'}>
      <b>{nutrients.kalorien}</b> Kalorien
    </Grid>
    <Grid item xs={4} md={2} textAlign={'center'}>
      <b>{nutrients.proteine}</b>g Proteine
    </Grid>
    <Grid item xs={4} md={2} textAlign={'center'}>
      <b>{nutrients.fett}</b>g Fett
    </Grid>
    <Grid item xs={4} md={2} textAlign={'center'}>
      <b>{nutrients.kohlenhydrate}</b>g Kohlenhydrate
    </Grid>
    <Grid item xs={4} md={2} textAlign={'center'}>
      <b>{nutrients.zucker}</b>g Zucker
    </Grid>
    <Grid item xs={4} md={2} textAlign={'center'}>
      <b>{nutrients.ballaststoffe}</b>g Ballaststoffe
    </Grid>

  </Grid>)
}
