import React from "react";
import {Box, Typography} from "@mui/material";

interface FavoritenProps {
}

/**
 * TS Doc Info
 * @component Favoriten
 */
export function Favoriten({}: FavoritenProps): React.ReactElement {
  return (<Box mt={2}>
    <Typography variant="h4">Favoriten</Typography>
    <ul>
      <li>Favoriten</li>
      <li>(weitere) Listen</li>
    </ul>
  </Box>)
}
