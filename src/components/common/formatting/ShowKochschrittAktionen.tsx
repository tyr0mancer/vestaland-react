import React from "react";
import {KochschrittAktion} from "../../../shared-types/models/KochschrittAktion";
import {AktionIconImage} from "./AktionIconImage";
import {Typography} from "@mui/material";

interface ShowKochschrittAktionenProps {
  aktionen: KochschrittAktion[]
}

/**
 * TS Doc Info
 * @component ShowKochschrittAktionen
 */
export function ShowKochschrittAktionen({aktionen}: ShowKochschrittAktionenProps): React.ReactElement {
  return (<>{aktionen.map((aktion, index) =>
    <Typography variant="body1" key={index} color={'primary'}>
      <AktionIconImage size={16} aktionIcon={aktion.aktionIcon}/> {aktion.aktionName}
    </Typography>
  )}</>)
}


/**
 * TS Doc Info
 * @component ShowKochschrittAktionen
 */
export function ShowKochschrittAktion({aktion}: { aktion: KochschrittAktion }): React.ReactElement {
  return (<Typography mr={2}><AktionIconImage aktionIcon={aktion.aktionIcon}/> {aktion.aktionName} </Typography>)
}
