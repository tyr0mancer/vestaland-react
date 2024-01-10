import React, {useState} from "react";
import {Link, useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {useAuth} from "../../../util/auth/AuthProvider";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography
} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';

import {APIService} from "../../../util/api/APIService";
import {Rezept} from "../../../shared-types/models/rezept.model";
import {LoadingScreen} from "../../common/ui/LoadingScreen";
import {ErrorScreen} from "../../common/ui/ErrorScreen";
import {ShowTags} from "../../common/formatting/ShowTags";
import {RezeptBild} from "../../common/formatting/RezeptBild";
import {ShowTimes} from "../../common/formatting/ShowTimes";
import {ShowSchwierigkeitsgrad} from "../../common/formatting/ShowSchwierigkeitsgrad";
import {StartCookingButton} from "../../common/ui/StartCookingButton";
import {ShowZutaten} from "../../common/formatting/ShowZutaten";
import {ShowUtensilien} from "../../common/formatting/ShowUtensilien";
import {RezeptKochschritt} from "./RezeptKochschritt";
import {ShowNutrients} from "../../common/formatting/ShowNutrients";


/**
 * Hauptkomponente der Rezept-Detailansicht
 * ermittelt value per API Call bzw. State
 *
 * @component RezeptDetail
 *
 */
export function RezeptDetail() {
  const {rezeptId} = useParams();
  const {isOwner} = useAuth();

  const {
    isLoading,
    isSuccess,
    error,
    data: rezept
  } = useQuery(
    {
      queryKey: ["rezept-detail", rezeptId],
      queryFn: () => APIService.getById<Rezept>('rezept', rezeptId || ''),
      enabled: !!rezeptId,
      staleTime: 1000 * 60 * 5, // 5 minutes
    });

  const [portionen, setPortionen] = useState(rezept?.portionen || 1)
  const portionsFaktor = (portionen && rezept?.portionen) ? portionen / rezept.portionen : 1


  if (isLoading)
    return (<LoadingScreen/>)
  if (!isSuccess || error)
    return (<ErrorScreen eror={error}/>)

  return (
    <Box>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs>

          {/* Rezeptname und ggfls. Edit Button */}
          <Typography variant="h2" gutterBottom>
            {rezept.name}
            {isOwner(rezept._id) &&
                <Button component={Link} to={`/rezept-editor/${rezept._id}`} variant={'outlined'}><EditIcon/></Button>
            }
          </Typography>

          {/* Kurzbeschreibung */}
          <Typography variant="body1" gutterBottom>
            {rezept?.beschreibung}
          </Typography>

        </Grid>
        <Grid item>
          <Button component={Link} to={'/rezepte'}><ArrowBackIcon/></Button>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>

          {/* Bild oder Platzhalter */}
          <RezeptBild bild={rezept?.bild} alt={rezept?.name}/>

          {/* Tags */}
          <Box mt={1}>
            <ShowTags tags={rezept.tags} size={'large'}/>
          </Box>

        </Grid>

        <Grid item xs={12} md={3}>
          <Grid container spacing={1}>

            {/* Portionen */}
            <Grid item xs={3}>
              <TextField
                fullWidth
                label={'Portionen'}
                type={'number'} value={portionen}
                InputProps={{inputProps: {min: 1}}}
                onChange={e => setPortionen(+e.currentTarget.value)}/>
            </Grid>

            {/* Zeitangabe */}
            <Grid item xs={5}>
              <ShowTimes rezept={rezept} portionen={portionen}/>
            </Grid>

            {/* "Jetzt Kochen"-Button */}
            <Grid item xs={4}>
              <StartCookingButton rezept={rezept}/>
            </Grid>

          </Grid>

          {/* Schwierigkeitsgrad */}
          <Box mt={2}>
            <ShowSchwierigkeitsgrad schwierigkeitsgrad={rezept.schwierigkeitsgrad}/>
          </Box>

        </Grid>

        {/* Zutaten */}
        <Grid item xs={12} md={3}>
          <Typography variant="h6" gutterBottom borderBottom={1}>
            Zutaten
          </Typography>
          <ShowZutaten zutaten={rezept.zutaten} portionsFaktor={portionsFaktor}/>
        </Grid>

        {/* Utensilien */}
        <Grid item xs={12} md={3}>
          <Typography variant="h6" gutterBottom borderBottom={1}>
            Utensilien
          </Typography>
          <ShowUtensilien utensilien={rezept.utensilien}/>
        </Grid>

      </Grid>

      {/* Nutrients */}
      <Box mt={5}>
        <ShowNutrients nutrients={rezept.nutrients}/>
      </Box>

      {/* Quellen */}
      {!!rezept.quelleUrl?.length && <pre>{JSON.stringify(rezept.quelleUrl)}</pre>}

      {/* Freitext */}
      {!!rezept.freitext &&
          <Box mt={5}>
              <Typography variant="body1" border={'1px dotted'} color={'primary'} padding={2}>
                {rezept.freitext}
              </Typography>
          </Box>
      }


      {/* Kochschritte */}
      <Box mt={5}>
        <Typography variant="h3" gutterBottom borderBottom={2}>
          Zubereitung
        </Typography>
        {rezept.kochschritte.map((kochschritt, index) =>
          <RezeptKochschritt kochschritt={kochschritt} key={index} portionsFaktor={portionsFaktor}/>
        )}
      </Box>

    </Box>)

}
