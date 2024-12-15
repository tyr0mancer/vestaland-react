import React from "react";

import {Box, Paper, Typography} from "@mui/material";
export function Startseite() {
  return (<Paper style={{padding: 15}}>
    <Typography variant="h6" gutterBottom>
      Willkommen bei <strong>"Vestaland"</strong> – Ihrer persönlichen Kochassistenz-App!
    </Typography>

    <Typography variant="h6" gutterBottom>
      Entdecken Sie das Vergnügen des Kochens neu mit Vestaland, Ihrer digitalen Assistentin in der Küche. Inspiriert
      von Vesta, der römischen Göttin des Herdfeuers, bringen wir Struktur und Kreativität in Ihre Küche. Ob Sie ein
      Rezept suchen, Ihren Speiseplan organisieren oder Ihre Einkaufsliste optimieren möchten – wir sind für Sie da. Und
      das Beste? Alles kostenlos, werbefrei und ohne Datentracking.
    </Typography>

    <Typography variant="h4" mt={2} borderBottom={1}>Das Vesta-Format</Typography>
    <Typography variant="h6">
      Entdecken Sie die Präzision des Vesta-Formats in unseren Rezepten. Jedes Rezept folgt einem klaren, strukturierten
      Schema, das es einfach macht, die Schritte zu verstehen und nachzukochen. 
    </Typography>

    <Typography variant="h4" mt={2} borderBottom={1}>
      Live-Cooking
    </Typography>
    <Typography variant="h6">
      Erleben Sie mit unserem Live-Cooking-Modus eine völlig neue Art des Kochens. Hierbei wird jeder Schritt des
      Rezepts in Echtzeit angezeigt, sodass Sie sich voll und ganz auf das aktuelle Geschehen konzentrieren können.
      Ideal für stressfreies Kochen, bei dem Sie sich nicht mehr fragen müssen, was als Nächstes zu tun ist.
    </Typography>

    <Typography variant="h4" mt={2} borderBottom={1}>
      Einkaufen
    </Typography>
    <Typography variant="h6">
      Mit unserer intelligenten Einkaufslisten-Funktion wird Einkaufen zum Kinderspiel. Die Liste lernt mit jedem
      Einkauf dazu und passt sich der Reihenfolge an, in der Sie Produkte üblicherweise abhaken. Zudem aktualisiert sich
      Ihre Einkaufsliste automatisch basierend auf Ihren Speiseplänen und der Mindesthaltbarkeit Ihrer Vorräte – für
      maximale Effizienz und weniger Lebensmittelverschwendung.
    </Typography>

    <Typography variant="h4" mt={2} borderBottom={1}>
      Datenschutz
    </Typography>
    <Typography variant="h6">
      Ihre Privatsphäre ist uns heilig. Bei Vestaland werden keinerlei Metadaten, insbesondere zum Einkaufsverhalten
      oder zur Produktwahl, getrackt. Wir speichern nur die Daten, die Sie selbst eingeben. Unser Versprechen:
      Kostenfreiheit, Werbefreiheit und der Schutz Ihrer Daten, ganz im Sinne eines verantwortungsvollen Privatprojekts.
    </Typography>

    <Typography variant="h6">
      Vestaland – einfach. kochen.
    </Typography>

  </Paper>)
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
