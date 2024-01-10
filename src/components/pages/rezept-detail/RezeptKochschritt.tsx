import React from "react";
import {Kochschritt} from "../../../shared-types/models/Kochschritt";
import {Box, Button, Grid, Typography} from "@mui/material";
import {ShowKochschrittAktionen} from "../../common/formatting/ShowKochschrittAktionen";
import {ShowZutaten} from "../../common/formatting/ShowZutaten";
import {ShowUtensilien} from "../../common/formatting/ShowUtensilien";
import {ShowErforderlicheKochschritte} from "../../common/formatting/ShowErforderlicheKochschritte";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {BetriebsartenProperties} from "../../../util/rezept-helper/enum-properties/BetriebsartenProperties";
import {ShowTimes} from "../../common/formatting/ShowTimes";

interface RezeptKochschrittProps {
  kochschritt: Kochschritt,
  portionsFaktor?: number,
}

/**
 * TS Doc Info
 * @component RezeptKochschritt
 */
export function RezeptKochschritt({kochschritt, portionsFaktor = 1}: RezeptKochschrittProps): React.ReactElement {
  return (<Box mt={5} borderBottom={'dotted 1px'}>
    <Grid container spacing={1} mb={4}>

      <Grid item xs={4} md={2}>
        <ShowKochschrittAktionen aktionen={kochschritt.aktionen}/>
        {kochschritt.resultatName &&
            <Typography variant="h6" mt={2} borderTop={1} textAlign={'right'}>
                <ArrowForwardIcon/> {kochschritt.resultatName}
            </Typography>
        }
      </Grid>

      <Grid item xs={8} md={4}>
        <ShowErforderlicheKochschritte erforderlicheKochschritte={kochschritt.erforderlicheKochschritte}/>
        <ShowZutaten zutaten={kochschritt.zutaten} portionsFaktor={portionsFaktor}/>
      </Grid>


      <Grid item xs={8} md={4}>
        <ShowUtensilien utensilien={kochschritt.utensilien}/>
        {kochschritt.betriebsart && BetriebsartenProperties[kochschritt.betriebsart].fullName}
        {kochschritt.temperatur && <div>{kochschritt.temperatur} °C</div>}

        <Typography variant="body2" mt={2}>
          {kochschritt.beschreibung}
        </Typography>

        {!!kochschritt.wartezeit &&
            <Button variant={'contained'} color={'secondary'} disabled>{kochschritt.wartezeit} Min</Button>}
      </Grid>

      <Grid item xs={2} md={1}>
        <ShowTimes kochschritt={kochschritt} />
      </Grid>

      <Grid item xs={2} md={1} textAlign={'center'}>
        {kochschritt.videoUrl && <a href={kochschritt.videoUrl} target="_blank" rel="noreferrer">Video</a>}
      </Grid>
    </Grid>

  </Box>)
}
