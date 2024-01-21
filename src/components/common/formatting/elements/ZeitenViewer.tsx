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
  return (<pre>
    arbeitszeit: {arbeitszeit}
    wartezeit: {wartezeit}
    gesamtdauer: {gesamtdauer}
  </pre>)
}
