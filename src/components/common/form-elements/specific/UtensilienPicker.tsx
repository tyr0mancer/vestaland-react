import React from "react";

type UtensilienPickerProps = {
  name: string,
  label?: string
}

/**
 * TS Doc Info
 * @component UtensilienPicker
 */
export function UtensilienPicker({name}: UtensilienPickerProps): React.ReactElement {
  return (<div>UtensilienPicker {name}</div>)
}
