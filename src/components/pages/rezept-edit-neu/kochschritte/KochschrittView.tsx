import {Box, Grid, Paper} from "@mui/material";
import React from "react";
import {Kochschritt} from "../../../../shared-types/models/Kochschritt";

type KochschrittViewProps = {
  kochschritt: Kochschritt,
  index: number
}

/**
 * TS Doc Info
 * @component KochschrittView
 */
export function KochschrittView({kochschritt}: KochschrittViewProps): React.ReactElement {
  /*  const classes = {
      root: {
        flexGrow: 1
      },
      paper: {
        padding: 20,
        textAlign: "center",
        backgroundColor: "black",
        color: "white"
      }
    };*/

  return (<Box mt={1}>

    <Paper elevation={5}>
      <Grid container spacing={2}>
        <Grid item xs>
          <Paper elevation={1}>elevation=1</Paper>
        </Grid>
        <Grid item xs>
          <Paper elevation={1}>elevation=1</Paper>
        </Grid>
      </Grid>

      <pre>{JSON.stringify(kochschritt, null, 1)}</pre>
    </Paper>
  </Box>)
}
