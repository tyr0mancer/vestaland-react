import React from "react";
import {Box, CircularProgress} from "@mui/material";

/**
 * TS Doc Info
 * @component LoadingScreen
 */
export function LoadingScreen(): React.ReactElement {
  return (
    <Box sx={{display: 'flex'}}>
      <CircularProgress/>
    </Box>
  );
}
