import * as React from 'react';
import {useContext} from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {ActionTypes, StateContextType} from "../../../services/contexts/types";
import {Kochschritt} from "../../../models/rezept.model";
import {Zutat} from "../../../models/zutat.model";
import {Hilfsmittel} from "../../../models/hilfsmittel.model";
import {StateContext} from "../../../services/contexts/StateProvider";
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
        payload: {...kochstatus, kochschrittFokus: isExpanded ? panel : false}
      })
    };

  const kochschrittLebensmittelReducer = (s: string, z: Zutat) => {
    return s + z.lebensmittel?.name + ','
  }
  const kochschrittHilfsmittelReducer = (s: string, h: Hilfsmittel) => {
    return s + h.name + ','
  }

  const setIndex = (neuerKochschrittIndex: number) => {
    console.log('index', neuerKochschrittIndex)
    const restZeit = kochschritte.filter((k, index) => (index >= neuerKochschrittIndex)).reduce((a, c) => {
      return a + (c.gesamtdauer || 0)
    }, 0)

    const etd = getDateInFuture(restZeit)

    // calculate time left

    dispatch({
      type: ActionTypes.SET_KOCHSTATUS, payload: {
        ...kochstatus,
        etd,
        kochschrittFokus: 'panel' + neuerKochschrittIndex,
        kochschrittIndex: neuerKochschrittIndex
      }
    })
  }


  if (!kochschritte?.length)
    return (<div>Der Rest ist trivial.</div>)

  return (
    <div>
      {kochstatus.kochschrittIndex === -1 &&
          <Button onClick={() => setIndex(0)}>Starten</Button>
      }

      {kochschritte.map((kochschritt, index) =>
        <Accordion key={index} expanded={kochstatus.kochschrittFokus === 'panel' + index}
                   className={(index !== kochstatus.kochschrittIndex) ? '' : 'aktueller-kochschritt'}
                   onChange={handleChange('panel' + index)}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon/>}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography sx={{width: '33%', flexShrink: 0}}>
              {kochschritt.name}
            </Typography>
            <Typography
              sx={{color: 'text.secondary'}}>
              {kochschritt.zutaten.reduce(kochschrittLebensmittelReducer, '')}
              {kochschritt.hilfsmittel.reduce(kochschrittHilfsmittelReducer, '')}
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
              {index === kochstatus.kochschrittIndex &&
                  <Button onClick={() => setIndex(index + 1)}>Abschließen</Button>
              }
              {index === (kochstatus.kochschrittIndex - 1) &&
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
