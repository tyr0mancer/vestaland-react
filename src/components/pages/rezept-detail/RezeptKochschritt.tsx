import React from "react";
import {Kochschritt} from "../../../shared-types/models/Kochschritt";
import {Grid, Typography} from "@mui/material";
import Card from "@mui/material/Card";
import {ShowKochschrittAktionen} from "../../common/formatting/ShowKochschrittAktionen";
import {ShowZutaten} from "../../common/formatting/ShowZutaten";
import {ShowUtensilien} from "../../common/formatting/ShowUtensilien";
import {ShowErforderlicheKochschritte} from "../../common/formatting/ShowErforderlicheKochschritte";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {BetriebsartenProperties} from "../../../util/rezept-helper/enum-properties/BetriebsartenProperties";
interface RezeptKochschrittProps {
  kochschritt: Kochschritt,
  portionsFaktor?: number,
}

/**
 * TS Doc Info
 * @component RezeptKochschritt
 */
export function RezeptKochschritt({kochschritt, portionsFaktor = 1}: RezeptKochschrittProps): React.ReactElement {
  return (<Card>
    <Grid container spacing={1} mb={4}>
      <Grid item xs={4} md={2}>
        <ShowKochschrittAktionen aktionen={kochschritt.aktionen}/>
      </Grid>
      <Grid item xs={8} md={4}>
        <ShowErforderlicheKochschritte erforderlicheKochschritte={kochschritt.erforderlicheKochschritte}/>

        <ShowZutaten zutaten={kochschritt.zutaten} portionsFaktor={portionsFaktor}/>
        <ShowUtensilien utensilien={kochschritt.utensilien}/>

        {kochschritt.resultatName &&
            <Typography variant="h6" mt={2} borderTop={1} textAlign={'right'}>
                <ArrowForwardIcon/> {kochschritt.resultatName}
            </Typography>
        }
      </Grid>

      <Grid item xs={8} md={4}>
        {kochschritt.gesamtdauer}
        {kochschritt.arbeitszeit}
        {kochschritt.wartezeit}
        {kochschritt.beschreibung}
      </Grid>
      <Grid item xs={4} md={2}>
        {kochschritt.videoUrl}
        {kochschritt.betriebsart && BetriebsartenProperties[kochschritt.betriebsart].fullName}
        {kochschritt.temperatur && <div>{kochschritt.temperatur} °C</div>}
      </Grid>
    </Grid>

  </Card>)
}
