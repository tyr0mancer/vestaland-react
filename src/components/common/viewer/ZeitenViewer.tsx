import {Box} from "@mui/material";
import React from "react";

import {ZeitenViewerProps} from "./types";


/**
 * Formatierte Visualisierung der Zeitangaben
 *
 *
 */
export function ZeitenViewer({arbeitszeit, wartezeit, gesamtdauer}: ZeitenViewerProps): React.ReactElement {
  return (<Box mt={2}>
    <div>Arbeitszeit: {arbeitszeit}</div>
    wartezeit: {wartezeit}
    gesamtdauer: {gesamtdauer}
  </Box>)
}
