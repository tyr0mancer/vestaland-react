import React, {useContext} from "react";
import {useQuery} from "@tanstack/react-query";

import {Rezept} from "../../../shared-types/models/rezept.model";
import {StateContext} from "../../../util/state/StateProvider";
import {StateContextType} from "../../../util/state/types";
import LoadingIcon from '@mui/icons-material/HourglassBottom';
import {RezeptCard} from "./RezeptCard";
import {Grid, Typography} from "@mui/material";
import {ErrorScreen} from "../../common/ui/ErrorScreen";

export function RezeptSucheAusgabe() {
  const {state: {rezeptHistory, rezeptSucheQuery}} = useContext(StateContext) as StateContextType

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
    return <LoadingIcon/>
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
                zuletzt angesehen:
            </Typography>
            <Grid container spacing={{xs: 2, md: 3}} columns={{xs: 4, sm: 8, md: 16}}>
              {rezeptHistory.map((entry, index) =>
                <Grid item xs={2} sm={4} md={4} key={index}>
                  <RezeptCard key={entry._id} rezept={entry}/>
                </Grid>
              )}
            </Grid>
        </>
    }
  </>)
}
