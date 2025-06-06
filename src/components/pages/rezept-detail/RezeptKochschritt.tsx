import React from "react";
import {Kochschritt} from "../../../shared-types/models/Kochschritt";
import {Box, Grid, IconButton, Typography} from "@mui/material";
import {ShowKochschrittAktionen} from "../../common/viewer/ShowKochschrittAktionen";
import {ShowZutaten} from "../../common/viewer/ShowZutaten";
import {ShowUtensilien} from "../../common/viewer/ShowUtensilien";
import {ShowErforderlicheKochschritte} from "../../common/viewer/ShowErforderlicheKochschritte";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {BetriebsartenProperties} from "../../../shared-types/enum/BetriebsartenProperties";
import {ShowTimes} from "../../common/viewer/ShowTimes";
import SmartDisplayIcon from '@mui/icons-material/SmartDisplay';


interface RezeptKochschrittProps {
  kochschritt: Kochschritt,
  portionsFaktor?: number,
}

/**
 * TS Doc Info
 * @component RezeptKochschritt
 */
export function RezeptKochschritt({kochschritt, portionsFaktor = 1}: RezeptKochschrittProps): React.ReactElement {
  return (<Box mt={2} borderBottom={'dotted 1px'}>
    <Grid container spacing={1}>

      <Grid item xs={4} md={2}>
        {kochschritt.ergebnisName && <span id={`rezept-${kochschritt.ergebnisName.toLowerCase().trim()}`}/>}
        <ShowKochschrittAktionen aktionen={kochschritt.aktionen}/>
        {kochschritt.ergebnisName &&
            <Typography className={'align-vertically'}
                        variant="body2" mt={2} borderTop={1} textAlign={'right'}>
                <ArrowForwardIcon fontSize={'small'}/>
              {kochschritt.ergebnisName}
            </Typography>
        }
      </Grid>

      <Grid item xs={8} md={4}>
        <ShowErforderlicheKochschritte erforderlicheKochschritte={kochschritt.erforderlicheErgebnisse}/>
        <ShowZutaten zutaten={kochschritt.zutaten} portionsFaktor={portionsFaktor}/>
      </Grid>


      <Grid item xs={4} md={2}>
        <Box textAlign={'center'}>
          <ShowTimes kochschritt={kochschritt} showWartezeit/>
        </Box>

        {kochschritt.quelleUrl && <Box mt={2} textAlign={'center'}>
            <a href={kochschritt.quelleUrl} target="_blank"
               rel="noreferrer"><IconButton><SmartDisplayIcon/></IconButton></a></Box>}
      </Grid>

      {/* Beschreibung */}
      <Grid item xs={8} md={4}>
        {kochschritt.beschreibung &&
            <Typography variant="body2" border={'1px dotted'} color={'primary'} padding={2}>
              {kochschritt.beschreibung}
            </Typography>
        }

        <Box mt={2}>
          <ShowUtensilien utensilien={kochschritt.utensilien}/>
        </Box>

        <Typography variant="body2" mt={2}>
          {kochschritt.betriebsart && BetriebsartenProperties[kochschritt.betriebsart].fullName}
          {kochschritt.temperatur && <div>{kochschritt.temperatur} °C</div>}
        </Typography>

      </Grid>

    </Grid>

  </Box>)
}
