import React from "react";
import {Box, Typography} from "@mui/material";


/**
 * TS Doc Info
 * @component Favoriten
 */
export function Favoriten(): React.ReactElement {
  return (<Box mt={2}>
    <Typography variant="h4">Favoriten</Typography>
    <ul>
      <li>Favoriten</li>
      <li>(weitere) Listen</li>
    </ul>
  </Box>)
}
