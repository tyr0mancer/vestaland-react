import React from "react";
import {Kochschritt} from "../../../shared-types/model/Kochschritt";
import {Box, Grid, IconButton, Typography} from "@mui/material";
import {ShowKochschrittAktionen} from "../../common/formatting/ShowKochschrittAktionen";
import {ShowZutaten} from "../../common/formatting/ShowZutaten";
import {ShowUtensilien} from "../../common/formatting/ShowUtensilien";
import {ShowErforderlicheKochschritte} from "../../common/formatting/ShowErforderlicheKochschritte";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {BetriebsartenProperties} from "../../../util/rezept-helper/enum-properties/BetriebsartenProperties";
import {ShowTimes} from "../../common/formatting/ShowTimes";
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
        {kochschritt.resultatName && <span id={`rezept-${kochschritt.resultatName.toLowerCase().trim()}`}/>}
        <ShowKochschrittAktionen aktionen={kochschritt.aktionen}/>
        {kochschritt.resultatName &&
            <Typography className={'align-vertically'}
                        variant="body2" mt={2} borderTop={1} textAlign={'right'}>
                <ArrowForwardIcon fontSize={'small'}/>
              {kochschritt.resultatName}
            </Typography>
        }
      </Grid>

      <Grid item xs={8} md={4}>
        <ShowErforderlicheKochschritte erforderlicheKochschritte={kochschritt.erforderlicheKochschritte}/>
        <ShowZutaten zutaten={kochschritt.zutaten} portionsFaktor={portionsFaktor}/>
      </Grid>


      <Grid item xs={4} md={2}>
        <Box textAlign={'center'}>
          <ShowTimes kochschritt={kochschritt} showWartezeit/>
        </Box>

        {kochschritt.videoUrl && <Box mt={2} textAlign={'center'}>
            <a href={kochschritt.videoUrl} target="_blank"
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
