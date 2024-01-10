import React from "react";
import {Grid} from "@mui/material";

interface ShowErforderlicheKochschritteProps {
  erforderlicheKochschritte?: string[]
}

/**
 * TS Doc Info
 * @component ShowErforderlicheKochschritte
 */
export function ShowErforderlicheKochschritte({erforderlicheKochschritte = []}: ShowErforderlicheKochschritteProps): React.ReactElement {
  return (<Grid container spacing={1}>
    <Grid item xs={4}></Grid>
    <Grid item xs={8}>{erforderlicheKochschritte?.join(',')}</Grid>
  </Grid>)
}
