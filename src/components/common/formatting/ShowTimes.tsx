import React from "react";
import {Rezept} from "../../../shared-types/models/rezept.model";
import {Kochschritt} from "../../../shared-types/models/Kochschritt";
import HistoryToggleOffIcon from '@mui/icons-material/HistoryToggleOff';
import EngineeringIcon from '@mui/icons-material/Engineering';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import {Grid} from "@mui/material";

interface ShowTimesProps {
  rezept?: Rezept,
  kochschritt?: Kochschritt,
  portionen?: number,
  showWartezeit?: boolean
}

/**
 * TS Doc Info
 * @component ShowTimes
 */
export function ShowTimes({rezept, kochschritt, portionen = 0, showWartezeit}: ShowTimesProps): React.ReactElement {
  if (rezept)
    return (<ShowTimesRezept rezept={rezept} portionen={portionen}/>)

  if (kochschritt)
    return (<ShowTimesKochschritt kochschritt={kochschritt} showWartezeit={showWartezeit}/>)

  return <></>
}


interface ShowTimesRezeptProps {
  rezept: Rezept,
  portionen: number,
}

export function ShowTimesRezept({rezept, portionen}: ShowTimesRezeptProps): React.ReactElement {
  const extraPortion = portionen - rezept.portionen
  let gesamtdauer = rezept?.realeGesamtdauer || rezept?.berechneteGesamtdauer || 0
  let arbeitszeit = rezept?.realeArbeitszeit || rezept?.berechneteArbeitszeit || 0

  if (extraPortion > 0) {
    if (rezept.extraPortionGesamtdauer)
      gesamtdauer += rezept.extraPortionGesamtdauer * extraPortion
    if (rezept.extraPortionArbeitszeit)
      arbeitszeit += rezept.extraPortionArbeitszeit * extraPortion
  }

  return (<>
    <ShowZeit zeit={gesamtdauer} label={'Gesamtdauer'} Icon={HistoryToggleOffIcon}/>
    <ShowZeit zeit={arbeitszeit} label={'Arbeitszeit'} Icon={EngineeringIcon}/>
  </>)
}

interface ShowTimesKochschrittProps {
  kochschritt: Kochschritt,
  showWartezeit?: boolean,
}

export function ShowTimesKochschritt({
                                       kochschritt,
                                       showWartezeit = false
                                     }: ShowTimesKochschrittProps): React.ReactElement {

  const wartezeit = kochschritt.wartezeit || 0
  const arbeitszeit = kochschritt.arbeitszeit || 0
  const gesamtdauer = kochschritt.gesamtdauer || arbeitszeit + wartezeit

  return (<>
    <ShowZeit zeit={gesamtdauer} label={'Gesamtdauer'} Icon={HistoryToggleOffIcon}/>
    <ShowZeit zeit={arbeitszeit} label={'Arbeitszeit'} Icon={EngineeringIcon}/>
    {!!showWartezeit && <ShowZeit zeit={wartezeit} label={'Wartezeit'} Icon={HourglassBottomIcon}/>}
  </>)
}


interface ShowZeitProps {
  zeit: number
  label: string
  Icon: any
}

function ShowZeit({zeit, label, Icon = HourglassBottomIcon}: ShowZeitProps) {
  function minutesToString(minutes: number): string {
    const hours: number = Math.floor(minutes / 60);
    const remainingMinutes: number = minutes % 60;
    const hoursStr: string = hours < 10 ? "0" + hours : hours.toString();
    const minutesStr: string = remainingMinutes < 10 ? "0" + remainingMinutes : remainingMinutes.toString();
    return hours ? hoursStr + ":" + minutesStr : minutesStr + " Min";
  }

  if (!zeit) return <></>

  return <Grid container maxWidth={100}>
    <Grid item xs alignItems={'center'}>
      <Icon aria-label={label} color={'primary'}/>
    </Grid>
    <Grid item xs alignItems={'left'}>
      {minutesToString(zeit)}
    </Grid>
  </Grid>
  /*
    return <Box mt={1} width={100} textAlign={'right'}>
      <Typography color={'primary'} className={'align-vertically'}>
        <Icon aria-label={label} color={'primary'}/>
        {minutesToString(zeit)}
      </Typography>
    </Box>*/
}

