import React from "react";
import {KochschrittAktion} from "../../../../shared-types/models/KochschrittAktion";
import {Box} from "@mui/material";

type AktionenViewerProps = {
  aktionen: KochschrittAktion[]
}

/**
 * Formatiert 'Aktionen' zur Darstellung
 *
 * @see Aktionen
 */
export function AktionenViewer({aktionen}: AktionenViewerProps): React.ReactElement {
  return (<Box>
    {aktionen.map((aktion, index) => {
      return <AktionViewer key={index} aktion={aktion}/>
    })}
  </Box>)
}


  export function AktionViewer({aktion}: { aktion: KochschrittAktion }): React.ReactElement {
    return <div>{aktion.aktionName}</div>
  }
