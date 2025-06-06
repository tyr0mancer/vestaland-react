import * as React from 'react';
import {useContext} from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {StateContextType} from "../../../util/state/types";
import {ActionTypes} from "../../../util/state/reducers";

import {Kochschritt} from "../../../shared-types/models/Kochschritt";
import {Zutat} from "../../../shared-types/models/Zutat";
import {Utensil} from "../../../shared-types/models/Utensil";
import {StateContext} from "../../../util/state/StateProvider";
import List from '@mui/material/List';
import {ListItem} from "@mui/material";
import Button from "@mui/material/Button";

interface KochschritteProps {
  kochschritte: Kochschritt[]
}


export function Kochschritte({kochschritte}: KochschritteProps) {
  const {state: {kochstatus}, dispatch} = useContext(StateContext) as StateContextType

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      dispatch({
        type: ActionTypes.SET_KOCHSTATUS,
        payload: {...kochstatus, kochschrittFokusIndex: isExpanded ? panel : false}
      })
    };

  const kochschrittLebensmittelReducer = (s: string, z: Zutat) => {
    return s + z.lebensmittel?.name + ','
  }
  const kochschrittUtensilReducer = (s: string, h: Utensil) => {
    return s + h.utensilName + ','
  }

  const setIndex = (neuerKochschrittIndex: number) => {
    const restZeit = kochschritte.filter((k, index) => (index >= neuerKochschrittIndex)).reduce((a, c) => {
      return a + (c.gesamtdauer || 0)
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


  if (!kochschritte?.length)
    return (<div>Schon fertig?</div>)

  return (
    <div>
      {kochstatus.aktuellerKochschrittIndex === -1 &&
          <Button onClick={() => setIndex(0)}>Starten</Button>
      }

      {kochschritte.map((kochschritt, index) =>
        <Accordion key={index} expanded={kochstatus.kochschrittFokusIndex === 'panel' + index}
                   className={(index !== kochstatus.aktuellerKochschrittIndex) ? '' : 'aktueller-kochschritt'}
                   onChange={handleChange('panel' + index)}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon/>}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography sx={{width: '33%', flexShrink: 0}}>
              {/* @todo aktionen */}
              {JSON.stringify(kochschritt.aktionen )}
            </Typography>
            <Typography
              sx={{color: 'text.secondary'}}>
              {kochschritt.zutaten.reduce(kochschrittLebensmittelReducer, '')}
              {kochschritt.utensilien.reduce(kochschrittUtensilReducer, '')}
              {kochschritt.gesamtdauer && <i>{kochschritt.gesamtdauer} Minuten</i>}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <div>{kochschritt.beschreibung}</div>
              <List>
                {kochschritt.zutaten.map((zutat, index) => <ListItem disablePadding
                                                                     key={index}>{zutat.menge} {zutat.einheit} {zutat.lebensmittel?.name}</ListItem>)}
              </List>
              {index === kochstatus.aktuellerKochschrittIndex &&
                  <Button onClick={() => setIndex(index + 1)}>Abschließen</Button>
              }
              {index === (kochstatus.aktuellerKochschrittIndex - 1) &&
                  <Button onClick={() => setIndex(index)}>Reopen</Button>
              }
            </Typography>
          </AccordionDetails>
        </Accordion>
      )}
    </div>
  );
}


export function getDateInFuture(minutes: number) {
  const now = new Date();
  const millisecondsToAdd = minutes * 60 * 1000;
  return new Date(now.getTime() + millisecondsToAdd);
}
