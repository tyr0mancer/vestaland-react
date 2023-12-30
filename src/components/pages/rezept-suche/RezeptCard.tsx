import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {Rezept} from "../../../models/rezept.model";
import {getFileUrl} from "../../../services/api/fileService";
import {Link} from "react-router-dom";

export function RezeptCard({rezept}: { rezept: Rezept }) {


  if (!rezept)
    return <></>

  return (
    <Card sx={{maxWidth: 345}} className={'rezept-suche-card'}>
      <Link to={'/rezepte/' + rezept._id}>
        <CardMedia
          sx={{height: 140}}
          image={getFileUrl(rezept.bild?.fileName)}
          title={rezept.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {rezept.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {rezept.zutaten.map((z, index) => (<span key={index}>{z.lebensmittel?.name}, </span>))}
          </Typography>
        </CardContent>
      </Link>
    </Card>

  );
}
