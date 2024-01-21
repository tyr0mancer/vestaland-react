import React from "react";
import {Kochschritt} from "../../../../shared-types/models/Kochschritt";
import {Card, Grid} from "@mui/material";
import {AktionIconImage} from "../../../common/formatting/AktionIconImage";
import Box from "@mui/material/Box";

interface KochschrittLayoutViewProps {
  kochschritt: Kochschritt
}

/**
 * Leseansicht eines Kochschrittes
 * @component KochschrittLayoutView
 */

export function KochschrittLayoutView({kochschritt}: KochschrittLayoutViewProps) {

  return (<Grid container spacing={2}>

    {/* Zutaten und Utensilien */}
    <Grid item xs={12} md={8}>
      {kochschritt.zutaten.filter(z => !!z.lebensmittel).map(({menge, lebensmittel, einheit}, index) =>
        <Card key={index}>
          {menge} {einheit} {lebensmittel?.name}
        </Card>
      )}
      <hr/>
      {kochschritt.utensilien.map(({utensilName, volumen}, index) => <Card key={index}>
        {utensilName} ({volumen} ml)
      </Card>)}
    </Grid>

    {/* Weitere Angaben zum Kochschritt */}
    <Grid item xs={12} md={4}>
      {kochschritt.aktionen.map((aktion, index: number) =>
        <div key={index}><b><AktionIconImage aktionIcon={aktion.aktionIcon}/> {aktion.aktionName}</b></div>
      )}


      <pre>{JSON.stringify(kochschritt.beschreibung, null, 2)}</pre>
      <Box display="flex" justifyContent="space-between" mt={1}>
        <Box flexGrow={1} mr={1}>
          <pre>{kochschritt.temperatur && <>Temperatur: {kochschritt.temperatur} C</>} ({kochschritt.betriebsart})</pre>
        </Box>
      </Box>

      <Box flexGrow={1}>
        <pre>Gesamtdauer: {kochschritt.gesamtdauer}</pre>
        <pre>Arbeitszeit: {kochschritt.arbeitszeit}</pre>
        <pre>Wartezeit: {kochschritt.wartezeit}</pre>
      </Box>

      <Box mt={1}>
        <pre>{JSON.stringify(kochschritt.quelleUrl)}</pre>
      </Box>

    </Grid>
  </Grid>)
}
