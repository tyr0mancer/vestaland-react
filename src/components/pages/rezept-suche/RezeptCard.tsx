import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {Rezept} from "../../../shared-types/models/Rezept";
import {Link} from "react-router-dom";
import {RezeptPartial} from "../../../util/state/types";
import {getFileUrl} from "../../common/formatting/RezeptBild";


export function RezeptCard({rezept}: { rezept: Rezept | RezeptPartial }) {
  if (!rezept)
    return <></>

  return (
    <Card sx={{maxWidth: 345}} className={'rezept-suche-card'} variant="elevation">
      <Link to={'/rezepte/' + rezept._id}>
        <CardMedia
          sx={{height: 100}}
          image={getFileUrl(rezept.bild?.filename)}
          title={rezept.name}
        />
        <CardContent style={{padding: 5}}>
          {rezept &&
              <Typography gutterBottom variant="h5" component="div">
                {rezept.name} {rezept.publicVisible &&<>!!</>}
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

