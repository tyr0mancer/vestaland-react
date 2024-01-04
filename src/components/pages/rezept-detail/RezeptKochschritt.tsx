import React from "react";
import {Kochschritt} from "../../../models/kochschritt.model";

interface RezeptKochschrittProps {
  kochschritt: Kochschritt
}

/**
 * TS Doc Info
 * @component RezeptKochschritt
 */
export function RezeptKochschritt({kochschritt}: RezeptKochschrittProps): React.ReactElement {
  return (<pre>{JSON.stringify(kochschritt)}</pre>)
}
