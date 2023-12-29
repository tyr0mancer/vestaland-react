import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Rezept} from "../../../models/rezept.model";
import {getFileUrl} from "../../../services/api/fileService";
import {Link} from "react-router-dom";
import {useAuth} from "../../../services/auth/AuthProvider";

export function RezeptCard({rezept}: { rezept: Rezept }) {

  const {isOwner} = useAuth();


  if (!rezept)
    return <></>

  return (
    <Card sx={{maxWidth: 345}}>
      <Link to={'/rezepte/' + rezept._id}>
        <CardMedia
          sx={{height: 140}}
          image={getFileUrl(rezept.bild?.fileName)}
          title="green iguana"
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
      <CardActions>
        {isOwner(rezept.author?._id) && <Button size="small">Bearbeiten</Button>}
      </CardActions>
    </Card>

  );
}
