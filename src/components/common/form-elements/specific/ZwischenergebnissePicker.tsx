import React from "react";

type ZwischenergebnissePickerProps = {
  name: string,
  label?: string
}

/**
 * TS Doc Info
 * @component ZwischenergebnissePicker
 */
export function ZwischenergebnissePicker({name}: ZwischenergebnissePickerProps): React.ReactElement {
  return (<div>ZwischenergebnissePicker {name}</div>)
}
