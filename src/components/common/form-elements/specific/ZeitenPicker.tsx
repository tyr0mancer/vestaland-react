import React from "react";

type ZeitenPickerProps = {
  name: string,
  label?: string,
  variant: 'kochschritt' | 'rezept'
}

/**
 * TS Doc Info
 * @component ZeitenPicker
 */
export function ZeitenPicker({variant}: ZeitenPickerProps): React.ReactElement {
  return (<>ZeitenPicker - {variant} variante</>)
}
