import React, {useState} from "react";
import {Link, useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {useAuth} from "../../../util/auth/AuthProvider";
import {
  Box,
  Button,
  Container,
  Grid, Paper,
  TextField,
  Typography
} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';

import {APIService} from "../../../util/api/APIService";
import {Rezept} from "../../../shared-types/models/Rezept";
import {LoadingScreen} from "../../layout/ConditionalDisplay/LoadingScreen";
import {ErrorScreen} from "../../layout/ConditionalDisplay/ErrorScreen";
import {ShowTags} from "../../common/viewer/ShowTags";
import {RezeptBild} from "../../common/viewer/RezeptBild";
import {ShowTimes} from "../../common/viewer/ShowTimes";
import {ShowSchwierigkeitsgrad} from "../../common/viewer/ShowSchwierigkeitsgrad";
import {StartCookingButton} from "./StartCookingButton";
import {ShowZutaten} from "../../common/viewer/ShowZutaten";
import {ShowUtensilien} from "../../common/viewer/ShowUtensilien";
import {RezeptKochschritt} from "./RezeptKochschritt";
import {ShowNutrients} from "../../common/viewer/ShowNutrients";
import {QueryKey} from "../../../util/config/enums";


/**
 * Hauptkomponente der Rezept-Detailansicht
 * ermittelt value per API Call bzw. State
 *
 * @component RezeptDetail
 *
 */
export function RezeptDetail() {
  const {rezeptId} = useParams();
  const {authInfo} = useAuth();

  const {
    isLoading,
    isSuccess,
    error,
    data: rezept
  } = useQuery(
    {
      queryKey: [QueryKey.REZEPT_DETAIL, rezeptId],
      queryFn: () => APIService.getById<Rezept>('rezept', rezeptId || ''),
      enabled: !!rezeptId,
      staleTime: 1000 * 10
    });

  const [portionen, setPortionen] = useState(1)
  const [portionsFaktor, setPortionsFaktor] = useState(1)

  const updatePortionen = (newValue: number) => {
    setPortionen(newValue)
    setPortionsFaktor(newValue / (rezept?.portionen || 1))
  }

  //const portionsFaktor = (portionen && rezept?.portionen) ? portionen / rezept.portionen : 1

  const currentUserIsOwner: boolean = (!!rezept && !!authInfo?._id) // @todo (rezept && !!authInfo?._id) && rezept.owner._id === authInfo._id


  if (isLoading)
    return (<LoadingScreen/>)
  if (!isSuccess || error)
    return (<ErrorScreen eror={error}/>)

  return (
    <Container>
      <Paper>
        <Box mt={2} borderTop={1} paddingTop={1}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs>

              {/* Rezeptname und ggfls. Edit Button */}
              <Typography variant="h2" gutterBottom>
                {rezept.name}
                {currentUserIsOwner &&
                    <Button component={Link} to={`/rezept-editor/${rezept._id}`}
                            variant={'outlined'}><EditIcon/></Button>
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

              {/* Tag */}
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
                    type={'number'}
                    InputProps={{inputProps: {min: 1}, defaultValue: rezept?.portionen}}
                    onChange={e => updatePortionen(+e.currentTarget.value)}/>
                </Grid>

                {/* Zeitangabe */}
                <Grid item xs={5}>
                  <ShowTimes rezept={rezept} portionen={portionen}/>
                </Grid>

                {/* "Jetzt Kochen"-Button */}
                <Grid item xs={4}>
                  <StartCookingButton rezept={rezept} portionen={portionen}/>
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


          {/* KochschritteArray */}
          <Box mt={5}>
            <Typography variant="h3" gutterBottom borderBottom={2}>
              Zubereitung
            </Typography>
            {rezept.kochschritte.map((kochschritt, index) =>
              <RezeptKochschritt kochschritt={kochschritt} key={index} portionsFaktor={portionsFaktor}/>
            )}
          </Box>

        </Box>
      </Paper>
    </Container>
  )

}
