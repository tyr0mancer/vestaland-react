import React from "react";

import {Box, Typography} from "@mui/material";

import startseiteBild1 from "../../../assets/images/startseite.png";
import startseiteBild2 from "../../../assets/images/startseite2.png";

export function Startseite() {
  return (<>

    <Typography variant="h6" gutterBottom>
      Herzlich willkommen bei <strong>Vestaland</strong>, Ihrer
      innovativen <strong>Koch-App</strong>, die Sie Schritt für Schritt zu kulinarischen
      Meisterwerken führt!
    </Typography>

    <img
      src={startseiteBild1}
      alt={'Eine Kochapp hilft in der Küche'}
      loading="lazy"
      className={'startseite left'}
    />

    <Typography variant="body1" gutterBottom>
      Mit Vestaland haben Sie nicht nur Zugriff auf eine Vielzahl inspirierender Rezepte,
      sondern auch auf intelligente Funktionen, die das <strong>Kochen vereinfachen</strong> und bereichern
    </Typography>

    <Typography variant="body1">
      Planen Sie Ihre Mahlzeiten vorausschauend mit dem <strong>Essensplaner</strong>. Entdecken Sie neue Rezepte, die
      zu Ihrem Geschmack und Ihren Ernährungsgewohnheiten passen, und organisieren Sie Ihre Mahlzeiten effizient
      für die kommende Woche.
    </Typography>

    <img
      className={'startseite right'}
      src={startseiteBild2}
      alt={'Eine Kochapp hilft in der Küche'}
      loading="lazy"
    />

    <Typography variant="body1">
      Vestaland ist mehr als nur eine Koch-App – es ist Ihr <strong>persönlicher Küchenassistent</strong>,
      der Ihnen hilft, jeden Tag etwas Besonderes zu zaubern. Starten Sie jetzt und erleben Sie, wie einfach und
      freudvoll Kochen sein kann!
    </Typography>

    <Types/>

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
