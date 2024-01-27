import {Box} from "@mui/material";
import React from "react";

type ZeitenViewerProps = {
  arbeitszeit?: number,
  wartezeit?: number,
  gesamtdauer?: number,
}

/**
 * Formatiert 'Zeiten' zur Darstellung
 *
 * @see Zeiten
 */
export function ZeitenViewer({arbeitszeit, wartezeit, gesamtdauer}: ZeitenViewerProps): React.ReactElement {
  return (<Box mt={2}>
    <div>Arbeitszeit: {arbeitszeit}</div>
    wartezeit: {wartezeit}
    gesamtdauer: {gesamtdauer}
  </Box>)
}
