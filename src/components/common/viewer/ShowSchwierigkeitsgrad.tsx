import React from "react";
import {Slider} from "@mui/material";

interface ShowSchwierigkeitsgradProps {
  schwierigkeitsgrad?: number
}

/**
 * TS Doc Info
 * @component ShowSchwierigkeitsgrad
 */
export function ShowSchwierigkeitsgrad({schwierigkeitsgrad}: ShowSchwierigkeitsgradProps): React.ReactElement {
  if (!schwierigkeitsgrad) return <></>
  return (<Slider
    step={1} min={1} max={5}
    value={schwierigkeitsgrad}
    disabled
    marks={[
      {value: 2, label: "leicht"},
      {value: 3, label: "mittel"},
      {value: 4, label: "schwer"},
    ]}
    aria-label="Schwierigkeitsgrad"
  />)

}
