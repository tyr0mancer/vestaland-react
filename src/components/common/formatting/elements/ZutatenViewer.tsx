import React from "react";
import {Zutat} from "../../../../shared-types/models/Zutat";
import {Box, Grid} from "@mui/material";
import {EinheitProperties} from "../../../../util/format/enum-properties/EinheitProperties";
import {Einheit} from "../../../../shared-types/enum";

type ZutatenViewerProps = {
  zutaten: Zutat[],
  variant?: 'mobile' | 'desktop'

}

/**
 * Formatiert 'Zutat[]' zur Darstellung
 *
 * @see Zutat
 */
export function ZutatenViewer({zutaten, variant = 'desktop'}: ZutatenViewerProps): React.ReactElement {

  return (<Box mt={2}>


    {(zutaten ?? []).map((z, i) => <ZutatViewer key={i} zutat={z} variant={variant}/>)}

  </Box>)


}


type ZutatViewerProps = {
  zutat: Zutat,
  variant?: 'mobile' | 'desktop'
}

/**
 * Formatiert 'Zutat' zur Darstellung
 */
export function ZutatViewer({
                              zutat: {lebensmittel, einheit, menge},
                              variant = 'desktop'
                            }: ZutatViewerProps): React.ReactElement {

  const lebensmittelName = (menge === 1 && einheit === Einheit.ST && lebensmittel?.nameSingular)
    ? lebensmittel.nameSingular
    : lebensmittel?.name || ''

  return (<Grid container spacing={1}>
    <Grid item xs={1} textAlign={'right'}>
      {menge}
    </Grid>
    <Grid item xs={2}>
      {(einheit !== Einheit.ST) && (variant === 'desktop') ? EinheitProperties[einheit].fullName : EinheitProperties[einheit].shortName}
    </Grid>
    <Grid item xs={9}>
      {lebensmittelName}
    </Grid>
  </Grid>)


}
