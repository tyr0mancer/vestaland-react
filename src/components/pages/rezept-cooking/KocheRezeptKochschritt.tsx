import React, {useContext} from "react";
import {StateContext} from "../../../util/state/StateProvider";
import {StateContextType} from "../../../util/state/types";
import {ActionTypes} from "../../../util/state/reducers";

import {Accordion, AccordionDetails, AccordionSummary, Box, Grid, IconButton, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import {ShowKochschrittAktion} from "../../common/formatting/ShowKochschrittAktionen";
import {ShowZutaten} from "../../common/formatting/ShowZutaten";
import {getDateInFuture} from "./Kochschritte";
import {ShowUtensilien} from "../../common/formatting/ShowUtensilien";
import {ShowErforderlicheKochschritte} from "../../common/formatting/ShowErforderlicheKochschritte";
import SmartDisplayIcon from "@mui/icons-material/SmartDisplay";
import {BetriebsartenProperties} from "../../../util/format/enum-properties/BetriebsartenProperties";
import {colors} from "../../../assets/style/themeMUI";

interface KocheRezeptKochschrittProps {
  index: number
}

/**
 * TS Doc Info
 * @component KocheRezeptKochschritt
 */
export function KocheRezeptKochschritt({index}: KocheRezeptKochschrittProps): React.ReactElement {

  const {state: {rezeptCooking, kochstatus}, dispatch} = useContext(StateContext) as StateContextType
  if (!rezeptCooking) return <></>
  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      dispatch({
        type: ActionTypes.SET_KOCHSTATUS,
        payload: {...kochstatus, kochschrittFokusIndex: isExpanded ? panel : false}
      })
    };

  const kochschritt = rezeptCooking?.kochschritte[index]

  const setIndex = (neuerKochschrittIndex: number) => {
    if (!rezeptCooking) return
    const restZeit = kochstatus.meta.filter((k, index) => (index >= neuerKochschrittIndex)).reduce((a, c) => {
      return a + (c.length || 0)
    }, 0)
    const etd = getDateInFuture(restZeit)

    dispatch({
      type: ActionTypes.SET_KOCHSTATUS, payload: {
        ...kochstatus,
        etd,
        kochschrittFokusIndex: 'panel' + neuerKochschrittIndex,
        aktuellerKochschrittIndex: neuerKochschrittIndex
      }
    })
  }

  const style = (kochstatus.aktuellerKochschrittIndex === index)
    ? {backgroundColor: colors.primary, color: 'white'}
    : {backgroundColor: colors.secondary}


  return (<div>
    <Accordion
      expanded={kochstatus.kochschrittFokusIndex === 'panel' + index}
      onChange={handleChange('panel' + index)}
    >
      <AccordionSummary
        sx={style}
        expandIcon={<ArrowDownwardIcon/>}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        {kochschritt?.aktionen.map((aktion, index) => <ShowKochschrittAktion aktion={aktion} key={index}/>)}
        {kochschritt?.ergebnisName && <span id={`rezept-${kochschritt.ergebnisName.toLowerCase().trim()}`}/>}
      </AccordionSummary>
      <AccordionDetails>


        <Grid container spacing={1}>
          <Grid item xs={12} md={6}>
            <ShowErforderlicheKochschritte erforderlicheKochschritte={kochschritt?.erforderlicheErgebnisse}/>
            <ShowZutaten zutaten={kochschritt.zutaten}/>
          </Grid>
          <Grid item xs={12} md={6}>

            <Typography variant="body2" border={'1px dotted'} mt={2} padding={1}>
              <ShowUtensilien utensilien={kochschritt.utensilien}/>

              {(kochschritt.betriebsart || kochschritt.temperatur) &&
                  <Box mt={1} borderTop={1}>
                    {kochschritt.betriebsart && BetriebsartenProperties[kochschritt.betriebsart].fullName}
                    {kochschritt.temperatur && <div>{kochschritt.temperatur} °C</div>}
                  </Box>
              }

            </Typography>

            {kochschritt.beschreibung &&
                <Typography variant="body2" border={'1px dotted'} color={'primary'} padding={2} mt={2}>
                  {kochschritt?.quelleUrl && <a href={kochschritt?.quelleUrl} target="_blank"
                                                rel="noreferrer"><IconButton><SmartDisplayIcon/></IconButton></a>}

                  {kochschritt.beschreibung}
                </Typography>
            }

            {kochschritt.wartezeit &&
                <Box textAlign={'center'} mt={1}>
                    <Button
                        variant={'contained'}
                    >{kochschritt.wartezeit} Min</Button>
                </Box>
            }


          </Grid>
        </Grid>


        {index === (kochstatus.aktuellerKochschrittIndex - 1) &&
            <Button onClick={() => setIndex(index)}>Reopen</Button>
        }
      </AccordionDetails>
    </Accordion>
    {
      index === kochstatus.aktuellerKochschrittIndex && <Box textAlign={'right'}>
            <Button onClick={() => setIndex(index + 1)}>Abschließen</Button>
            <hr/>
        </Box>
    }

  </div>)
}

