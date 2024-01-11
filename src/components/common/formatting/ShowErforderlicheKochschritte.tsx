import React from "react";
import {Grid, Typography} from "@mui/material";
import {HashLink} from "react-router-hash-link";
import LinkIcon from '@mui/icons-material/Link';

interface ShowErforderlicheKochschritteProps {
  erforderlicheKochschritte?: string[]
}

/**
 * TS Doc Info
 * @component ShowErforderlicheKochschritte
 */
export function ShowErforderlicheKochschritte({erforderlicheKochschritte = []}: ShowErforderlicheKochschritteProps): React.ReactElement {
  const scrollWithOffset = (el: any) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = -100;
    window.scrollTo({top: yCoordinate + yOffset, behavior: 'smooth'});
  }

  return (<Grid container spacing={1} mb={1}>
    {erforderlicheKochschritte.map((e, i) => (<div key={i}>
      <Grid item xs={4}/>
      <Grid item xs={8}>
        <HashLink
          scroll={el => scrollWithOffset(el)}
          smooth
          to={`#rezept-${e.toLowerCase().trim()}`}>
          <Typography variant={"body2"} color={'primary'} className={'align-vertically'}>
            <LinkIcon fontSize={'small'} /> <i><strong>{e}</strong></i>
          </Typography>
        </HashLink>
      </Grid>
    </div>))}
  </Grid>)
}
