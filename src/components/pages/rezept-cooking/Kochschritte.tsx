import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import useLocalStorage from "use-local-storage";
import {Kochstatus} from "../../../services/contexts/types";
import {Kochschritt} from "../../../models/rezept.model";
import {Zutat} from "../../../models/zutat.model";
import {Hilfsmittel} from "../../../models/hilfsmittel.model";

interface KochschritteProps {
  kochschritte: Kochschritt[]
}


export function Kochschritte({kochschritte}: KochschritteProps) {
  const [kochstatus, setKochstatus] = useLocalStorage<Kochstatus>('kochstatus', {
    kochschrittIndex: 0,
    kochschrittFokus: false
  })

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setKochstatus({...kochstatus, kochschrittFokus: isExpanded ? panel : false})
    };

  const kochschrittLebensmittelReducer = (s: string, z: Zutat) => {
    return s + z.lebensmittel?.name + ','
  }
  const kochschrittHilfsmittelReducer = (s: string, h: Hilfsmittel) => {
    return s + h.name + ','
  }


  if (!kochschritte?.length)
    return (<div>Der Rest ist trivial.</div>)

  return (
    <div>
      {kochschritte.map((kochschritt, index) =>
        <Accordion key={index} expanded={kochstatus.kochschrittFokus === 'panel' + index}
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
              {kochschritt.dauer && <i>{kochschritt.dauer} Minuten</i>}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <p>{kochschritt.beschreibung}</p>
              <ul>
                {kochschritt.zutaten.map((zutat, index) => <li key={index}>{zutat.menge} {zutat.einheit} {zutat.lebensmittel?.name}</li>)}
              </ul>
            </Typography>
          </AccordionDetails>
        </Accordion>
      )}
    </div>
  );
}
