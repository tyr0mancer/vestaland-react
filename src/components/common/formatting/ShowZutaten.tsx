import React from "react";
import {Grid} from "@mui/material";
import {Zutat} from "../../../shared-types/models/Zutat";
import {EinheitProperties} from "../../../util/format/enum-properties/EinheitProperties";
import {Einheit} from "../../../shared-types/enum";

interface ShowZutatenProps {
  zutaten: Zutat[]
  portionsFaktor?: number
}

/**
 * TS Doc Info
 * @component ShowZutaten
 */
export function ShowZutaten({zutaten, portionsFaktor = 1}: ShowZutatenProps): React.ReactElement {

  return (<Grid container spacing={1}>
    {zutaten.map((zutat, index) => (
      <React.Fragment key={index}>
        <Grid item xs={2} textAlign={'right'}>{getMengeString(zutat.menge * portionsFaktor)}</Grid>
        <Grid item xs={2}>{EinheitProperties[zutat.einheit].shortName}</Grid>
        <Grid item xs={8}>{getLebensmittelName(zutat, portionsFaktor)}</Grid>
      </React.Fragment>
    ))}
  </Grid>)
}

function getLebensmittelName(zutat: Zutat, portionsFaktor: number) {
  if (!zutat.lebensmittel?.nameSingular) return zutat.lebensmittel?.name || 'Eintrag fehlt'
  if ((zutat.menge * portionsFaktor) === 1 && zutat.einheit === Einheit.ST) return zutat.lebensmittel.nameSingular
  return zutat.lebensmittel?.name || 'Eintrag fehlt'
}

function getMengeString(menge: number) {

  let result = ''

  const integer = Math.floor(menge)
  const komma = menge - integer

  if (integer) result += integer
  if (komma === 0.5) result += '½'
  else if (komma === 0.25) result += '¼'
  else if (komma === 0.75) result += '¾'
  else if (!!komma)
    result += '.' + komma

  return result
}
