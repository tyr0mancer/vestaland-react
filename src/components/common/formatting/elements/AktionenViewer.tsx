import React from "react";
import {KochschrittAktion} from "../../../../shared-types/models/KochschrittAktion";

type AktionenViewerProps = {
  aktionen: KochschrittAktion[]
}

/**
 * Formatiert 'Aktionen' zur Darstellung
 *
 * @see Aktionen
 */
export function AktionenViewer({aktionen}: AktionenViewerProps): React.ReactElement {
  return (<pre>{JSON.stringify(aktionen, null, 1)}</pre>)
}
