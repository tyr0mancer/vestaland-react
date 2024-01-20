import React from "react";

type AktionenPickerProps = {
  name: string
}

/**
 * TS Doc Info
 * @component AktionenPicker
 */
export function AktionenPicker({name}: AktionenPickerProps): React.ReactElement {
  return (<div>AktionenPicker {name}</div>)
}
