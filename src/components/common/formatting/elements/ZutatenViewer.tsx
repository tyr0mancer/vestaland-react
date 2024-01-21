import React from "react";
import {Zutat} from "../../../../shared-types/models/Zutat";
import {Box} from "@mui/material";

type ZutatenViewerProps = {
  zutaten: Zutat[]
}

/**
 * Formatiert 'Zutat[]' zur Darstellung
 *
 * @see Zutat
 */
export function ZutatenViewer({zutaten}: ZutatenViewerProps): React.ReactElement {
  return <>{(zutaten ?? []).map((z, i) => <ZutatViewer key={i} zutat={z}/>)}</>
}


type ZutatViewerProps = {
  zutat: Zutat
}

/**
 * Formatiert 'Zutat' zur Darstellung
 */
export function ZutatViewer({zutat: {lebensmittel, einheit, menge}}: ZutatViewerProps): React.ReactElement {
  //return (<pre>{JSON.stringify(zutat, null, 1)}</pre>)
  return (<Box mt={2}><b>{lebensmittel?.name}</b> {menge} {einheit}</Box>)
}
