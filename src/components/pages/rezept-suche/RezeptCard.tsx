import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {Rezept} from "../../../shared-types/models/rezept.model";
import {getFileUrl} from "../../../util/api/fileService";
import {Link} from "react-router-dom";
import {RezeptPartial} from "../../../util/state/types";


export function RezeptCard({rezept}: { rezept: Rezept | RezeptPartial }) {
  if (!rezept)
    return <></>

  return (
    <Card sx={{maxWidth: 345}} className={'rezept-suche-card'} variant="elevation">
      <Link to={'/rezepte/' + rezept._id}>
        <CardMedia
          sx={{height: 100}}
          image={getFileUrl(rezept.bild?.dateiNameServer)}
          title={rezept.name}
        />
        <CardContent style={{padding: 5}}>
          {rezept &&
              <Typography gutterBottom variant="h5" component="div">
                {rezept.name}
              </Typography>
          }
          <Typography variant="body2" color="text.secondary">
            {rezept.beschreibung}
          </Typography>
        </CardContent>
      </Link>
    </Card>

  );
}

