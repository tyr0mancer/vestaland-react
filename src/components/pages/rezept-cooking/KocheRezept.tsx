import React, {useContext, useEffect, useState} from "react";
import {StateContext} from "../../../util/state/StateProvider";
import {KochschrittMeta, StateContextType} from "../../../util/state/types";
import {ActionTypes} from "../../../util/state/reducers";

import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import {Accordion, AccordionDetails, AccordionSummary, Box, Grid, LinearProgress, Typography} from "@mui/material";
import {ShowZutaten} from "../../common/viewer/ShowZutaten";
import {ShowUtensilien} from "../../common/viewer/ShowUtensilien";
import {KocheRezeptKochschritt} from "./KocheRezeptKochschritt";
import {customConfirm} from "../../common/ui/ConfirmDialog";
import {getDateInFuture} from "./Kochschritte";
import {getEtdString} from "../../../util/helper/date-format";


/**
 * Darstellung des aktuellen Kochstatus
 */
export function KocheRezept() {
  const {state: {rezeptCooking, kochstatus}, dispatch} = useContext(StateContext) as StateContextType
  const [progress, setProgress] = useState(0)
  const navigate = useNavigate();

  useEffect(() => {
    if (rezeptCooking)
      localStorage.setItem('rezept_cooking', JSON.stringify(rezeptCooking));
  }, [rezeptCooking])

  const handleStop = async () => {
    const result = await customConfirm({label: "Kochen beenden?"})
    if (!result) return

    localStorage.setItem('rezept_cooking', '');
    dispatch({type: ActionTypes.SET_REZEPT_COOK, payload: undefined})
    navigate('/rezepte')
  }

  const handleStart = () => {
    const restZeit = kochstatus.meta.reduce((a: number, c: KochschrittMeta) => {
      return a + (c.length || 0)
    }, 0)
    const etd = restZeit ? getDateInFuture(restZeit) : undefined

    dispatch({
      type: ActionTypes.SET_KOCHSTATUS, payload: {
        ...kochstatus,
        kochschrittFokusIndex: 'panel0',
        aktuellerKochschrittIndex: 0,
        etd: etd
      }
    })
  }

  const handleReset = () => {
    dispatch({
      type: ActionTypes.SET_KOCHSTATUS, payload: {
        ...kochstatus,
        kochschrittFokusIndex: false,
        aktuellerKochschrittIndex: -1,
        etd: undefined
      }
    })
  }


  useEffect(() => {
    if (kochstatus.aktuellerKochschrittIndex === -1)
      return setProgress(0)
    if (!rezeptCooking?.kochschritte.length)
      return setProgress(100)

    const lengthDone = kochstatus.meta?.slice(0, kochstatus.aktuellerKochschrittIndex).reduce((total, item) => total + item.length, 0) || 0
    const lengthTotal = kochstatus.meta?.reduce((total, item) => total + item.length, 0) || 0
    const result = Math.round(lengthDone / lengthTotal * 100)
    setProgress(result)
    //@todo kochschritteSummary

  }, [kochstatus, rezeptCooking, setProgress])


  if (rezeptCooking)
    return (<>
      <Typography variant="h2" display="flex" justifyContent="space-between">
        {rezeptCooking.name}


        <Box>
          <Button onClick={handleStart} disabled={kochstatus.aktuellerKochschrittIndex !== -1}>Start</Button>
          <Button onClick={handleReset} disabled={kochstatus.aktuellerKochschrittIndex < 0}>Reset</Button>
          <Button onClick={handleStop}>Beenden</Button>
        </Box>
      </Typography>

      <Typography variant="body2">
        {kochstatus.etd && <>(ETD: {getEtdString(kochstatus.etd)})</>}
        {!kochstatus.etd && <>({rezeptCooking.berechneteGesamtdauer} Minuten)</>}
      </Typography>

      <LinearProgress
        sx={{height: 20}}
        value={progress}
        variant="determinate"
        color={'primary'}
      />

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon/>}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          Zutaten
        </AccordionSummary>
        <AccordionDetails>
          <Grid container>
            <Grid item xs={12} md={6}>
              <ShowZutaten zutaten={rezeptCooking?.zutaten || []}/>
            </Grid>
            <Grid item xs={0} md={6}>
              <ShowUtensilien utensilien={rezeptCooking?.utensilien || []}/>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      <Box mt={2}>
        {rezeptCooking.kochschritte.map((ks, index) => (<KocheRezeptKochschritt index={index} key={index}/>))}
      </Box>

    </>)

  return (<>Fehler</>)

}
