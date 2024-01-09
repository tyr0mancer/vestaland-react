import React, {useContext, useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {RezeptZutaten} from "./RezeptZutaten";
import {StateContext} from "../../../util/state/StateProvider";
import {ActionTypes, StateContextType} from "../../../util/state/types";
import {useAuth} from "../../../util/auth/AuthProvider";
import {
  Box,
  Button,
  Grid,
  List,
  ListItem,
  Paper,
  TableBody, TableCell, TableRow, TextField,
  Typography
} from "@mui/material";
import {Kochschritt} from "../../../shared-types/models/Kochschritt";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import {StartCooking} from "./StartCooking";
import {RezeptUtensilien} from "./RezeptUtensilien";
import {APIService} from "../../../util/api/APIService";
import {Rezept} from "../../../shared-types/models/rezept.model";
import {LoadingScreen} from "../../common/ui/LoadingScreen";
import {ErrorScreen} from "../../common/ui/ErrorScreen";
import {ShowTags} from "../../common/formatting/ShowTags";
import {RezeptBild} from "../../common/formatting/RezeptBild";
import {ShowTimes} from "../../common/formatting/ShowTimes";


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
  const {dispatch} = useContext(StateContext) as StateContextType

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

  useEffect(() => {
    if (rezept?._id)
      dispatch({type: ActionTypes.PUSH_HISTORY, payload: rezept})
    setPortionen(rezept?.portionen || 1)
  }, [rezept, dispatch])

  const [portionen, setPortionen] = useState(1)

  if (isLoading)
    return (<LoadingScreen/>)
  if (!isSuccess || error)
    return (<ErrorScreen eror={error}/>)

  /*

    Zeitangabe
     realeGesamtzeit
     berechneteGesamtdauer
     berechneteArbeitszeit
     extraPortionArbeitszeit
     extraPortionGesamtdauer

    Schwierigkeitsgrad

    Tags
      vegetarisch
      healthy
      soulfood

    public nutrients?: Nutrients;

    public freitext?: string;



    export class Rezept extends TimeStamps {
      public quelleUrl: string[] = [];
    }
  */

  return (
    <Box>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs>
          <Typography variant="h2" gutterBottom>
            {rezept.name}
            {isOwner(rezept._id) &&
                <Button component={Link} to={`/rezept-editor/${rezept._id}`} variant={'outlined'}><EditIcon/></Button>
            }
          </Typography>
          <Typography variant="body1" gutterBottom>
            {rezept?.beschreibung}
          </Typography>
        </Grid>
        <Grid item>
          <Button component={Link} to={'/rezepte'}><ArrowBackIcon/></Button>
        </Grid>
      </Grid>


      <Grid container spacing={1}>
        <Grid item xs={12} md={3}>
          <RezeptBild bild={rezept?.bild} alt={rezept?.name}/>
          <ShowTags tags={rezept.tags} size={'large'}/>
        </Grid>

        <Grid item xs={12} md={3}>
          <TextField
            label={'Portionen'}
            type={'number'} value={portionen}
            InputProps={{inputProps: {min: 1}}}
            onChange={e => setPortionen(+e.currentTarget.value)}/>
          <ShowTimes rezept={rezept} portionen={portionen}/>
        </Grid>

        <Grid item xs={12} md={3}>
          <Typography variant="h4" gutterBottom>
            Zutaten
          </Typography>
          <RezeptZutaten zutaten={rezept.zutaten}/>
        </Grid>
        <Grid item xs={12} md={3}>
          <Typography variant="h4" gutterBottom>
            Utensilien
          </Typography>
          <RezeptUtensilien utensilien={rezept.utensilien}/>
        </Grid>
      </Grid>

      <pre>{JSON.stringify(rezept, null, 2)}</pre>

      <RezeptKochschritte kochschritte={rezept.kochschritte}/>

      <hr/>
      <StartCooking rezept={rezept}/>
    </Box>)

}


function RezeptKochschritte({kochschritte}: { kochschritte: Kochschritt[] }) {
  return (<Paper style={{marginTop: 40}}>
    <hr/>
    <Typography variant="h3" gutterBottom>
      Zubereitung
    </Typography>
    <TableBody>

      {/* @todo aktionen */}
      {kochschritte.map((kochschritt, index) =>
        <TableRow key={index}>
          <TableCell align="left" valign="top">{JSON.stringify(kochschritt.aktionen)}</TableCell>
          <TableCell align="left">
            <List>
              {kochschritt.zutaten.map((zutat, index) =>
                <ListItem key={index}> {zutat.menge} {zutat.einheit} {zutat.lebensmittel?.name}</ListItem>
              )}
              {kochschritt.utensilien.map((utensil, index) =>
                <ListItem key={index}> {utensil.utensilName}</ListItem>
              )}
            </List>
          </TableCell>
          <TableCell align="left">
            <Typography variant="body2" gutterBottom>
              {kochschritt.beschreibung}
            </Typography>
          </TableCell>

          <TableCell align="right">
            {kochschritt.gesamtdauer &&
                <Typography variant="body2" gutterBottom>
                    Gesamtdauer: {kochschritt.gesamtdauer} Min
                </Typography>
            }
            {kochschritt.arbeitszeit &&
                <Typography variant="body2" gutterBottom>
                    Arbeitszeit: {kochschritt.arbeitszeit} Min
                </Typography>
            }
            {kochschritt.wartezeit &&
                <Typography variant="body2" gutterBottom>
                    Wartezeit: {kochschritt.wartezeit} Min
                </Typography>
            }
          </TableCell>
        </TableRow>
      )}

    </TableBody>
  </Paper>)
}
