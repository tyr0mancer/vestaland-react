import React from "react";
import {Betriebsart} from "../../../../shared-types/enum";

type BetriebsartViewerProps = {
  betriebsart?: Betriebsart,
  temperatur?: number
}

/**
 * Formatiert 'Betriebsart' zur Darstellung
 *
 * @see Betriebsart
 */
export function BetriebsartViewer({betriebsart, temperatur}: BetriebsartViewerProps): React.ReactElement {
  return (<pre>Temperatur: {temperatur}
    {JSON.stringify(betriebsart, null, 1)}</pre>)
}
