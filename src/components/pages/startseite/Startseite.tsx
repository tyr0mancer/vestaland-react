import React from "react";

import {Box, Typography} from "@mui/material";

import startseiteBild1 from "../../../assets/images/startseite.png";
import startseiteBild2 from "../../../assets/images/startseite2.png";

export function Startseite() {
  return (<>

    <Typography variant="h6" gutterBottom>
      Willkommen bei <strong>"Vestaland"</strong> – Ihrer persönlichen Kochassistenz-App! Diese App ist im Rahmen eines
      Studienprojekts entstanden und steht Ihnen vollkommen kostenfrei zur Verfügung.
    </Typography>

    <img
      src={startseiteBild1}
      alt={'Eine Kochapp hilft in der Küche'}
      loading="lazy"
      className={'startseite left'}
    />


    <Typography variant="h6" gutterBottom>
      Mit "Vestaland" können Sie nicht nur eine Vielzahl an köstlichen Rezepten finden und erstellen, sondern auch Ihren
      Kochprozess durch eine strukturierte Darstellung vereinfachen. Zusätzlich bietet unsere App praktische Funktionen
      zur Verwaltung Ihres Vorrats, zur Erstellung von Essensplänen und zum Verwalten von Einkaufslisten. Tauchen Sie
      ein in die Welt des Kochens und erleben Sie, wie "Vestaland" Ihr kulinarisches Erlebnis bereichert!
    </Typography>
    <img
      className={'startseite right'}
      src={startseiteBild2}
      alt={'Eine Kochapp hilft in der Küche'}
      loading="lazy"
    />
    <Typography variant="h6">
      Sollten Sie Fragen oder Anregungen haben, kontaktieren Sie uns bitte via E-Mail unter <strong>info@vestaland.de</strong>
    </Typography>


  </>)
}


export function Types() {
  return (
    <Box>
      <Typography variant="h1" gutterBottom>
        h1. Heading
      </Typography>
      <Typography variant="h2" gutterBottom>
        h2. Heading
      </Typography>
      <Typography variant="h3" gutterBottom>
        h3. Heading
      </Typography>
      <Typography variant="h4" gutterBottom>
        h4. Heading
      </Typography>
      <Typography variant="h5" gutterBottom>
        h5. Heading
      </Typography>
      <Typography variant="h6" gutterBottom>
        h6. Heading
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        subtitle1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
        blanditiis tenetur
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        subtitle2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
        blanditiis tenetur
      </Typography>
      <Typography variant="body1" gutterBottom>
        body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
        blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur,
        neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum
        quasi quidem quibusdam.
      </Typography>
      <Typography variant="body2" gutterBottom>
        body2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
        blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur,
        neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum
        quasi quidem quibusdam.
      </Typography>
      <Typography variant="button" display="block" gutterBottom>
        button text
      </Typography>
      <Typography variant="caption" display="block" gutterBottom>
        caption text
      </Typography>
      <Typography variant="overline" display="block" gutterBottom>
        overline text
      </Typography>
    </Box>
  );
}
