import React from "react";
import {Box, Grid} from "@mui/material";

import {Rezept} from "../../../shared-types/models/Rezept";
import {RezeptCard} from "./RezeptCard";
import {ZuletztGekocht} from "./ZuletztGekocht";

export function RezeptSucheAusgabe({result}: { result?: Rezept[] }) {

  return (<Box mt={2} borderTop={1} paddingTop={1}>
    <Grid container spacing={{xs: 2, md: 3}} columns={{xs: 4, sm: 8, md: 16}}>
      {result?.map((rezept, index) =>
        <Grid item xs={2} sm={4} md={4} key={index}>
          <RezeptCard key={rezept._id} rezept={rezept}/>
        </Grid>
      )}

      {(!result || !result.length) && <>
{/*
          <Typography gutterBottom variant="h1" component="div">
              Keine Ergebnisse
          </Typography>
*/}
      </>}
    </Grid>

    {!result?.length && <ZuletztGekocht/>}

  </Box>)
}
