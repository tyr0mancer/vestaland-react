import React from "react";
import {KochschrittAktion} from "../../../shared-types/models/KochschrittAktion";
import {AktionIconImage} from "./AktionIconImage";

interface ShowKochschrittAktionenProps {
  aktionen: KochschrittAktion[]
}

/**
 * TS Doc Info
 * @component ShowKochschrittAktionen
 */
export function ShowKochschrittAktionen({aktionen}: ShowKochschrittAktionenProps): React.ReactElement {
  return (<>{aktionen.map((aktion, index) =>
    <div key={index}><b><AktionIconImage aktionIcon={aktion.aktionIcon}/> {aktion.aktionName}</b></div>
  )}</>)



}
