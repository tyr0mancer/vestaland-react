import React from "react";
import {Kochschritt} from "../../../../shared-types/models/Kochschritt";

type KochschrittViewProps = {
  kochschritt: Kochschritt,
  index: number
}

/**
 * TS Doc Info
 * @component KochschrittView
 */
export function KochschrittView({kochschritt}: KochschrittViewProps): React.ReactElement {
  return (<pre>{JSON.stringify(kochschritt, null, 1)}</pre>)
}
