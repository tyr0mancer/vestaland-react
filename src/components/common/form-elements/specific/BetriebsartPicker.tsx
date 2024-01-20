import React from "react";

type BetriebsartPickerProps = {
  name: string,
  label?: string
}

/**
 * TS Doc Info
 * @component BetriebsartPicker
 */
export function BetriebsartPicker({name}: BetriebsartPickerProps): React.ReactElement {
  return (<div>BetriebsartPicker {name}</div>)
}
