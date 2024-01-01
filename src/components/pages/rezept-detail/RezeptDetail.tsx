import React, {useContext, useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {rezeptDetail} from "../../../services/api/rezeptService";
import {RezeptZutaten} from "./RezeptZutaten";
import {StateContext} from "../../../services/contexts/StateProvider";
import {ActionTypes, StateContextType} from "../../../services/contexts/types";
import {useAuth} from "../../../services/auth/AuthProvider";
import {
  Box,
  Button,
  Grid,
  List,
  ListItem,
  Paper,
  TableBody, TableCell, TableRow,
  Typography
} from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import {getFileUrl} from "../../../services/api/fileService";
import {Kochschritt} from "../../../models/rezept.model";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import {StartCooking} from "./StartCooking";
import {RezeptHilfsmittel} from "./RezeptHilfsmittel";
import {MetaInfo} from "../rezept-suche/RezeptCard";

export function RezeptDetail() {
  const {rezeptId = ''} = useParams();
  const navigate = useNavigate();
  const {isOwner} = useAuth();
  const {dispatch} = useContext(StateContext) as StateContextType

  const {
    isLoading,
    isSuccess,
    data: rezept
  } = useQuery(
    {
      queryKey: ["rezept-detail", rezeptId],
      queryFn: () => rezeptDetail(rezeptId),
      staleTime: 1000 * 60 * 5, // 5 minutes
    });

  function handleBackToSearch() {
    dispatch({type: ActionTypes.SET_REZEPT_VIEW, payload: undefined})
    navigate('/rezepte');
  }

  useEffect(() => {
    dispatch({type: ActionTypes.SET_REZEPT_VIEW, payload: rezept})
    if (rezept)
      dispatch({type: ActionTypes.PUSH_REZEPT_ID, payload: {_id: rezept._id || '', name: rezept.name}})
  }, [rezept, dispatch])


  const editRecipe = () => {
    /*
        if (!rezept) return
        dispatch({type: ActionTypes.SET_REZEPT_EDIT, payload: rezept})
    */
    navigate('/rezept-editor/' + rezept?._id);
  }


  if (isLoading) return (<LoadingButton/>)

  if (isSuccess)
    return (

      <Box>

        <Grid container spacing={2} alignItems="center">
          <Grid item xs>
            <Typography variant="h2" gutterBottom>
              {isOwner(rezept._id) &&
                  <Button onClick={editRecipe} variant={'outlined'}><EditIcon/></Button>} {rezept.name}
            </Typography>
          </Grid>
          <Grid item>
            <Button onClick={handleBackToSearch}><ArrowBackIcon/></Button>
          </Grid>
        </Grid>


        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <img src={getFileUrl(rezept.bild?.fileName)} height={150} width={'100%'}
                 alt={rezept.name}
                 title={rezept.name}
            />
            <MetaInfo meta={rezept.meta} fontSize={'large'}/>
            <Typography variant="body1" gutterBottom>
              {rezept?.beschreibung}
            </Typography>
          </Grid>
          <Grid item xs={12} md={3}>

            <Typography variant="h4" gutterBottom textAlign={'center'}>
              {rezept.portionen} Portionen
            </Typography>
            <TableBody>
              <TableRow>
                <TableCell align="left">Gesamtdauer:</TableCell>
                <TableCell align="left">{rezept.gesamtdauer} Minuten</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">Arbeitszeit:</TableCell>
                <TableCell align="left">{rezept.arbeitszeit} Minuten</TableCell>
              </TableRow>
            </TableBody>

          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="h4" gutterBottom>
              Zutaten
            </Typography>
            <RezeptZutaten zutaten={rezept.zutaten}/>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="h4" gutterBottom>
              Hilfsmittel
            </Typography>
            <RezeptHilfsmittel hilfsmittel={rezept.hilfsmittel}/>
          </Grid>
        </Grid>

        <RezeptKochschritte kochschritte={rezept.kochschritte}/>

        <hr/>
        {isOwner(rezept.author?._id) &&
            <StartCooking rezept={rezept}/>
        }

      </Box>)

  return (<>Fehler</>)

}


function RezeptKochschritte({kochschritte}: { kochschritte: Kochschritt[] }) {
  return (<Paper style={{marginTop: 40}}>
    <hr/>
    <Typography variant="h3" gutterBottom>
      Zubereitung
    </Typography>
    <TableBody>

      {kochschritte.map((kochschritt, index) =>
        <TableRow key={index}>
          <TableCell align="left" valign="top">{kochschritt.name}</TableCell>
          <TableCell align="left">
            <List>
              {kochschritt.zutaten.map((zutat, index) =>
                <ListItem key={index}> {zutat.menge} {zutat.einheit} {zutat.lebensmittel?.name}</ListItem>
              )}
              {kochschritt.hilfsmittel.map((hilfsmittel, index) =>
                <ListItem key={index}> {hilfsmittel.name}</ListItem>
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
          <TableCell align="right">
            {JSON.stringify(kochschritt.meta)}
          </TableCell>
        </TableRow>
      )}

    </TableBody>
  </Paper>)
}
