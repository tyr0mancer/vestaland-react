import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {Rezept, RezeptMeta} from "../../../models/rezept.model";
import {getFileUrl} from "../../../services/api/fileService";
import {Link} from "react-router-dom";
import FilterVintageIcon from '@mui/icons-material/FilterVintage';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';


export function RezeptCard({rezept}: { rezept: Rezept }) {
  if (!rezept)
    return <></>

  return (
    <Card sx={{maxWidth: 345}} className={'rezept-suche-card'} variant="elevation">
      <Link to={'/rezepte/' + rezept._id}>
        <CardMedia
          sx={{height: 100}}
          image={getFileUrl(rezept.bild?.fileName)}
          title={rezept.name}
        />
        <CardContent style={{padding: 5}}>
          <Typography gutterBottom variant="h5" component="div">
            {rezept.name} <MetaInfo meta={rezept.meta} fontSize={'small'}/>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {rezept.beschreibung}
          </Typography>
        </CardContent>
      </Link>
    </Card>

  );
}


export function MetaInfo({meta, fontSize = 'medium'}: { meta?: RezeptMeta, fontSize?: 'small' | 'medium' | 'large' }) {

  return (<>
    {meta?.vegetarisch &&
        <span title={'Das Rezept ist vegetarisch'}>
            <FilterVintageIcon color={'primary'} fontSize={fontSize}/>
        </span>
    }
    {meta?.healthy &&
        <span title={'Das Rezept ist diätisch'}>
            <FitnessCenterIcon color={'primary'} fontSize={fontSize}/>
        </span>
    }
    {meta?.soulfood &&
        <span title={'Essen für die Seele'}>
            <FavoriteBorderIcon color={'primary'} fontSize={fontSize}/>
        </span>
    }
  </>)
}
