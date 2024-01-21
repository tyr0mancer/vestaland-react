import React from "react";
import {Utensil} from "../../../../shared-types/models/Utensil";

type UtensilienViewerProps = {
  utensilien: Utensil[]
}

/**
 * Formatiert 'Utensil[]' zur Darstellung
 *
 * @see Utensil
 */
export function UtensilienViewer({utensilien}: UtensilienViewerProps): React.ReactElement {
  return (<pre>{JSON.stringify(utensilien, null, 1)}</pre>)
}
