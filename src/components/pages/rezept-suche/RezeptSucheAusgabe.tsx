import React, {useContext} from "react";
import {useQuery} from "@tanstack/react-query";

import {Rezept} from "../../../shared-types/model/Rezept";
import {StateContext} from "../../../util/state/StateProvider";
import {StateContextType} from "../../../util/state/types";
import {RezeptCard} from "./RezeptCard";
import {Grid, IconButton, Typography} from "@mui/material";
import {ErrorScreen} from "../../common/ui/ErrorScreen";

import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import {LoadingScreen} from "../../common/ui/LoadingScreen";
import {ActionTypes} from "../../../util/state/reducers";

export function RezeptSucheAusgabe() {
  const {dispatch, state: {rezeptHistory, rezeptSucheQuery}} = useContext(StateContext) as StateContextType

  const handleDeleteHistory = (index?: string) => {
    if (index) dispatch({type: ActionTypes.DELETE_HISTORY, payload: index})
  }

  const {
    isLoading,
    isError,
    error,
    data
  } = useQuery<Rezept[]>(
    {
      queryKey: ["rezepte-suche", rezeptSucheQuery.rezeptName],
      enabled: false,
    });

  if (isError)
    return <ErrorScreen error={error}/>
  if (isLoading)
    return <LoadingScreen/>
  return (<>
    <Grid container spacing={{xs: 2, md: 3}} columns={{xs: 4, sm: 8, md: 16}}>
      {data?.map((rezept, index) =>
        <Grid item xs={2} sm={4} md={4} key={index}>
          <RezeptCard key={rezept._id} rezept={rezept}/>
        </Grid>
      )}
    </Grid>
    {(!data || !data.length) &&
        <>
            <Typography variant="h4" gutterBottom borderBottom={2} mt={5}>
                zuletzt gekocht:
            </Typography>
            <Grid container spacing={{xs: 2, md: 3}} columns={{xs: 4, sm: 8, md: 16}}>
              {rezeptHistory.map((entry, index) =>
                <Grid item xs={2} sm={4} md={4} key={index}>
                  <RezeptCard key={entry._id} rezept={entry}/>
                  <IconButton
                    onClick={() => handleDeleteHistory(entry._id)}
                  ><RemoveCircleIcon/></IconButton>
                </Grid>
              )}
            </Grid>
        </>
    }
  </>)
}
