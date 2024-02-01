import {Box} from "@mui/material";
import React from "react";
import {Betriebsart} from "../../../shared-types/enum";
import {BetriebsartenProperties} from "../../../util/format/enum-properties/BetriebsartenProperties";

type BetriebsartViewerProps = {
  betriebsart?: Betriebsart,
  temperatur?: number
}

/**
 * Formatiert 'Betriebsart' zur Darstellung
 *
 * @see Betriebsart
 */
export function BetriebsartViewer({betriebsart, temperatur}: BetriebsartViewerProps): React.ReactElement {
  return <Box mt={2}>
    {temperatur &&
        <div><b>{temperatur} °C</b></div>
    }
    {betriebsart &&
        <div><i>{BetriebsartenProperties[betriebsart].fullName}</i></div>
    }
  </Box>
}
