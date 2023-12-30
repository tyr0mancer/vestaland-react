import React from "react";

import {Typography} from "@mui/material";

import startseiteBild1 from "../../../assets/images/startseite.png";
import startseiteBild2 from "../../../assets/images/startseite2.png";

export function Startseite() {
  return (<>
    <Typography variant="h6">
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

    <Typography>
      Mit Vestaland haben Sie nicht nur Zugriff auf eine Vielzahl inspirierender Rezepte,
      sondern auch auf intelligente Funktionen, die das <strong>Kochen vereinfachen</strong> und bereichern
    </Typography>

    <img
      src={startseiteBild2}
      alt={'Eine Kochapp hilft in der Küche'}
      loading="lazy"
      className={'startseite right'}
    />

    <Typography>
      Planen Sie Ihre Mahlzeiten vorausschauend mit unserer Essensplan-Vorschau. Entdecken Sie neue Rezepte, die
      zu Ihrem Geschmack und Ihren Ernährungsgewohnheiten passen, und organisieren Sie Ihre Mahlzeiten effizient
      für die kommende Woche. Vestaland ist mehr als nur eine Koch-App – es ist Ihr persönlicher Küchenassistent,
      der Ihnen hilft, jeden Tag etwas Besonderes zu zaubern. Starten Sie jetzt und erleben Sie, wie einfach und
      freudvoll Kochen sein kann!
    </Typography>

  </>)
}
