import {Box, Grid, Paper} from "@mui/material";
import React from "react";
import {Kochschritt} from "../../../../shared-types/models/Kochschritt";

import {AktionenViewer} from "../../../common/viewer/AktionenViewer";
import {UtensilienViewer} from "../../../common/viewer";
import {BetriebsartViewer} from "../../../common/viewer/BetriebsartViewer";
import {ZutatenViewer} from "../../../common/viewer/ZutatenViewer";
import {ZeitenViewer} from "../../../common/viewer/ZeitenViewer";
import {FreitextViewer} from "../../../common/viewer/FreitextViewer";
import {UrlViewer} from "../../../common/viewer/UrlViewer";

type KochschrittViewProps = {
  kochschritt: Kochschritt,
  index: number
}

/**
 * TS Doc Info
 * @component KochschrittView
 */
export function KochschrittView({kochschritt}: KochschrittViewProps): React.ReactElement {

  return (<Grid container spacing={1}>
    <Grid item xs={6} md={3}>
      <Paper elevation={5}>
        <Box mt={1}>
          <AktionenViewer aktionen={kochschritt.aktionen}/>
          <UtensilienViewer utensilien={kochschritt.utensilien}/>
          <BetriebsartViewer betriebsart={kochschritt.betriebsart} temperatur={kochschritt.temperatur}/>
        </Box>
      </Paper>
    </Grid>

    <Grid item xs={12} md={6} display={{xs: 'none', md: 'block'}}>
      <Paper elevation={5}>
        <Box mt={1}>
          <ZutatenViewer zutaten={kochschritt.zutaten}/>
        </Box>
      </Paper>
    </Grid>

    <Grid item xs={6} md={3}>
      <Paper elevation={5}>
        <ZeitenViewer
          arbeitszeit={kochschritt.arbeitszeit}
          wartezeit={kochschritt.wartezeit}
          gesamtdauer={kochschritt.gesamtdauer}
        />
        <Box mt={1}>
          <FreitextViewer freitext={kochschritt.beschreibung}/>
        </Box>
        <Box mt={1}>
          <UrlViewer url={kochschritt.quelleUrl}/>
        </Box>
      </Paper>
    </Grid>

    <Grid item xs={12} md={6} display={{xs: 'block', md: 'none'}}>
      <Paper elevation={5}>
        <ZutatenViewer zutaten={kochschritt.zutaten} variant={'mobile'}/>
      </Paper>
    </Grid>

  </Grid>)

}
